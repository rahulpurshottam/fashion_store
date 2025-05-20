import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }
const initpay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.curr,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (res) => {
      console.log(res);
      try{
        const {data} = await axios.post(
        backendUrl + '/api/order/verifyRazorpay',res,
        {
          headers: { token },
        })
        if(data.success){
          navigate('/orders')
          setCartItems({})
        }
      }catch(error){
        console.log(error);
        toast.error(error)
        
      }
    },
    prefill: {
      name: order.customerName || 'Customer',
      email: order.customerEmail || '',
      contact: order.customerPhone || '',
    },
    theme: {
      color: "#3399cc"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      let orderItems = []

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[itemId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        payment: method
      }

  switch (method) {
  case 'cod':
    try {
      const resCod = await axios.post(
        backendUrl + '/api/order/place',
        orderData,
        { headers: { token } }
      );

      if (resCod.data.success) {
        setCartItems({});
        toast.success("Order Placed Successfully!");
        navigate('/orders');
      } else {
        toast.error(resCod.data.message);
      }
    } catch (err) {
      toast.error("Failed to place COD order");
      console.error(err);
    }
    break;

  case 'stripe':
      const resStripe = await axios.post(
        backendUrl + '/api/order/stripe',orderData,
        {
          headers: { token },
        })
        if (resStripe.data.success) {
        const {session_url}=resStripe.data
        window.location.replace(session_url)
      } else {
        toast.error(resStripe.data.message);
      }
      
    break;

  case 'razorpay':
      const resRazorpay = await axios.post(
        backendUrl + '/api/order/razorpay',orderData,
        {
          headers: { token },
        })
        if (resRazorpay.data.success) {
       initpay(resRazorpay.data.order);
      } else {
        toast.error(resRazorpay.data.message);
      }
      
    break;

  default:
    break;
}

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandle} name='firstName' value={formData.firstName} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="First name" />
          <input required onChange={onChangeHandle} name='lastName' value={formData.lastName} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandle} name='email' value={formData.email} className='border py-1.5 px-3.5 w-full rounded' type="email" placeholder="Email Address" />
        <input onChange={onChangeHandle} name='street' value={formData.street} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandle} name='city' value={formData.city} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="City" />
          <input required onChange={onChangeHandle} name='state' value={formData.state} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandle} name='zipcode' value={formData.zipcode} className='border py-1.5 px-3.5 w-full rounded' type="number" placeholder="ZipCode" />
          <input required onChange={onChangeHandle} name='country' value={formData.country} className='border py-1.5 px-3.5 w-full rounded' type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandle} name='phone' value={formData.phone} className='border py-1.5 px-3.5 w-full rounded' type="number" placeholder="Phone Number" />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
