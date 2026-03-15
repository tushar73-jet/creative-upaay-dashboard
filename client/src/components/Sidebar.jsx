import { Box, Heading, VStack, Text, HStack, Icon, Divider, Circle, Button } from "@chakra-ui/react";
import {
    Home,
    MessageSquare,
    SquareCheckBig,
    Users,
    Settings,
    PlusSquare,
    ChevronLeft,
    Lightbulb
} from "lucide-react";

const NavItem = ({ icon, label, active }) => (
    <HStack
        spacing={3}
        py={2.5}
        px={3}
        cursor="pointer"
        color={active ? "gray.800" : "gray.500"}
        fontWeight={active ? "700" : "600"}
        background={active ? "gray.50" : "transparent"}
        borderRadius="md"
        _hover={{ color: "gray.800", bg: "gray.50" }}
    >
        <Icon as={icon} size={20} />
        <Text fontSize="md">{label}</Text>
    </HStack>
);

const ProjectItem = ({ color, label, active }) => (
    <HStack
        spacing={3}
        py={2}
        px={3}
        cursor="pointer"
        color={active ? "gray.800" : "gray.500"}
        fontWeight={active ? "700" : "600"}
        background={active ? "gray.50" : "transparent"}
        borderRadius="md"
        _hover={{ color: "gray.800", bg: "gray.50" }}
    >
        <Circle size="2" bg={color} />
        <Text fontSize="md">{label}</Text>
        {active && <Text ml="auto" fontWeight="bold">...</Text>}
    </HStack>
);

function Sidebar() {
    return (
        <Box
            w="280px"
            bg="white"
            p="6"
            borderRight="1px"
            borderColor="gray.200"
            display="flex"
            flexDirection="column"
            h="100vh"
        >
            <HStack justify="space-between" mb="10" px={2}>
                <HStack spacing={3}>
                    <Circle size="8" bg="purple.500" display="flex" alignItems="center" justifyContent="center">
                        <Box w="3" h="3" borderRadius="20%" border="2px solid white" transform="rotate(45deg)" />
                    </Circle>
                    <Heading size="md" color="gray.800" fontWeight="700">Project M.</Heading>
                </HStack>
                <Icon as={ChevronLeft} color="gray.400" cursor="pointer" />
            </HStack>

            <VStack align="stretch" spacing={1} mb="10">
                <NavItem icon={Home} label="Home" />
                <NavItem icon={MessageSquare} label="Messages" />
                <NavItem icon={SquareCheckBig} label="Tasks" active />
                <NavItem icon={Users} label="Members" />
                <NavItem icon={Settings} label="Settings" />
            </VStack>

            <Divider mb="8" />

            <HStack justify="space-between" mb="5" px={2}>
                <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="widest">My Projects</Text>
                <Icon as={PlusSquare} color="gray.400" size={16} cursor="pointer" />
            </HStack>

            <VStack align="stretch" spacing={1} mb="10">
                <ProjectItem color="green.400" label="Mobile App" active />
                <ProjectItem color="orange.400" label="Website Redesign" />
                <ProjectItem color="purple.400" label="Design System" />
                <ProjectItem color="blue.400" label="Wireframes" />
            </VStack>

            <Box
                mt="auto"
                bg="gray.50"
                p="5"
                borderRadius="3xl"
                position="relative"
                textAlign="center"
            >
                <Circle
                    size="12"
                    bg="gray.50"
                    position="absolute"
                    top="-6"
                    left="50%"
                    transform="translateX(-50%)"
                    boxShadow="sm"
                >
                    <Circle size="6" bg="yellow.100" />
                    <Icon as={Lightbulb} color="yellow.500" position="absolute" size={16} />
                </Circle>
                <VStack spacing={3} pt={6}>
                    <Text fontSize="sm" fontWeight="800" color="gray.800">Thoughts Time</Text>
                    <Text fontSize="xs" color="gray.500" lineHeight="tall">
                        We don't have any notice for you, till then you can share your thoughts with your peers.
                    </Text>
                    <Button size="sm" bg="white" color="gray.800" fontWeight="700" boxShadow="sm" w="full" py={5} _hover={{ bg: "gray.50" }}>
                        Write a message
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default Sidebar;