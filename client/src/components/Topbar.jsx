import { 
  Flex, 
  Box, 
  Heading, 
  Button, 
  HStack, 
  VStack,
  Input, 
  InputGroup, 
  InputLeftElement, 
  Icon, 
  Avatar, 
  AvatarGroup, 
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Circle
} from "@chakra-ui/react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { 
  Search, 
  Calendar, 
  MessageSquareMore, 
  Bell, 
  Filter, 
  ChevronDown, 
  Share2, 
  SquarePen, 
  Rows, 
  LayoutGrid,
  Plus,
  Link as LinkIcon
} from "lucide-react";

function Topbar({ priorityFilter, setFilterPriority, onAddTask }) {
  const { user } = useUser();

  return (
    <VStack spacing={8} align="stretch" w="full" mb={8}>
      {/* Search and User Row */}
      <Flex justify="space-between" align="center" pt={2}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={Search} color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search for anything..." 
            bg="white" 
            border="none" 
            borderRadius="md" 
            fontSize="sm"
            _placeholder={{ color: "gray.400" }}
            boxShadow="xs"
          />
        </InputGroup>

        <HStack spacing={6}>
          <HStack spacing={4} color="gray.500">
            <Icon as={Calendar} size={20} cursor="pointer" />
            <Icon as={MessageSquareMore} size={20} cursor="pointer" />
            <Icon as={Bell} size={20} cursor="pointer" />
          </HStack>

          <HStack spacing={3}>
            <VStack spacing={0} align="flex-end">
              <Text fontSize="sm" fontWeight="600" color="gray.800">{user?.fullName || "Palak Jain"}</Text>
              <Text fontSize="xs" color="gray.500">Rajasthan, India</Text>
            </VStack>
            <UserButton afterSignOutUrl="/" />
          </HStack>
        </HStack>
      </Flex>

      {/* Project Title Row */}
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Heading size="2xl" fontWeight="700" color="gray.800">Mobile App</Heading>
          <HStack spacing={2}>
            <Circle size="7" bg="blue.50" cursor="pointer">
              <Icon as={SquarePen} size={14} color="blue.500" />
            </Circle>
            <Circle size="7" bg="blue.50" cursor="pointer">
              <Icon as={LinkIcon} size={14} color="blue.500" />
            </Circle>
          </HStack>
        </HStack>

        <HStack spacing={4}>
          <HStack spacing={2} cursor="pointer">
            <Circle size="6" bg="blue.50" color="blue.500">
              <Icon as={Plus} size={14} />
            </Circle>
            <Text color="blue.500" fontWeight="600" fontSize="sm">Invite</Text>
          </HStack>
          <AvatarGroup size="sm" max={5}>
            <Avatar src="https://bit.ly/dan-abramov" />
            <Avatar src="https://bit.ly/tioluwani-kolawole" />
            <Avatar src="https://bit.ly/kent-c-dodds" />
            <Avatar src="https://bit.ly/ryan-florence" />
            <Avatar src="https://bit.ly/sage-adebayo" />
          </AvatarGroup>
        </HStack>
      </Flex>

      {/* Filter Row */}
      <Flex justify="space-between" align="center">
        <HStack spacing={3}>
          <Menu>
            <MenuButton 
              as={Button} 
              leftIcon={<Icon as={Filter} size={16} />} 
              rightIcon={<Icon as={ChevronDown} size={16} />}
              variant="outline"
              borderColor="gray.200"
              size="sm"
              color="gray.500"
              bg="white"
              fontWeight="500"
            >
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilterPriority("All")}>All Priorities</MenuItem>
              <MenuItem onClick={() => setFilterPriority("High")}>High</MenuItem>
              <MenuItem onClick={() => setFilterPriority("Medium")}>Medium</MenuItem>
              <MenuItem onClick={() => setFilterPriority("Low")}>Low</MenuItem>
            </MenuList>
          </Menu>

          <Button 
            leftIcon={<Icon as={Calendar} size={16} />} 
            rightIcon={<Icon as={ChevronDown} size={16} />}
            variant="outline"
            borderColor="gray.200"
            size="sm"
            color="gray.500"
            bg="white"
            fontWeight="500"
          >
            Today
          </Button>
        </HStack>

        <HStack spacing={3}>
          <Button 
            leftIcon={<Icon as={Share2} size={16} />}
            variant="outline"
            borderColor="gray.200"
            size="sm"
            color="gray.500"
            bg="white"
            fontWeight="500"
          >
            Share
          </Button>
          <Box h="20px" w="1px" bg="gray.300" />
          <IconButton icon={<Icon as={Rows} size={18} />} size="sm" variant="solid" bg="blue.600" color="white" />
          <IconButton icon={<Icon as={LayoutGrid} size={18} />} size="sm" variant="ghost" color="gray.400" />
          
          <Button
            leftIcon={<Icon as={Plus} size={16} />}
            bg="blue.600"
            color="white"
            size="sm"
            px={4}
            fontWeight="600"
            _hover={{ bg: "blue.700" }}
            onClick={onAddTask}
          >
            Add Task
          </Button>
        </HStack>
      </Flex>
    </VStack>
  );
}

export default Topbar;