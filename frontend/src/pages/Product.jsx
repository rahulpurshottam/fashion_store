import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    if (products.length) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
<div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 w-full">
  {/* Left: Image & Thumbnails */}
  <div className="flex flex-col sm:flex-row gap-4 sm:min-w-0 sm:max-w-[50%] w-full">
    {/* Thumbnails */}
    <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-y-auto sm:w-[80px] order-2 sm:order-1">
{productData.image.map((item, index) => {
  const isActive = item === image;  // Check if this thumbnail is the selected image

  return (
    <img
      key={index}
      src={item}
      alt={`Product thumbnail ${index + 1}`}
      onClick={() => setImage(item)}
      className={`w-[24%] sm:w-full sm:h-auto cursor-pointer object-cover rounded ${
        isActive ? 'border-2 border-black-500' : 'border border-transparent'
      }`}
    />
  );
})}

    </div>

    {/* Main Image */}
    <div className="flex-1 order-1 sm:order-2">
      <img
        src={image}
        alt={`${productData.name} main image`}
        className="w-[95%] h-auto"
      />
    </div>
  </div>

  {/* Right: Product Details */}
  <div className="flex-1 min-w-0">
    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

    <div className="flex items-center gap-1 mt-2">
      <img src={assets.star} alt="rating" className="w-20 h-auto" />
      <p className="pl-1">(122)</p>
    </div>

    <p className="mt-5 text-3xl font-medium">
      {currency}
      {productData.price}
    </p>

    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

    <div className="flex flex-col gap-4 my-8">
      <p>Select Size</p>
      <div className="flex gap-2 flex-wrap">
        {productData.sizes.map((item, index) => (
          <button
            onClick={() => setSize(item)}
            key={index}
            className={`border py-2 px-4 bg-gray-100 ${
              item === size ? "border-orange-500" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    <button onClick={()=>addToCart(productData._id,size)}
      className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ${
        !size ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={!size}
    >
      ADD TO CART
    </button>

    <hr className="mt-8 sm:w-4/5" />

    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
      <p>100% Original Product.</p>
      <p>Cash on delivery is available on this product.</p>
      <p>Easy return and Exchange Policy within 7 Days.</p>
    </div>
  </div>
</div>


      {/* description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam odio consequuntur sint perferendis magni error cum sunt possimus deserunt repellat!
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ex eveniet! Cumque voluptatibus velit id.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="text-center py-20 text-gray-400">Loading product...</div>
  );
};

export default Product;
