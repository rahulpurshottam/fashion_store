// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setToken, backendUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Check how backendUrl is defined in your frontend
const handleLogin = async (e) => {
  e.preventDefault(); // should always come first
  try {
    const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('adminToken', response.data.token);
      toast.success("Login successful!",{ autoClose: 1500 });

    } else {
      toast.error(response.data.message || "Invalid credentials");
    }


  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed." || error.response?.data?.message,{ autoClose: 1500 } );
  }
};



  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='your@email.com'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='password'
              placeholder='Enter your password'
              required
            />
          </div>
          <button className='cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
