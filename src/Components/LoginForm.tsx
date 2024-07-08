import {Form} from "react-router-dom";
import {Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Heading,} from "@chakra-ui/react";


const LoginForm = () => {


    return (
        <div>
            <FormControl>
                <Heading>Login</Heading>
                <FormLabel>
                    Username:
                    <Input type="text" name="username" />
                </FormLabel>
                <FormLabel>
                    Password:
                    <Input type="text" name="password" />
                </FormLabel>
                <Button type="submit" value="Submit" >Submit</Button>
            </FormControl>
        </div>
    );
}
export default LoginForm;