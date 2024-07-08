import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import WelcomePage from "./Pages/WelcomePage";
import MainPage from "./Pages/MainPage";

function App() {
  return (
      <ChakraProvider>

          <WelcomePage/>
          <MainPage/>

      </ChakraProvider>

  );
}

export default App;
