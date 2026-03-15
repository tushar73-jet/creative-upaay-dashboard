import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Flex 
          height="100vh" 
          width="100vw" 
          align="center" 
          justify="center" 
          bg="gray.50"
          direction="column"
          padding="4"
        >
          <VStack spacing="6">
            <VStack spacing="2">
              <Heading color="purple.600">Project M.</Heading>
              <Text color="gray.600">Please sign in to access your dashboard</Text>
            </VStack>
            <SignIn />
          </VStack>
        </Flex>
      </SignedOut>
    </>
  );
}

export default App
