import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import WelcomePage from "./Pages/WelcomePage";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import NewsComponent from "./Pages/newsComponent";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path="/NewsComponent" element={<NewsComponent/>}/>
                <Route path="/MainPage" element={<MainPage/>} />
            </Route>
          <Route path="/" element={<WelcomePage/>} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;