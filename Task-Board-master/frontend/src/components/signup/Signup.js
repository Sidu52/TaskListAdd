import './Signup.css'
import { useState } from 'react';
import {Link} from "react-router-dom"

function Signup(){
    let [user, setUser] = useState({
        username:'',
        password:'',
        confirmpassword:''
    })

    function handleinput(e){
        setUser((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        let response = await fetch("http://localhost:8000/signup",{
        method:'POST',
        mode:'cors',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify(user)
      })
  
      let ans = await response.json();
      console.log(ans);

      setUser({
        username:'',
        password:'',
        confirmpassword:''
    })
    }

    return(
        <div className="signup-div">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
                <div>
                    <label>Username:</label>
                    <input name='username' type="text" onChange={handleinput} value={user.username} required/>
                </div>

                <div>
                    <label>Password:</label>
                    <input name='password' type="password" onChange={handleinput} value={user.password} required/>
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input name='confirmpassword' type="password" onChange={handleinput} value={user.confirmpassword} required/>
                </div>

                <button>Signup</button>
            </form>

            <Link className='link' to='/signin'><span>Sing In</span></Link>
        </div>
    )
}

export default Signup;