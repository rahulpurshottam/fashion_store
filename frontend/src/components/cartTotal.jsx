import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const shipping = subtotal === 0 ? 0 : delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{currency}{shipping.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>{currency}{total}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
