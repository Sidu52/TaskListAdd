import './Signin.css'
import { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { getItemLocalStorage, setIteminLocalStorage } from '../../utils/persistinguser';
import { useNavigate,redirect } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';

function Signin(){
    let context = useContext(AuthContext);
    // console.log(context)


    let navigate = useNavigate();
    let [user, setUser] = useState({
        username:'',
        password:'',
    })

    function handleinput(e){
        setUser((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        let response = await fetch("http://localhost:8000/signin",{
        method:'POST',
        mode:'cors',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify(user)
      })
  
      let ans = await response.json();
    //   console.log(ans.message);
      if(ans.message != "error"){
          context.settingUser(ans.message.user.username);
          localStorage.setItem('user',JSON.stringify(ans.message.user))
          setIteminLocalStorage("authorization", ans.message.token);
        }
        setUser({
          username:'',
          password:'',
      })

    // navigate('/home');
    }

    useEffect(()=>{
        if(context.user.length > 1 ){
            return navigate('/home');
        }
    },[context.user]);
    return(
        <div className="signup-div">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
                <div>
                    <label>Username:</label>
                    <input name='username' type="text" onChange={handleinput} value={user.username} required/>
                </div>

                <div>
                    <label>Password:</label>
                    <input name='password' type="password" onChange={handleinput} value={user.password} required/>
                </div>


                <button>Sign In</button>
            </form>

            <Link className='link' to='/'><span>Sing Up</span></Link>
        </div>
    )
}

export default Signin;