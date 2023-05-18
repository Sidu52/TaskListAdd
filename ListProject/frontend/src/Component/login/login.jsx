import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: #1c1c1c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("1")
      const response = await axios.post("http://localhost:8000/user/login", { email, password });
      if (response.status === 200) {
        Cookies.set('token', response.data.data);

        window.location.href = '/';
      } else {
        console.log("3")

        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputWrapper>
        <Button type='submit'>Login</Button>
        <Link to="/signup"> Click Here For SignUp Page </Link>

      </Form>
    </>
  )
}

export default LoginForm;
