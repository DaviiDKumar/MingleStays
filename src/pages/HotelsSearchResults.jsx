// src/pages/HotelsSearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Filter from '../components/Filter'; // Assuming Filter component exists and works
import HotelCard from '../components/HotelCard';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Icon for no results
import '../styles/transition.css'; // Your custom animation styles

function HotelsSearchResults() {
    const { state } = useLocation();
    const { payload, hotels } = state || {};

    const [filteredHotels, setFilteredHotels] = useState(hotels || []);
    const [showSearch, setShowSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Ensure hotels is an array before setting state
        setFilteredHotels(Array.isArray(hotels) ? hotels : []);
    }, [hotels]);

    const handleSearchToggle = () => {
        setIsLoading(true);
        setTimeout(() => {
            setShowSearch((prev) => !prev);
            setIsLoading(false);
        }, 400); // Simulate a short delay for animation
    };

    if (!payload || !hotels || hotels.length === 0) {
        return (
            <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-4 py-10 bg-gray-50">
                <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary' }} className="text-gray-400 mb-6" />
                <h1 className="text-3xl iceland-regular font-bold text-gray-700 mb-3">No Hotels Found</h1>
                <p className="text-lg text-gray-500 mb-8 max-w-md">
                    We couldn't find any hotels matching your search criteria.
                    Please try adjusting your dates, number of guests, or destination.
                </p>
                <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="bg-sky-600 hover:bg-sky-700 passero-one-regular text-white px-6 py-3  font-semibold transition-all duration-300 shadow-lg"
                >
                    Search Again
                </button>
            </div>
        );
    }

    const cityName = payload.cityName || (filteredHotels[0]?.offers?.[0]?.hotel?.cityCode ? `${filteredHotels[0].offers[0].hotel.cityCode} area` : 'your selected destination');

    return (
        <div className="mt-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* 🔍 Search & Filter Controls */}
                <div className="flex justify-between items-center mb-5">
                    {/* Search Again Button */}
                    <div className="bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98] rounded">
                        <button
                            type="button"
                            onClick={handleSearchToggle}
                            className="px-5 py-2.5  text-xl passero-one-regular cursor-pointer font-semibold flex items-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <>
                                    <SearchIcon className="mr-1" />
                                    {showSearch ? 'Close Search' : 'Search Again'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* 📱 Mobile Filter Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-blue-200 transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L4.293 6.707A1 1 0 014 6V3z" clipRule="evenodd"></path></svg>
                            {showFilters ? 'Hide Filters' : 'Filters'}
                        </button>
                    </div>
                </div>

                {/* 🔍 SearchBox Toggle Section */}
                {showSearch && (
                    <div className="mb-6 border  border-blue-200 rounded-xl px-0 py-4 bg-white shadow slide-down">
                        <SearchBox isInsideResultsPage={true} />
                    </div>
                )}

                {/* 🧭 Desktop Filters */}
                <div className="hidden md:block mb-6 slide-down">
                    <Filter hotels={hotels} onFilter={setFilteredHotels} />
                </div>

                {/* 📱 Mobile Filters */}
                {showFilters && (
                    <div className="md:hidden mb-6 fade-in">
                        <Filter hotels={hotels} onFilter={setFilteredHotels} />
                    </div>
                )}

                {/* 📌 Search Summary & Results Count */}
                <div className="mb-6 fade-in">
                    <h2 className="text-4xl alegreya-sc-regular font-bold text-gray-800 mb-1">
                        {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} found in {cityName}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {payload?.checkInDate} → {payload?.checkOutDate} ·{' '}
                        {payload?.adults} Adult{payload?.adults > 1 ? 's' : ''}
                        {payload?.children && payload.children > 0 && ` · ${payload.children} Child${payload.children > 1 ? 'ren' : ''}`}
                    </p>
                </div>

                {/* 🏨 Hotel Cards Grid/List */}
                <div className="flex flex-col gap-6 pb-20 fade-in">
                    {filteredHotels.length > 0 ? (
                        // Filter out any potential null/undefined entries before mapping
                        filteredHotels.filter(hotel => hotel).map((hotel) => (
                            <HotelCard key={hotel.hotelId} hotel={hotel} searchPayload={payload} />
                        ))
                    ) : (
                        <div className="text-center text-xl mt-10 text-gray-400">
                            No hotels match your current filters. Try adjusting them.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HotelsSearchResults;