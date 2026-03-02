import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/chats");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/chats");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={10}>
      <Box
        p={8}
        borderRadius="lg"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
      >
        <VStack gap={6} align="stretch">
          <Heading size="xl">Login</Heading>

          <form onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {error && (
                <Box
                  p={3}
                  borderRadius="md"
                  bg="red.50"
                  color="red.700"
                  fontSize="sm"
                >
                  {error}
                </Box>
              )}

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field.Root>

              <Button type="submit" loading={loading} width="full" size="lg">
                Login
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" color="fg.muted">
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <Text as="span" color="blue.500" fontWeight="medium" cursor="pointer">
                Sign up
              </Text>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default Login;
