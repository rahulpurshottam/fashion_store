import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X,Search } from 'lucide-react'; 
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location=useLocation();
  const [visible,setVisible]=useState(false);

useEffect(() => {
  if (location.pathname.includes('collection') ) {
    setVisible(true);
  } else {
    setVisible(false);
  }
}, [location, showSearch]);

if (!setSearch || !setShowSearch) return null;

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="flex-1 bg-inherit text-sm outline-none "
      />
      <Search className='w-4'/>
      </div>
      <X onClick={()=>setShowSearch(false)} className='inline w-4 cursor-pointer'/>
    </div>
  ):null;
};

export default SearchBar;
