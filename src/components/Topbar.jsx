import { Flex, Heading, Button, HStack } from "@chakra-ui/react";

function Topbar() {
    return (
        <Flex justify="space-between" align="center">
            <Heading size="lg">Mobile App</Heading>

            <HStack spacing="3">
                <Button variant="outline">Filter</Button>
                <Button colorScheme="blue">Share</Button>
            </HStack>
        </Flex>
    );
}

export default Topbar;