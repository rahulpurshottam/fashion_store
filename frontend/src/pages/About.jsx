import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 mb-6 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* IMAGE - Left */}
        <div className="md:w-2/4 flex justify-center">
          <img className="w-full md:max-w-[450px]" src={assets.about_us} alt="About us" />
        </div>

        {/* CONTENT - Right */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quis, nobis mollitia accusantium laudantium vitae. Eligendi expedita odio voluptatibus ullam!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque voluptatum saepe cumque harum amet? Vero ducimus quod repudiandae possimus cupiditate? Officiis dolorum, dolores exercitationem nesciunt, commodi inventore magnam quod consectetur quae neque ratione impedit?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            We aim to deliver quality products that enhance your lifestyle and contribute positively to your daily experience.
          </p>
        </div>
      </div>
<div className="py-12 text-center border-t">
  <div className="text-4xl mb-10">
    <Title text1={'WHY'} text2={'CHOOSE US'} />
  </div>

  <div className="grid border grid-cols-1 md:grid-cols-3 gap-8 text-left px-2 md:px-16 py-5">
    <div>
      <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
      <p className="text-gray-600 text-sm">
        Every product is carefully selected and inspected to ensure it meets our standards for quality, durability, and style. We never compromise on what we offer.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-lg mb-2">Convenience</h3>
      <p className="text-gray-600 text-sm">
        From a smooth browsing experience to quick checkouts and on-time delivery, our platform is designed to make your shopping journey easy and efficient.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-lg mb-2">Exceptional Customer Service</h3>
      <p className="text-gray-600 text-sm">
        Our friendly support team is here to help you every step of the way. Whether you have questions or need help, we’re just a message away.
      </p>
    </div>
  </div>
</div>
<NewsletterBox/>

    </div>
  )
}

export default About
