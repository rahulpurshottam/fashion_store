import React, { useState, useEffect} from 'react';              
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency='₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '');
useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer autoClose={1500} />
      {token === "" 
        ? <Login setToken={setToken} backendUrl={backendUrl} />            
        : 
          <>
            <Navbar setToken={setToken}/>
            <hr />
            <div className="flex w-full">
              <Sidebar />
              {/* 2. fix the className: close the brackets for ml-[max(...)] */}
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token}/>} />
                  <Route path="/orders" element={<Orders token={token}/>} />
                </Routes>
              </div>
            </div>
          </>
        
      }
    </div>
  );
};

export default App;
