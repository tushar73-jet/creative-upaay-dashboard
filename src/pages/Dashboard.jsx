import { Flex, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"
import { useState } from "react";

function Dashboard() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const [priorityFilter, setPriorityFilter] = useState("All");

    const filterTasks = (status) => {
        return tasks.filter(task => {
            const matchesStatus = task.status === status;
            const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
            return matchesStatus && matchesPriority;
        });
    };

    return (
        <Flex h="100vh" bg="gray.100">
            <Sidebar />

            <Box flex="1" p="8" overflowY="auto">
                <Topbar priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />

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