import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    Switch,
    HStack,
    Text,
    Icon
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { v4 as uuidv4 } from 'uuid';

function AddTaskModal({ isOpen, onClose, defaultStatus = "To Do" }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");
    const [reminder, setReminder] = useState(false);

    const handleSubmit = () => {
        if (!title.trim()) return;

        const newTask = {
            id: uuidv4(),
            title,
            description,
            priority,
            status: defaultStatus,
            dueDate,
            reminder
        };

        dispatch(addTask(newTask));

        // Reset and close
        setTitle("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
        setReminder(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Task Title</FormLabel>
                            <Input
                                placeholder="What needs to be done?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Add more details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <HStack w="full" spacing={4}>
                            <FormControl flex="1">
                                <FormLabel>Priority</FormLabel>
                                <Select 
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </Select>
                            </FormControl>

                            <FormControl flex="1">
                                <FormLabel>Due Date</FormLabel>
                                <Input 
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    size="md"
                                />
                            </FormControl>
                        </HStack>

                        <FormControl display="flex" alignItems="center" pt={2}>
                            <FormLabel mb="0" fontSize="sm" fontWeight="medium">
                                Enable Reminder for this task?
                            </FormLabel>
                            <Switch 
                                isChecked={reminder} 
                                onChange={(e) => setReminder(e.target.checked)} 
                                colorScheme="purple"
                                ml="auto"
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue" onClick={handleSubmit}>Add Task</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddTaskModal;
