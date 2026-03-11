import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"

function Dashboard() {
    return (
        <Flex h="100vh">

            <Sidebar />

            <Box flex="1" p="5" bg="gray.50">

                <Topbar />

                <Flex gap="5" mt="5">
                    <Column title="To Do" />
                    <Column title="In Progress" />
                    <Column title="Done" />
                </Flex>

            </Box>
        </Flex>
    );
}

export default Dashboard