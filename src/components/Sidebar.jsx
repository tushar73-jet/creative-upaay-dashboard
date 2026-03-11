import { Box, Heading, VStack, Text } from "@chakra-ui/react";

function Sidebar() {
    return (
        <Box
            w="220px"
            bg="white"
            p="5"
            borderRight="1px"
            borderColor="gray.200"
        >
            <Heading size="md" mb="5">Project M.</Heading>

            <VStack align="stretch" spacing="3">
                <Text cursor="pointer" _hover={{ color: "blue.500" }}>Home</Text>
                <Text cursor="pointer" _hover={{ color: "blue.500" }}>Messages</Text>
                <Text cursor="pointer" _hover={{ color: "blue.500" }}>Tasks</Text>
                <Text cursor="pointer" _hover={{ color: "blue.500" }}>Members</Text>
                <Text cursor="pointer" _hover={{ color: "blue.500" }}>Settings</Text>
            </VStack>
        </Box>
    );
}

export default Sidebar;