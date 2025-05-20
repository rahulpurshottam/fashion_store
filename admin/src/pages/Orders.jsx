import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Truck } from 'lucide-react'; // delivery icon
import { backendUrl, currency } from '../App';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Order fetch error:", error.response || error.message);
      toast.error("Failed to fetch orders.");
    }
  };
const statusHandler=async(e,orderId)=>{
  try {
    const res = await axios.post(
        backendUrl + '/api/order/status',
        {orderId,status:e.target.value},
        {
          headers: {Authorization: `Bearer ${token}`},
        });
        if (res.data.success) {
        await fetchAllOrders()
      } else {
             console.error(error);
      toast.error(error.message);
      }
      
  } catch (error) {
    
  }
}
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
<div className="p-6 max-w-4xl mx-auto">
  <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h3>

  <div className="flex flex-col gap-6">
    {orders.length === 0 && (
      <p className="text-gray-500 text-center">No orders found.</p>
    )}

    {orders.map((order, index) => (
      <div key={index} className="border rounded-lg p-6 shadow-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Truck className="w-5 h-5" />
            <span>Status: {order.status}</span>
          </div>
          <span className="text-gray-600 text-sm">
            {new Date(order.date).toLocaleString()}
          </span>
        </div>

        {/* Items */}
        <div className="mb-4 text-sm text-gray-700">
          {order.items.map((item, i) => (
            <p key={i}>
              {item.name} x {item.quantity} <span className="text-xs text-gray-500">({item.size})</span>
            </p>
          ))}
        </div>

        {/* Address */}
        <div className="mb-4 text-sm text-gray-600">
          <p className="font-medium">
            {order.address.firstName} {order.address.lastName}
          </p>
          <p>{order.address.street},</p>
          <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
          <p>Phone: {order.address.phone}</p>
        </div>

        {/* Payment Info */}
        <div className="flex flex-wrap justify-between text-sm text-gray-700">
          <p>Items: <span className="font-semibold">{order.items.length}</span></p>
          <p>Method: <span className="font-semibold">{order.paymentMethod}</span></p>
          <p>Payment: 
            <span className={`ml-1 font-semibold ${order.payment ? 'text-green-600' : 'text-red-500'}`}>
              {order.payment ? 'Done' : 'Pending'}
            </span>
          </p>
          <p>Total: <span className="font-semibold">{currency}{order.amount}</span></p>
        </div>

        {/* Status Dropdown */}
        <div className="mt-4">
          <select onChange={(e)=>statusHandler(e,order._id)}
            className="border rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={order.status}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
