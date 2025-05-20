import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';     
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();    

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        console.log('Sign Up Response:', res.data);

        if (res.data.success) {
          toast.success("Registered successfully! Please log in.");
          setCurrentState('Login');
          setName('');
          setEmail('');
          setPassword('');
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Login flow
        const res = await axios.post(backendUrl+ '/api/user/login', { email, password });
        console.log('Login Response:', res.data);

        if (res.data.success) {
          const userToken = res.data.token;
          console.log('Token:', userToken);

          setToken(userToken);                     // Update context state
          localStorage.setItem('token', userToken);  // Save to localStorage

          // Verify localStorage value immediately after setting
          console.log('Token in localStorage:', localStorage.getItem('token'));

          toast.success("Logged in successfully!");
          navigate('/');  // Navigate home immediately after login
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    console.log('Token changed:', token);
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' && (
          <p className="cursor-pointer">Forgot your Password?</p>
        )}
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Already have an account? Login Here
          </p>
        )}
      </div>

      <button
        type="submit" 
        className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer"
      >
        {currentState === 'Login' ? 'Sign in' : 'Sign up'}
      </button>
    </form>
  );
};

export default Login;
