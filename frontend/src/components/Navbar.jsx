import React, { useContext, useState } from 'react';
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound, AlignJustify, MoveLeft } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, Navigate, setCartItems } = useContext(ShopContext);

  const logout = () => {
    Navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium px-4 sm:px-10'>
      {/* Logo */}
      <Link to='/'><img src={assets.logo} className='w-36' alt='Logo' /></Link>

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 items-center'>
        <li>
          <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6 text-gray-700">
        <Search onClick={() => setShowSearch(true)} className="w-5 cursor-pointer" />

{/* Profile Icon (Conditional Rendering) */}
<div className="relative group">
  <CircleUserRound
    className="w-5 cursor-pointer"
    onClick={() => 
      token?null:Navigate('/login')
    }
  />
  {token && (
    <div className="absolute right-0 pt-4 hidden group-hover:block z-10">
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
        <p className="cursor-pointer hover:text-black">My Profile</p>
        <p onClick={()=>Navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
        <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
      </div>
    </div>
  )}
</div>
  

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <ShoppingCart className='w-5 cursor-pointer' />
          <p className="absolute right-[-5px] bottom-[-4px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>

        {/* Mobile Menu Icon */}
        <AlignJustify onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' />
      </div>

      {/* Sidebar menu for mobile */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out z-50 ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <MoveLeft className='h-5' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
