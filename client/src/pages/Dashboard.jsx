import { 
    Flex, 
    Box, 
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { 
    DndContext, 
    closestCorners,
    useSensor,
    useSensors,
    PointerSensor
} from "@dnd-kit/core";
import { updateTaskStatus } from "../redux/tasksSlice";
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import Column from "../components/Column"
import AddTaskModal from "../components/AddTaskModal";

function Dashboard() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [activeColumn, setActiveColumn] = useState("To Do");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        tasks.forEach(task => {
            if (task.reminder && task.status !== 'Done' && task.dueDate) {
                const dueDate = new Date(task.dueDate);
                if (dueDate <= today) {
                    const isOverdue = dueDate < today;
                    toast({
                        title: isOverdue ? "Action Required: Overdue Task" : "Reminder: Task Due Today",
                        description: `"${task.title}" is ${isOverdue ? 'past' : 'at'} its deadline.`,
                        status: isOverdue ? "error" : "warning",
                        duration: 6000,
                        isClosable: true,
                        position: "top-right",
                        variant: "subtle"
                    });
                }
            }
        });
    }, [tasks.length]); 

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

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
                <Topbar
                    priorityFilter={priorityFilter}
                    setFilterPriority={setPriorityFilter}
                    onAddTask={() => { setActiveColumn("To Do"); onOpen(); }}
                />

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <Flex gap="6" mt="8" align="flex-start">
                        <Column
                            id="To Do"
                            title="To Do"
                            tasks={filterTasks('To Do')}
                            onAddTask={(col) => { setActiveColumn(col); onOpen(); }}
                        />
                        <Column
                            id="In Progress"
                            title="In Progress"
                            tasks={filterTasks('In Progress')}
                            onAddTask={(col) => { setActiveColumn(col); onOpen(); }}
                        />
                        <Column
                            id="Done"
                            title="Done"
                            tasks={filterTasks('Done')}
                            onAddTask={(col) => { setActiveColumn(col); onOpen(); }}
                        />
                    </Flex>
                </DndContext>
            </Box>

            <AddTaskModal isOpen={isOpen} onClose={onClose} defaultStatus={activeColumn} />
        </Flex>
    );
}

export default Dashboard