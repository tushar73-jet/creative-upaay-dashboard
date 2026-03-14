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
    IconButton 
} from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask } from "../redux/tasksSlice";

function TaskCard({ task }) {
    const dispatch = useDispatch();

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
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            mb="3"
            _hover={{ boxShadow: "md" }}
        >
            <VStack align="stretch" spacing="2">
                <HStack justify="space-between" align="start">
                    <Badge w="fit-content" colorScheme={getPriorityColor(task.priority)}>
                        {task.priority || 'Low'}
                    </Badge>
                    
                    <Menu size="sm">
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<MoreVertical size={16} />}
                            variant="ghost"
                            size="xs"
                        />
                        <MenuList>
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

                <Text fontWeight="bold">{task.title}</Text>
                <Text fontSize="sm" color="gray.600">{task.description}</Text>
            </VStack>
        </Box>
    );
}

export default TaskCard;
