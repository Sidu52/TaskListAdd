import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Component/login/login';
import Signup from "./Component/Signup/Signup";
import Home from "./Component/Home/Home";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve the token from cookies
        console.log(token)

        const response = await axios.post("http://localhost:8000/user/loginPage", { token });

        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error retrieving task data', error);
      }
    };


    fetchData();
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={!isLoggedIn ? <LoginForm /> : <Home />} />
          <Route path="/login" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
