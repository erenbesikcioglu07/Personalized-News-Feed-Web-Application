import {Button, FormControl, FormLabel, Heading, Input} from "@chakra-ui/react";
import React,{useState} from "react";
import axios from "axios";



const RegisterForm:React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            alert("Username and password cannot be empty")
            return;
        }
        else {
            try {
                await axios.post("http://localhost:3001/api/signup", { username, password });
                console.log("Signup successful!");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
       <div>
           <FormControl onSubmit={handleSubmit}>

               <Heading>Register</Heading>

               <FormLabel>
                   Username:
                   <Input
                       type="text"
                       id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                   />
               </FormLabel>

               <FormLabel>
                   Password:
                   <Input
                       type="text"
                       id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                   />
               </FormLabel>

               <Button
                   type="submit"
                   value="Submit"
               >Submit</Button>

           </FormControl>
       </div>
    )
}
export default RegisterForm;