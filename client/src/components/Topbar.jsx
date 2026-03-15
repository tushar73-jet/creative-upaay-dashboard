import { Flex, Heading, Button, HStack, Select } from "@chakra-ui/react";
import { UserButton } from "@clerk/clerk-react";

function Topbar({ priorityFilter, setFilterPriority, onAddTask }) {
    return (
        <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="extrabold">Mobile App</Heading>

            <HStack spacing="3">
                <Select
                    size="sm"
                    w="150px"
                    value={priorityFilter}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    bg="white"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Select>
                <Button colorScheme="blue" size="sm" onClick={onAddTask}>+ Add Task</Button>
                <UserButton afterSignOutUrl="/" />
            </HStack>
        </Flex>
    );
}

export default Topbar;