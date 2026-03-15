import { Box, Heading, VStack } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function Column({ id, title, tasks = [] }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <Box
            ref={setNodeRef}
            flex="1"
            bg="gray.50"
            p="4"
            borderRadius="xl"
            minH="500px"
            border="1px"
            borderColor="gray.200"
        >
            <Heading size="sm" mb="4" color="gray.600" textTransform="uppercase">
                {title} ({tasks.length})
            </Heading>
            
            <VStack align="stretch" spacing="2">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </VStack>
        </Box>
    );
}

export default Column;