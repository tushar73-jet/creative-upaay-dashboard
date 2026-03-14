import { Flex, Heading, Button, HStack, useDisclosure } from "@chakra-ui/react";
import AddTaskModal from "./AddTaskModal";

function Topbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="extrabold">Mobile App</Heading>

            <HStack spacing="3">
                <Button variant="outline" size="sm">Filter</Button>
                <Button colorScheme="blue" size="sm" onClick={onOpen}>+ Add Task</Button>
                <Button colorScheme="gray" variant="ghost" size="sm">Share</Button>
            </HStack>

            <AddTaskModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

export default Topbar;