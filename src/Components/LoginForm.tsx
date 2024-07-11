import {Input, FormControl, FormLabel, Button, Heading,} from "@chakra-ui/react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setUsername, setPassword} from '../redux/userSlice';
import {RootState} from '../redux/stores';
import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode";

const LoginForm = () => {
    const dispatch = useDispatch();
    const {username, password} = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(false);

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
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <Heading>Login</Heading>
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
                Submit
            </Button>
        </form>
    )
}
export default LoginForm;