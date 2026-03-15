import {
    Box,
    Text,
    Badge,
    VStack,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Icon,
    Tooltip,
    Divider
} from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical, Calendar, Bell, AlertCircle, History } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask, toggleSubtask, addSubtask } from "../redux/tasksSlice";
import { Checkbox, Input, Collapse, useDisclosure as useChakraDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function TaskCard({ task }) {
    const dispatch = useDispatch();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        zIndex: transform ? 1000 : 1,
        opacity: transform ? 0.8 : 1,
    };

    const isOverdue = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(date);
        return dueDate < today;
    };

    const overdue = isOverdue(task.dueDate) && task.status !== 'Done';

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'gray';
        }
    };

    const nextStatuses = ['To Do', 'In Progress', 'Done'].filter(s => s !== task.status);

    const [newSubtask, setNewSubtask] = useState("");
    const { isOpen: isLogOpen, onToggle: onToggleLog } = useChakraDisclosure();

    const handleAddSubtask = (e) => {
        if (e.key === 'Enter' && newSubtask.trim()) {
            dispatch(addSubtask({
                taskId: task.id,
                subtask: { id: uuidv4(), title: newSubtask.trim(), completed: false }
            }));
            setNewSubtask("");
        }
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            mb="3"
            _hover={{ boxShadow: "md" }}
            cursor="grab"
        >
            <VStack align="stretch" spacing={3}>
                <HStack justify="space-between" align="center">
                    <HStack spacing={2}>
                        <Badge variant="subtle" colorScheme={getPriorityColor(task.priority)} borderRadius="full" px={2}>
                            {task.priority || 'Low'}
                        </Badge>
                        {task.reminder && (
                            <Tooltip label="Reminder enabled">
                                <Icon as={Bell} size={14} color="purple.500" />
                            </Tooltip>
                        )}
                    </HStack>

                    <Menu size="sm">
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<MoreVertical size={16} />}
                            variant="ghost"
                            size="xs"
                            onClick={(e) => e.stopPropagation()} // Prevent drag start when clicking menu
                        />
                        <MenuList onClick={(e) => e.stopPropagation()}>
                            <Text px="3" py="1" fontSize="xs" color="gray.500" fontWeight="bold">MOVE TO</Text>
                            {nextStatuses.map(status => (
                                <MenuItem
                                    key={status}
                                    fontSize="sm"
                                    onClick={() => dispatch(updateTaskStatus({ id: task.id, newStatus: status }))}
                                >
                                    {status}
                                </MenuItem>
                            ))}
                            <MenuItem
                                color="red.500"
                                fontSize="sm"
                                onClick={() => dispatch(deleteTask(task.id))}
                            >
                                Delete Task
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>

                <Box>
                    <Text fontWeight="600" fontSize="md" color="gray.800" noOfLines={1} mb={1}>
                        {task.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500" noOfLines={2} mb={3}>
                        {task.description}
                    </Text>

                    {task.subtasks?.length > 0 && (
                        <VStack align="stretch" spacing={2} mb={3} onClick={(e) => e.stopPropagation()}>
                            {task.subtasks.map(sub => (
                                <Checkbox 
                                    key={sub.id} 
                                    size="sm" 
                                    isChecked={sub.completed}
                                    onChange={() => dispatch(toggleSubtask({ taskId: task.id, subtaskId: sub.id }))}
                                >
                                    <Text fontSize="xs" as={sub.completed ? "s" : "span"} color={sub.completed ? "gray.400" : "gray.700"}>
                                        {sub.title}
                                    </Text>
                                </Checkbox>
                            ))}
                        </VStack>
                    )}

                    <Input 
                        placeholder="Add subtask..." 
                        size="xs" 
                        variant="flushed"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        onKeyDown={handleAddSubtask}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <HStack 
                        mt={4}
                        pt={2}
                        borderTop="1px dashed"
                        borderColor="gray.100"
                        justify="space-between" 
                        align="center" 
                        cursor="pointer" 
                        onClick={(e) => { e.stopPropagation(); onToggleLog(); }}
                        _hover={{ opacity: 0.7 }}
                    >
                        <HStack spacing={2} color="blue.500">
                            <History size={14} />
                            <Text fontSize="xs" fontWeight="bold">View Activity Log</Text>
                        </HStack>
                        <Text fontSize="2xs" color="gray.400">
                            {task.activityLog?.length || 0} events
                        </Text>
                    </HStack>

                    <Collapse in={isLogOpen} animateOpacity>
                        <VStack align="stretch" spacing={2} onClick={(e) => e.stopPropagation()}>
                            {task.activityLog?.length > 0 ? (
                                task.activityLog.map(log => (
                                    <Box key={log.id} borderLeft="2px" borderColor="blue.200" pl={3} py={1}>
                                        <Text fontSize="2xs" color="gray.400">
                                            {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                        <Text fontSize="xs" color="gray.600" lineHeight="tight">
                                            {log.action}
                                        </Text>
                                    </Box>
                                ))
                            ) : (
                                <Text fontSize="xs" color="gray.400">No activity logged yet.</Text>
                            )}
                        </VStack>
                    </Collapse>
                </Box>

                {task.dueDate && (
                    <>
                        <Divider />
                        <HStack spacing={1} justify="flex-start" color={overdue ? "red.500" : "gray.400"}>
                            <Icon as={overdue ? AlertCircle : Calendar} size={14} />
                            <Text fontSize="xs" fontWeight={overdue ? "600" : "medium"}>
                                {overdue ? "Overdue: " : ""}
                                {new Date(task.dueDate).toLocaleDateString()}
                            </Text>
                        </HStack>
                    </>
                )}
            </VStack>
        </Box>
    );
}

export default TaskCard;
