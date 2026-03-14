import { Box, Text, Badge, VStack } from "@chakra-ui/react";

function TaskCard({ task }) {
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'gray';
        }
    };

    return (
        <Box
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            mb="3"
        >
            <VStack align="stretch" spacing="2">
                <Badge w="fit-content" colorScheme={getPriorityColor(task.priority)}>
                    {task.priority || 'Low'}
                </Badge>
                <Text fontWeight="bold">{task.title}</Text>
                <Text fontSize="sm" color="gray.600">{task.description}</Text>
            </VStack>
        </Box>
    );
}

export default TaskCard;
