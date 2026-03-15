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
  Avatar,
  AvatarGroup,
  Divider,
  Progress,
  Checkbox,
  Input,
  Collapse,
  useDisclosure as useChakraDisclosure,
  Heading,
  Flex
} from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { 
  MoreHorizontal, 
  Calendar, 
  MessageSquare, 
  FileText,
  History,
  AlertCircle
} from "lucide-react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask, toggleSubtask, addSubtask } from "../redux/tasksSlice";
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

  const getPriorityStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return { bg: "red.50", color: "red.600", label: "High" };
      case 'medium': return { bg: "orange.50", color: "orange.600", label: "Medium" };
      case 'low': return { bg: "green.50", color: "green.600", label: "Low" };
      default: return { bg: "gray.50", color: "gray.600", label: "Low" };
    }
  };

  const prioStyle = getPriorityStyles(task.priority);
  const subtasksCompleted = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progressValue = totalSubtasks > 0 ? (subtasksCompleted / totalSubtasks) * 100 : 0;

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

  const isOverdue = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    return dueDate < today;
  };
  const overdue = isOverdue(task.dueDate) && task.status !== 'Done';

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      p="5"
      bg="white"
      borderRadius="2xl"
      boxShadow="sm"
      cursor="grab"
      _hover={{ boxShadow: "md" }}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" align="center">
          <Badge 
            variant="subtle" 
            px={2} 
            py={0.5} 
            borderRadius="md" 
            bg={prioStyle.bg} 
            color={prioStyle.color}
            fontSize="2xs"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {prioStyle.label}
          </Badge>

          <Menu size="sm">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MoreHorizontal size={18} />}
              variant="ghost"
              size="xs"
              color="gray.400"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList onClick={(e) => e.stopPropagation()}>
              <MenuItem onClick={() => dispatch(deleteTask(task.id))} color="red.500">Delete</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Box>
          <Heading size="md" fontWeight="800" color="gray.800" mb={1} fontSize="lg">
            {task.title}
          </Heading>
          <Text fontSize="xs" color="gray.500" mb={3} lineHeight="tall">
            {task.description}
          </Text>
        </Box>

        {totalSubtasks > 0 && (
          <Box mb={1}>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="xs" color="gray.500" fontWeight="600">Subtasks</Text>
              <Text fontSize="xs" color="gray.800" fontWeight="bold">
                {subtasksCompleted}/{totalSubtasks}
              </Text>
            </HStack>
            <Progress value={progressValue} size="xs" colorScheme="blue" borderRadius="full" bg="gray.100" />
            
            <VStack align="stretch" spacing={2} mt={3} onClick={(e) => e.stopPropagation()}>
              {task.subtasks.map(sub => (
                <Checkbox 
                  key={sub.id} 
                  size="sm" 
                  colorScheme="blue"
                  isChecked={sub.completed}
                  onChange={() => dispatch(toggleSubtask({ taskId: task.id, subtaskId: sub.id }))}
                >
                  <Text fontSize="xs" as={sub.completed ? "s" : "span"} color={sub.completed ? "gray.400" : "gray.700"}>
                    {sub.title}
                  </Text>
                </Checkbox>
              ))}
            </VStack>
          </Box>
        )}

        <Input 
          placeholder="Add subtask..." 
          size="xs" 
          variant="flushed"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyDown={handleAddSubtask}
          onClick={(e) => e.stopPropagation()}
          _placeholder={{ color: "gray.300" }}
          mb={2}
        />

        <Flex justify="space-between" align="center" pt={2}>
          <AvatarGroup size="xs" max={3}>
            <Avatar src="https://bit.ly/dan-abramov" />
            <Avatar src="https://bit.ly/tioluwani-kolawole" />
            <Avatar src="https://bit.ly/kent-c-dodds" />
          </AvatarGroup>

          <HStack spacing={3} color="gray.400">
            <HStack spacing={1}>
              <Icon as={MessageSquare} size={14} />
              <Text fontSize="2xs" fontWeight="600">12 comments</Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FileText} size={14} />
              <Text fontSize="2xs" fontWeight="600">0 files</Text>
            </HStack>
          </HStack>
        </Flex>

        <Divider borderColor="gray.50" />

        <Box>
          <HStack 
            justify="space-between" 
            align="center" 
            cursor="pointer" 
            onClick={(e) => { e.stopPropagation(); onToggleLog(); }}
            _hover={{ opacity: 0.7 }}
          >
            <HStack spacing={1.5} color="blue.400">
              <History size={14} />
              <Text fontSize="xs" fontWeight="bold">History</Text>
            </HStack>
            {task.dueDate && (
              <HStack spacing={1} color={overdue ? "red.500" : "gray.400"}>
                <Icon as={overdue ? AlertCircle : Calendar} size={12} />
                <Text fontSize="xs" fontWeight="700">
                  {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </HStack>
            )}
          </HStack>

          <Collapse in={isLogOpen} animateOpacity>
            <VStack align="stretch" spacing={2} pt={3} onClick={(e) => e.stopPropagation()}>
              {task.activityLog?.length > 0 ? (
                task.activityLog.slice(-3).map(log => (
                  <Box key={log.id} borderLeft="2px" borderColor="blue.100" pl={3} py={0.5}>
                    <Text fontSize="2xs" color="gray.400">
                      {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Text fontSize="xs" color="gray.600" lineHeight="tight">
                      {log.action}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text fontSize="xs" color="gray.400">No activity yet.</Text>
              )}
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
}

export default TaskCard;
