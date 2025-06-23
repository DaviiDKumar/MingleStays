import React from 'react';
import { FaHotel, FaStar, FaShieldAlt, FaCcPaypal, FaCreditCard, FaLock, FaWifi, FaParking, FaSwimmingPool, FaSpa, FaConciergeBell, FaUtensils, FaDumbbell, FaWheelchair, FaPaw } from 'react-icons/fa'; // Using Font Awesome for simplicity

const InfoSection = () => {
  return (
    <section className="py-12 bg-[#f8f6f4] text-gray-800 mx-auto max-w-[93vw]">
      <div className="container mx-auto px-4">
        {/* Why Choose Mingletsyas Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl iceland-regular font-bold text-[#333] mb-3">
            Why Choose <span className="text-[#0ea5e9] iceland-regular">Mingletsyas</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience seamless booking, unmatched selection, and dedicated support.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"> {/* More columns, smaller gap */}
            {/* Card 1: Vast Selection */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center"> {/* Very small padding */}
              <FaHotel className="text-[#0ea5e9] text-xl mb-1" /> {/* Smaller icon */}
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">Vast Selection</h3> {/* Smaller heading */}
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5"> {/* Even smaller text */}
                Luxury to budget, perfect stay.
              </p>
            </div>

            {/* Card 2: Best Prices */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center">
              <FaStar className="text-[#0ea5e9] text-xl mb-1" />
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">Best Prices</h3>
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5">
                Unbeatable deals, guaranteed.
              </p>
            </div>

            {/* Card 3: Secure Booking */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center">
              <FaShieldAlt className="text-[#0ea5e9] text-xl mb-1" />
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">Secure Booking</h3>
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5">
                Encrypted, hassle-free.
              </p>
            </div>

            {/* Card 4: 24/7 Support */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center">
              <FaConciergeBell className="text-[#0ea5e9] text-xl mb-1" />
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">24/7 Support</h3>
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5">
                Dedicated help, anytime.
              </p>
            </div>

            {/* Card 5: Flexible Payments */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center">
              <div className="flex text-[#0ea5e9] text-xl mb-1">
                <FaCcPaypal className="mr-0.5" />
                <FaCreditCard />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">Flex Payments</h3>
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5">
                Many secure options.
              </p>
            </div>

            {/* Card 6: User-Friendly */}
            <div className="bg-white p-2 rounded-md shadow-sm flex flex-col items-center text-center border border-gray-100 aspect-square justify-center">
              <FaLock className="text-[#0ea5e9] text-xl mb-1" />
              <h3 className="text-sm font-semibold text-gray-800 leading-tight">User-Friendly</h3>
              <p className="text-gray-600 text-[0.6rem] leading-none mt-0.5">
                Easy booking platform.
              </p>
            </div>
          </div>
        </div>

        ---

        {/* Amenities Section - No change to this section as per request */}
        <div className="mb-10 ">
          <h2 className="text-3xl iceland-regular font-bold text-[#333] mb-8">
            Amenities & Features You'll Love
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Amenity 1: Free Wi-Fi */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaWifi className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Free Wi-Fi</span>
            </div>
            {/* Amenity 2: Free Parking */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaParking className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Free Parking</span>
            </div>
            {/* Amenity 3: Swimming Pool */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaSwimmingPool className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Pool</span>
            </div>
            {/* Amenity 4: Spa & Wellness */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaSpa className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Spa</span>
            </div>
            {/* Amenity 5: Restaurant */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaUtensils className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Restaurant</span>
            </div>
            {/* Amenity 6: Fitness Center */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaDumbbell className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Fitness</span>
            </div>
            {/* Amenity 7: Wheelchair Accessible */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaWheelchair className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Accessible</span>
            </div>
            {/* Amenity 8: Pet-Friendly */}
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <FaPaw className="text-[#0ea5e9] text-2xl" />
              <span className="text-sm text-gray-700">Pet-Friendly</span>
            </div>
          </div>
        </div>

        ---

        {/* Image Section - No change to this section as per request */}
        <div className="mb-10 ">
          <h2 className="text-3xl font-bold iceland-regular text-[#333] mb-8">
            See the Comfort, Book with Confidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img
                src="/hotel2.jpg"
                alt="Cozy Hotel Room"
                className="w-full h-auto object-cover max-h-64 md:max-h-52"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img
                src="/hi11.jpg"
                alt="Beautiful Resort Pool"
                className="w-full h-auto object-cover max-h-64 md:max-h-52"
              />
            </div>
          </div>
        </div>

        ---

        {/* Call to Action - No change to this section as per request */}
        <div className="text-center py-8">
          <h2 className="text-3xl iceland-regular font-bold text-[#333] mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Start exploring thousands of incredible hotels today!
          </p>
          <button className="bg-[#0ea5e9] passero-one-regular hover:bg-[#007acc] text-white font-bold py-3 px-8 rounded text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            Find Your Perfect Stay
          </button>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;