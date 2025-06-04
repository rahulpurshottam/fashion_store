import React from 'react'
import {assets} from '../assets/assets'
const Hero = () => {
  return (
       <div className="flex flex-col sm:flex-row items-center justify-center border border-gray-300 rounded-xl shadow-lg overflow-hidden bg-[#fafafa]">
      {/* Left Side Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 px-6">
        <div className="text-[#1f1f1f] max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[2px] bg-[#1f1f1f]"></div>
            <p className="uppercase tracking-widest text-sm font-light text-gray-700">New Collection</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-playfair leading-tight mb-4">
            Fashion That Speaks for You
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-light mb-6">
            Discover timeless designs and trend-setting pieces that elevate your every look.
          </p>
          <a href="#latestcollection">
            <button className="px-6 py-2 bg-black text-white text-sm sm:text-base rounded-md shadow-md hover:bg-white hover:text-black hover:outline transition-all">
              Explore the Lookbook
            </button>
          </a>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full sm:w-1/2 flex justify-center p-6">
        <img
          src={assets.hero_img}
          alt="Stylish Apparel"
          className="w-[90%] h-[95%] object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  )
}

export default Hero
