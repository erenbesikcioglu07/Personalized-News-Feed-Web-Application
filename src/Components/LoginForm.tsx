import {
    Flex,
    Heading,
    Input,
    Button,
    Stack,
    Box,
    FormControl,
    FormLabel,
    AlertIcon,
    Alert,
    AlertTitle,
    Text,
    HStack
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {setUsername, setPassword} from '../redux/userSlice';
import {RootState} from '../redux/stores';
import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode";
import axios from "axios";


const LoginForm = () => {
    const dispatch = useDispatch();
    const {username, password} = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {username, password});
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('USER_INFO', JSON.stringify(jwtDecode(JSON.stringify(token))))
            setIsLoading(false);
            navigate('/NewsComponent');
            console.log("Login successful!", response.data);
        } catch (error) {
            setIsLoading(false);
            setLoginError(true);
            console.error(error);
        }
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            backgroundColor="grey.100"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="white">Log In</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit} >
                        <Stack
                            spacing={4}
                            p="3rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="dark-lg"
                            borderRadius={30}

                        >
                            <FormControl
                                id="username" isRequired>

                                <FormLabel>
                                    Username
                                </FormLabel>

                                <Input
                                    type="username"
                                    value={username}
                                    onChange={(e) => dispatch(setUsername(e.target.value))}/>
                            </FormControl>

                            <FormControl
                                id="password" isRequired>

                                <FormLabel>
                                    Password
                                </FormLabel>

                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => dispatch(setPassword(e.target.value))}/>
                            </FormControl>
                            <Button
                                isLoading={isLoading}
                                loadingText="Submitting"
                                colorScheme="teal"
                                variant="outline"
                                type="submit"
                            >
                                Log in
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <HStack>
                <Text color="white">New to us?</Text>
                <Button color="teal.500" onClick={() => navigate('/signup')}>
                    Sign Up
                </Button>
            </HStack>
            {loginError && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Username or password is incorrect!</AlertTitle>
                </Alert>
            )}
        </Flex>
    );
};

export default LoginForm;