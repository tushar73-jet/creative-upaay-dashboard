import { Flex, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"

function Dashboard() {
    const tasks = useSelector((state) => state.tasks.tasks);

    const filterTasks = (status) => tasks.filter(task => task.status === status);

    return (
        <Flex h="100vh" bg="gray.100">
            <Sidebar />

            <Box flex="1" p="8" overflowY="auto">
                <Topbar />

                <Flex gap="6" mt="8" align="flex-start">
                    <Column title="To Do" tasks={filterTasks('To Do')} />
                    <Column title="In Progress" tasks={filterTasks('In Progress')} />
                    <Column title="Done" tasks={filterTasks('Done')} />
                </Flex>
            </Box>
        </Flex>
    );
}

export default Dashboard