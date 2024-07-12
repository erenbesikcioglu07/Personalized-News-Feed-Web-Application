import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import WelcomePage from "./Pages/WelcomePage";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import NewsPage from "./Pages/newsPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path="/NewsComponent" element={<NewsPage/>}/>
                <Route path="/MainPage" element={<MainPage/>} />
            </Route>
          <Route path="/" element={<WelcomePage/>} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;