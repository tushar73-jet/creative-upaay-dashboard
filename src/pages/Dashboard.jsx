import { Flex, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { updateTaskStatus } from "../redux/tasksSlice";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"

function Dashboard() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [priorityFilter, setPriorityFilter] = useState("All");

    const filterTasks = (status) => {
        return tasks.filter(task => {
            const matchesStatus = task.status === status;
            const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
            return matchesStatus && matchesPriority;
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            const taskId = active.id;
            const newStatus = over.id; // The column ID is the status
            
            dispatch(updateTaskStatus({ id: taskId, newStatus }));
        }
    };

    return (
        <Flex h="100vh" bg="gray.100">
            <Sidebar />

            <Box flex="1" p="8" overflowY="auto">
                <Topbar priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />

                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <Flex gap="6" mt="8" align="flex-start">
                        <Column id="To Do" title="To Do" tasks={filterTasks('To Do')} />
                        <Column id="In Progress" title="In Progress" tasks={filterTasks('In Progress')} />
                        <Column id="Done" title="Done" tasks={filterTasks('Done')} />
                    </Flex>
                </DndContext>
            </Box>
        </Flex>
    );
}

export default Dashboard