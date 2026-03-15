import { Flex, Heading, Button, HStack, useDisclosure, Select } from "@chakra-ui/react";
import AddTaskModal from "./AddTaskModal";

function Topbar({ priorityFilter, setPriorityFilter }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="extrabold">Mobile App</Heading>

            <HStack spacing="3">
                <Select 
                    size="sm" 
                    w="150px" 
                    value={priorityFilter} 
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    bg="white"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Select>
                <Button colorScheme="blue" size="sm" onClick={onOpen}>+ Add Task</Button>
                <Button colorScheme="gray" variant="ghost" size="sm">Share</Button>
            </HStack>

            <AddTaskModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

export default Topbar;