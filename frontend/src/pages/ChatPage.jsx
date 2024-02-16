import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  const { user } = ChatState();

  return (
    <div
      style={{
        width: "100%",
        backgroundImage: "url('/chatbg.jpg')",
        height: "100%",
      }}
    >
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}
