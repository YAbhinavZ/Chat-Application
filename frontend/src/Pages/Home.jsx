import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import {
  IoChatbubblesSharp,
  IoPeopleOutline,
  IoLockClosedOutline,
  IoRocketOutline,
} from "react-icons/io5";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: IoPeopleOutline,
      title: "Group Chats",
      description: "Connect with multiple friends at once",
    },
    {
      icon: IoLockClosedOutline,
      title: "Secure",
      description: "Your conversations stay private",
    },
    {
      icon: IoRocketOutline,
      title: "Real-time",
      description: "Instant messaging when it matters",
    },
  ];

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Background gradient & pattern */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 211, 238, 0.08) 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />
      {/* Decorative chat bubbles */}
      <Box
        position="absolute"
        top="15%"
        left="10%"
        opacity={0.15}
        transform="rotate(-12deg)"
      >
        <Icon as={IoChatbubblesSharp} boxSize={24} color="blue.400" />
      </Box>
      <Box
        position="absolute"
        top="60%"
        right="15%"
        opacity={0.12}
        transform="rotate(8deg)"
      >
        <Icon as={IoChatbubblesSharp} boxSize={20} color="purple.400" />
      </Box>
      <Box
        position="absolute"
        bottom="20%"
        left="20%"
        opacity={0.1}
        transform="rotate(5deg)"
      >
        <Icon as={IoChatbubblesSharp} boxSize={16} color="cyan.400" />
      </Box>

      <Box position="relative" zIndex={1}>
        {/* Hero section */}
        <Flex
          minH="100vh"
          direction="column"
          align="center"
          justify="center"
          px={6}
          py={20}
        >
          <Container maxW="4xl">
            <VStack gap={10} textAlign="center">
              {/* Logo/brand mark */}
              <Box
                p={4}
                borderRadius="2xl"
                bg="rgba(59, 130, 246, 0.15)"
                borderWidth="1px"
                borderColor="rgba(59, 130, 246, 0.3)"
              >
                <Icon
                  as={IoChatbubblesSharp}
                  boxSize={14}
                  color="blue.400"
                />
              </Box>

              <VStack gap={4}>
                <Heading
                  size="3xl"
                  fontWeight={700}
                  letterSpacing="-0.02em"
                  color="white"
                  fontFamily="Outfit, system-ui, sans-serif"
                >
                  Chat Application
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.400"
                  maxW="xl"
                  lineHeight={1.6}
                  fontFamily="Outfit, system-ui, sans-serif"
                >
                  Stay connected with your friends and groups. 
                  Simple, fast, and built for real conversations.
                </Text>
              </VStack>

              {/* CTA Buttons */}
              <VStack gap={5}>
                {user ? (
                  <>
                    <Text color="gray.300" fontSize="lg">
                      Welcome back, <Text as="span" color="blue.400" fontWeight={600}>{user.name}</Text>!
                    </Text>
                    <Button
                      onClick={() => navigate("/chats")}
                      size="xl"
                      colorPalette="blue"
                      px={10}
                      py={7}
                      fontSize="lg"
                      fontWeight={600}
                      borderRadius="xl"
                      _hover={{ transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      Go to Chats
                    </Button>
                  </>
                ) : (
                  <HStack gap={4} flexWrap="wrap" justify="center">
                    <Button
                      asChild
                      size="xl"
                      colorPalette="blue"
                      px={10}
                      py={7}
                      fontSize="lg"
                      fontWeight={600}
                      borderRadius="xl"
                      _hover={{ transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      px={10}
                      py={7}
                      fontSize="lg"
                      fontWeight={600}
                      borderRadius="xl"
                      borderColor="gray.500"
                      color="white"
                      _hover={{
                        bg: "whiteAlpha.100",
                        borderColor: "blue.400",
                        color: "blue.400",
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.2s"
                    >
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </HStack>
                )}
              </VStack>

              {/* Feature cards */}
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap={6}
                w="full"
                mt={16}
              >
                {features.map((feature) => (
                  <Box
                    key={feature.title}
                    p={6}
                    borderRadius="xl"
                    bg="rgba(30, 41, 59, 0.6)"
                    borderWidth="1px"
                    borderColor="rgba(71, 85, 105, 0.5)"
                    _hover={{
                      borderColor: "rgba(59, 130, 246, 0.4)",
                      bg: "rgba(30, 41, 59, 0.8)",
                    }}
                    transition="all 0.2s"
                  >
                    <VStack gap={3} align="center" textAlign="center">
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg="rgba(59, 130, 246, 0.2)"
                      >
                        <Icon
                          as={feature.icon}
                          boxSize={6}
                          color="blue.400"
                        />
                      </Box>
                      <Text fontWeight={600} color="white" fontSize="md">
                        {feature.title}
                      </Text>
                      <Text color="gray.500" fontSize="sm" lineHeight={1.5}>
                        {feature.description}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </Box>
  );
}

export default Home;
