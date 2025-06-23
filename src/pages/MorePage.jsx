// MorePage.jsx
import React from 'react';

const MorePage = () => {
    return (
        // Main container div: Full width, dark background, text color, font
        // Reduced vertical padding: py-10 lg:py-16
        <div className="bg text-black font-sans py-10 lg:py-16">
            {/* Inner container to control max width and apply horizontal padding */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flex container for the two columns */}
                {/* Reduced gap: gap-8 lg:gap-12 */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-30">

                    {/* Left Div: Large Heading Texts */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        {/* Small "Available for work" or relevant tag if needed for Mingle Stays */}
                        {/* For Mingle Stays, maybe "Your Dream Stay Awaits" or similar */}
                        {/* Slightly smaller mb-4 */}
                        <div className="inline-flex items-center px-4 py-3 passero-one-regular bg-white rounded-full text-xs text-black mb-4">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> {/* Green dot indicator */}
                            Explore New Destinations
                        </div>


                        {/* Reduced heading size: text-3xl md:text-4xl lg:text-5xl */}
                        <h1 className="text-3xl aclonica-regular md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Discover Extraordinary Journeys <br />with Mingle Stays
                        </h1>

                        {/* Reduced paragraph text size: text-base md:text-lg */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Unlock a world of premium accommodations and unforgettable experiences. From serene getaways to vibrant city explorations, your perfect stay is just a click away.
                        </p>
                        {/* You can add a subtle button here if desired, following the shared aesthetic */}
                        {/*
                        <button className="inline-flex items-center mt-6 px-5 py-2 bg-gray-800 text-white rounded-full text-base font-medium transition-colors duration-200 hover:bg-gray-700">
                            Find Your Stay
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        */}
                    </div>

                    {/* Right Div: Image */}
                    <div className="lg:w-1/2">
                        {/* Placeholder image for a luxurious hotel or travel scene */}
                        <img
                            src="/morepage.jpg" // Replace with your actual hotel image
                            alt="Luxurious hotel interior or stunning travel destination"
                            className="w-full h-auto rounded-lg shadow-xl"
                            loading="eager" // Use eager for hero images to load quickly
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MorePage;