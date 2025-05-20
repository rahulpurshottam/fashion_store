import React, { useState } from 'react'
import { Upload } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { ToastContainer, toast } from 'react-toastify';

const Add = ({token}) => {
  const [loading, setLoading] = useState(false);
const [image1, setImage1] = useState(false);
const [image2, setImage2] = useState(false);
const [image3, setImage3] = useState(false);
const [image4, setImage4] = useState(false);

  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState("Men");
  const [subCategory,setSubCategory]=useState("Topwear");
  const [bestseller,setBestseller]=useState(false);
  const [sizes,setSizes]=useState([]);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true); 

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));
    image1 && formData.append("image1",image1);
    image2 && formData.append("image2",image2);
    image3 && formData.append("image3",image3);
    image4 && formData.append("image4",image4);

    const response = await axios.post(
      `${backendUrl}/api/product/add`,
      formData,
      {
        headers: {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',
},
      }
    );
    setLoading(false);
    setName("");
setDescription("");
setPrice("");
setCategory("Men");
setSubCategory("Topwear");
setBestseller(false);
setSizes([]);
setImage1(false);
setImage2(false);
setImage3(false);
setImage4(false);
    toast.success("Product added successfully!",{ autoClose: 1500 });
  } catch (error) {
    console.error(error.response?.data || error.message);
    toast.error("Something went wrong! " || error.response?.data?.message,{ autoClose: 1500 } );
  }
};


  return (
      <>
    {loading && (
      <div className="flex items-center mt-2 text-sm text-gray-600">
        <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        Adding the product , please wait...
      </div>
    )}
<form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
    <div className="p-4">
      <p className="mb-2">Upload Image</p>
<div className="flex gap-4">
<label htmlFor='image1' className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-md hover:border-blue-500 transition"
>
   {image1 ? (<img src={URL.createObjectURL(image1)} alt="Uploaded" className="w-full h-full object-cover"/> ) : (<Upload className="text-gray-600 w-6 h-6" />)}
<input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
</label>
<label htmlFor='image2'className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-md hover:border-blue-500 transition"
>
{image2 ? (<img src={URL.createObjectURL(image2)} alt="Uploaded" className="w-full h-full object-cover"/> ) : (<Upload className="text-gray-600 w-6 h-6" />)}

<input onChange={(e)=>setImage2(e.target.files[0])}  type="file" id="image2" hidden/>
</label>
<label htmlFor='image3' className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-md hover:border-blue-500 transition"
>
{image3 ? (<img src={URL.createObjectURL(image3)} alt="Uploaded" className="w-full h-full object-cover"/> ) : (<Upload className="text-gray-600 w-6 h-6" />)}

<input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
</label>
<label htmlFor='image4' className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded-md hover:border-blue-500 transition"
>
{image4 ? (<img src={URL.createObjectURL(image4)} alt="Uploaded" className="w-full h-full object-cover"/> ) : (<Upload className="text-gray-600 w-6 h-6" />)}

<input onChange={(e)=>setImage4(e.target.files[0])}  type="file" id="image4" hidden/>
</label>
</div>

    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here ' required/>
    </div>
      <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write description ' required/>
    </div>
    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2 '>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)} className='px-3 py-2 w-full'>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div> 
        <p className='mb-2 '>Sub Category</p>
        <select onChange={(e)=>setSubCategory(e.target.value)} className='px-3 py-2 w-full'>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Product Price</p>
         <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='499' />
      </div>
    </div>
    <div>
      <p className='mb-2 '>Product Size</p>
    <div className='flex gap-3'>
  <div onClick={() => setSizes(prev => 
    prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"]
  )}>
    <p className={`px-3 py-1 cursor-pointer rounded 
      ${sizes.includes("S") ? "bg-black text-white" : "bg-slate-200 text-black"}`}>S</p>
  </div>

  <div onClick={() => setSizes(prev => 
    prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"]
  )}>
    <p className={`px-3 py-1 cursor-pointer rounded 
      ${sizes.includes("M") ? "bg-black text-white" : "bg-slate-200 text-black"}`}>M</p>
  </div>

  <div onClick={() => setSizes(prev => 
    prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"]
  )}>
    <p className={`px-3 py-1 cursor-pointer rounded 
      ${sizes.includes("L") ? "bg-black text-white" : "bg-slate-200 text-black"}`}>L</p>
  </div>

  <div onClick={() => setSizes(prev => 
    prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"]
  )}>
    <p className={`px-3 py-1 cursor-pointer rounded 
      ${sizes.includes("XL") ? "bg-black text-white" : "bg-slate-200 text-black"}`}>XL</p>
  </div>
</div>

    </div>
    <div className='flex gap-2 mt-2'>
  <input
    type="checkbox"
    id="bestseller"
    checked={bestseller}
    onChange={() => setBestseller(prev => !prev)}
  />
  <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
</div>

<button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
</form>
</>
  )
}

export default Add