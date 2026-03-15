import { Box, Heading, VStack, Button, HStack, Circle, Icon } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const getColumnColor = (title) => {
  switch (title) {
    case 'To Do': return 'blue.700'; // Indigo/Purple
    case 'In Progress': return 'orange.400';
    case 'Done': return 'green.400';
    default: return 'gray.500';
  }
}

function Column({ id, title, tasks = [], onAddTask }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const statusColor = getColumnColor(title);
  const label = title === 'In Progress' ? 'On Progress' : title;

  return (
    <Box
      ref={setNodeRef}
      flex="1"
      bg="#F3F4F6"
      p="5"
      borderRadius="2xl"
      minH="calc(100vh - 350px)"
    >
      <HStack justify="space-between" mb="5" borderBottom="3px solid" borderColor={statusColor} pb={3}>
        <HStack spacing={2}>
          <Circle size="2" bg={statusColor} />
          <Heading size="xs" color="gray.800" fontWeight="700" textTransform="capitalize">
            {label}
          </Heading>
          <Circle size="5" bg="gray.200" color="gray.600" fontSize="10px" fontWeight="bold">
            {tasks.length}
          </Circle>
        </HStack>
        <Circle 
          size="5" 
          bg="blue.50" 
          color="blue.500" 
          cursor="pointer" 
          onClick={() => onAddTask && onAddTask(title)}
          _hover={{ bg: "blue.100" }}
          transition="all 0.2s"
        >
          <Plus size={12} strokeWidth={4} />
        </Circle>
      </HStack>

      <VStack align="stretch" spacing={4}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>

      {tasks.length === 0 && (
        <Button
          mt="4"
          size="sm"
          variant="ghost"
          w="full"
          color="gray.400"
          fontWeight="600"
          leftIcon={<Plus size={16} />}
          onClick={() => onAddTask && onAddTask(title)}
          _hover={{ bg: "gray.100" }}
        >
          Add task
        </Button>
      )}
    </Box>
  );
}

export default Column;