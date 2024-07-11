import {Button, FormLabel, Heading, Input} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setUsername, setPassword, setEmail} from '../redux/userSlice';
import {RootState} from '../redux/stores';

const RegisterForm:React.FC = () => {
    const dispatch = useDispatch();
    const {username, password, email} = useSelector((state: RootState) => state.user);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {username, password, email});
            console.log("Registered successful!", response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
       <div>
           <form onSubmit={handleSubmit}>

               <Heading>Register</Heading>

               <FormLabel>
                   Username:
                   <Input
                       type="text"
                       id="username"
                       value={username}
                       onChange={(e) => dispatch(setUsername(e.target.value))}
                   />
               </FormLabel>

               <FormLabel>
                   Password:
                   <Input
                       type="password"
                       id="password"
                       value={password}
                       onChange={(e) => dispatch(setPassword(e.target.value))}
                   />
               </FormLabel>

               <FormLabel>
                   Email:
                   <Input
                       type="email"
                       id="email"
                       value={email}
                       onChange={(e) => dispatch(setEmail(e.target.value))}
                   />
               </FormLabel>

               <Button
                   type="submit"
               >
                   Register
               </Button>

           </form>
       </div>
    )
}
export default RegisterForm;