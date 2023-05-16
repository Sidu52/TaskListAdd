import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// components
import Home from './components/Home/Home';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';
import Nav from './components/Nav/Nav';




function App() {
  let context = useContext(AuthContext);


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
