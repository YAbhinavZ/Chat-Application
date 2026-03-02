import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

function Chat() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/chat");
      setChats(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container maxW="2xl" py={6}>
      <VStack gap={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Chats</Heading>
          <Button variant="ghost" size="sm" colorPalette="red" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Text color="fg.muted">Welcome, {user?.name}</Text>
        {loading ? (
          <Text color="fg.muted">Loading chats...</Text>
        ) : error ? (
          <Box p={4} borderRadius="md" bg="red.50" color="red.700">
            {error}
          </Box>
        ) : chats.length === 0 ? (
          <Box
            p={8}
            borderRadius="lg"
            bg="bg.subtle"
            borderWidth="1px"
            borderColor="border"
            textAlign="center"
          >
            <Text color="fg.muted">No chats yet. Create a new chat to get started!</Text>
          </Box>
        ) : (
        <VStack gap={3} align="stretch">
          {chats.map((chat) => {
            const displayName = chat.isGroupChat
              ? chat.chatName
              : chat.users?.find((u) => u._id?.toString() !== user?._id?.toString())?.name || chat.chatName || "Chat";
            return (
            <Box
              key={chat._id}
              p={4}
              borderRadius="md"
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border"
              _hover={{ borderColor: "blue.500" }}
              cursor="pointer"
            >
              <Text fontWeight="medium">{displayName}</Text>
              <Text fontSize="sm" color="fg.muted">
                {chat.isGroupChat ? "Group" : "Direct chat"}
              </Text>
            </Box>
          );
          })}
        </VStack>
        )}
      </VStack>
    </Container>
  );
}

export default Chat;
