// components/HotelOverview.jsx
import React from 'react';

const HotelOverview = ({ description, hotelName }) => {
    if (!description) return null; // Or a message if no description

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About {hotelName}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {description}
                </p>
                {/* Add more detailed descriptions or sections if available */}
            </div>
        </section>
    );
};

export default HotelOverview;