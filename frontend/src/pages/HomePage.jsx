import {
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: "url('/chatbg.jpg')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="4rem 0 1.5rem 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="3xl">Chit Chat</Text>
        </Box>
        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          mb="4rem"
        >
          <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}
