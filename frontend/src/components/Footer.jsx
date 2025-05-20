import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 test-sm">
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt=""/>
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo deleniti harum asperiores accusamus, similique eos fugit temporibus magnam nisi eius quidem sint sapiente quisquam quibusdam provident minima nihil perspiciatis ex!</p>
            </div>
            <div>
                 <p className='text-xl font-medium mb-5'>COMPANY</p>
                 <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
            </div>
            <div>
                <p className="text-xl mb-5 font-medium">GET IN TOUCH
                </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-1800-255353</li>
                    <li>info@voltex.com</li>
                </ul>
            </div>
    </div>
    <div>
        <hr/>
        <p className="py-5 text-sm text-center">Copyright 2025@ voltex.com - All Rights Reserved</p>
    </div>
    </div>
  )
}

export default Footer