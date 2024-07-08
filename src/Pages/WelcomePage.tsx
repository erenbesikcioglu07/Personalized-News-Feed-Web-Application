import React, { useState } from 'react';
import {Box, Button , VStack} from '@chakra-ui/react'
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";


const WelcomePage = () => {
  const [form, setForm] = useState(''); // initial state is an empty string

  const renderForm = () => {
    if (form === 'login') {
      return <LoginForm />;
    } else if (form === 'register') {
        return <RegisterForm />;
    }
  };

  return(
    <VStack
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
    >
      <Box>
        <Button colorScheme='green' onClick={() => setForm('login')}>Login</Button>
        <Button colorScheme='orange' onClick={() => setForm('register')}>Register</Button>
      </Box>
      {renderForm()}
    </VStack>
  )
}

export default WelcomePage;