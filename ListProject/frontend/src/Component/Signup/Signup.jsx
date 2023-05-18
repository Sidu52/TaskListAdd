import React, { useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FormButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/create', { username, email, password });
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignupContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FormButton type="submit">Signup</FormButton>
        <Link to="/login"> Click Here For Login Page </Link>
      </FormContainer>
    </SignupContainer>
  )
}
