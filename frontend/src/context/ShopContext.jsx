import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bestSeller, setBestSeller] = useState([]);
7
  const Navigate=useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Item added to cart!",{
        autoClose: 1500,
    });

    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})

        
      }catch(error){
                console.log(error);
        toast.error(error.message)
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

      }catch(error){
        console.log(error);
        toast.error(error.message)
      }
    }
  };


const getCartAmount = () => {
  let total = 0;

  for (const itemId in cartItems) {
    const product = products.find((product) => product._id === itemId);
    if (!product) continue;

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      if (quantity > 0) {
        total += product.price * quantity;
      }
    }
  }

  return total;
};
 
const getProductsData=async()=>{
  try{
    const res=await axios.get(backendUrl + '/api/product/list')
    if(res.data.success){
      setProducts(res.data.products)
    }else{
      toast.error(res.data.message)
    }
  }catch(error){
console.log(error);
toast.error(error.message);
  }
}
const getUserCart = async (token) => {
  try {
    const res = await axios.post(backendUrl+ "/api/cart/get", {}, {
      headers:{token}
    });

    if (res.data.success) {
      setCartItems(res.data.cartData); 
    }
  } catch (error) {
    console.error("Cart fetch error:", error);

    if (error.response?.status === 401) {
      alert("Unauthorized. Please login again.");
      Navigate("/login");
    }
  }
};
  
useEffect(()=>{
  getProductsData()
},[])

useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter(item => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));

      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  }, [products]);
useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'))
  }
},[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,setCartItems, 
    addToCart,
    getCartCount,
    updateQuantity,setToken,token,
    getCartAmount,Navigate,backendUrl,loading,progress,bestSeller
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
