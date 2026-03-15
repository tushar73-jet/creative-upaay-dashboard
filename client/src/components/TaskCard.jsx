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
import { MoreVertical, Calendar, Bell, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask } from "../redux/tasksSlice";

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
                    <Text fontSize="xs" color="gray.500" noOfLines={2}>
                        {task.description}
                    </Text>
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
