import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      if (res.data.success) {
        setList(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
  try {
    const res = await axios.post(`${backendUrl}/api/product/remove`, { id }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data.success) {
      toast.success("Product deleted!");
      await fetchList();
    } else {
      toast.error(res.data.message,{autoClose:1500});
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message,{autoClose:1500});
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* Header (only on md+) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 items-center py-2 px-4 border text-sm"
          >
            {/* Image + name (mobile) */}
            <div className="flex md:block items-center gap-3">
              <img
                className="w-14 h-14 object-cover border rounded"
                src={item.image[0]}
                alt="product"
              />
              <div className="block md:hidden">
                <p className="text-gray-500 text-xs">Name</p>
                <p className="font-medium">{item.name}</p>
              </div>
            </div>

            {/* Name (desktop) */}
            <p className="hidden md:block">{item.name}</p>

            {/* Category */}
            <div className="block md:hidden">
              <p className="text-gray-500 text-xs">Category</p>
              <p>{item.category}</p>
            </div>
            <p className="hidden md:block">{item.category}</p>

            {/* Price */}
            <div className="block md:hidden">
              <p className="text-gray-500 text-xs">Price</p>
              <p>{currency}{item.price}</p>
            </div>
            <p className="hidden md:block">{currency}{item.price}</p>

            {/* Action */}
 <div
    className="absolute top-2 right-2 md:static md:text-center text-red-500 cursor-pointer text-lg"
    onClick={() => handleDelete(item._id)}
    title="Delete"
  >
              X
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
