import React, { createContext, useEffect, useState } from 'react';
import { removeItemLocalStorage } from '../utils/persistinguser';

let initialState = {
    user:''
}

const AuthContext = React.createContext();
const AuthContextProvider =({ children })=> {
    const [user, setUser] = useState(initialState);

    function settingUser(user){
        setUser(user)
    }

    function logout(){
      setUser('');
      removeItemLocalStorage('user');
      removeItemLocalStorage('authorization');
    }

    useEffect(()=>{
      // console.log(JSON.parse(localStorage.getItem('user')))
      if(JSON.parse(localStorage.getItem('user'))){
        setUser(JSON.parse(localStorage.getItem('user')).username)
      }
    },[])
  
    return (
      <AuthContext.Provider value={{user, settingUser,logout}}>
        {children}
      </AuthContext.Provider>
    );
  }

  export {AuthContext, AuthContextProvider};