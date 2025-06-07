import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const {loading} = useContext(ShopContext);
    const {progress} = useContext(ShopContext);
    useEffect(() => {
              if (products.length > 0) {
        setLatestProducts(products.slice(0, 10));
        }
        
    }, [products])
    return (
        <div>
      {/* Loading bar */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-64 h-4 bg-[#1c1c1c] rounded-full overflow-hidden shadow-inner shadow-black">
            <motion.div
              className="h-full bg-white rounded-full shadow-[0_0_10px_#ffffffcc]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>
        </div>
      )}
      {!loading && (
        <>
        <div id="latestcollection" className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, odit enim beatae magni aliquam possimus asperiores. Consequuntur autem eius nulla?</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
        </>
         )}
    </div>
    )
}

export default LatestCollection
