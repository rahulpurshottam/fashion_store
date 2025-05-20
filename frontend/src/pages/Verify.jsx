import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      );

      if (res.data.success) {
        setCartItems({});
        toast.success("Payment Verified! Redirecting to your orders...");
        navigate('/orders');
      } else {
        toast.error("Payment failed. Redirecting to cart.");
        navigate('/cart');
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="text-center mt-8 text-lg font-semibold">
      Verifying your payment, please wait...
    </div>
  );
};

export default Verify;
