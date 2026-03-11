import { Box, Heading } from "@chakra-ui/react";

function Column({ title }) {
    return (
        <Box
            flex="1"
            bg="white"
            p="4"
            borderRadius="lg"
            minH="400px"
        >
            <Heading size="md" mb="4">{title}</Heading>
        </Box>
    );
}

export default Column;