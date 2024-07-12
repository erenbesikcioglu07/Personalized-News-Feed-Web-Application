import {
    Alert, AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setUsername, setPassword, setEmail} from '../redux/userSlice';
import {RootState} from '../redux/stores';


const RegisterForm:React.FC = () => {
    const dispatch = useDispatch();

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const {username, password, email} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (registerError) {
            timer = setTimeout(() => {
                setRegisterError(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [registerError]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_PORT_SIGNUP_URL}`, {username, password, email});
            console.log("Registered successful!", response.data);
            setRegisterSuccess(true);
        } catch (error) {
            console.error(error);
            setRegisterError(true);
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
                <Heading color="white">Register</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                   <form onSubmit={handleSubmit}>
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
                                   type="text"
                                   id="username"
                                   value={username}
                                   onChange={(e) => dispatch(setUsername(e.target.value))}
                               />
                           </FormControl>

                           <FormControl
                               id="password" isRequired>

                               <FormLabel>
                                   Password
                               </FormLabel>
                               <Input
                                   type="password"
                                   id="password"
                                   value={password}
                                   onChange={(e) => dispatch(setPassword(e.target.value))}
                               />
                           </FormControl>

                           <FormControl
                               id="email" isRequired>
                               <FormLabel>
                                   E-mail
                               </FormLabel>
                               <Input
                                   type="email"
                                   id="email"
                                   value={email}
                                   onChange={(e) => dispatch(setEmail(e.target.value))}
                               />
                           </FormControl>

                       <Button
                           colorScheme="teal"
                           variant="outline"
                           type="submit"
                       >
                           Register
                       </Button>
                        </Stack>

                   </form>
                </Box>
            </Stack>
            {registerSuccess && (
                <Alert status="success">
                    <AlertIcon />
                    <AlertTitle>Registration successful!</AlertTitle>
                </Alert>
            )}
            {registerError && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Registration failed!</AlertTitle>
                    <AlertDescription>Username or email already in use.</AlertDescription>
                </Alert>
            )}
        </Flex>

    )
}
export default RegisterForm;