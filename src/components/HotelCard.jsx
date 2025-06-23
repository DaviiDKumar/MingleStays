// src/components/HotelCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PoolIcon from '@mui/icons-material/Pool';
import CircularProgress from '@mui/material/CircularProgress';

// Import the RTK Query hook
import { useLazyGetHotelDetailsByIdQuery } from '../services/hotelApi';

// --- Hardcoded Images for now ---
const HARDCODED_IMAGES = [
    "/hotel1.jpg",
    "/hotel2.jpg",
    "/hotel3.jpg",
    "/hotel4.jpg",
];

const getHotelImage = (hotelId) => {
    let hash = 0;
    for (let i = 0; i < hotelId.length; i++) {
        hash = hotelId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % HARDCODED_IMAGES.length;
    return HARDCODED_IMAGES[index];
};
// --- End Hardcoded Images ---

function HotelCard({ hotel, searchPayload }) {
    const navigate = useNavigate();

    // CORRECTED: Call the hook unconditionally at the top level.
    const [triggerDetailsFetch, { isLoading: isFetchingDetails, isError: detailsFetchError, error: fetchErrorObject }] = useLazyGetHotelDetailsByIdQuery();

    // Defensive check: If hotel is not provided, don't render anything
    if (!hotel) {
        console.warn("HotelCard received an undefined or null hotel prop.");
        return null; // This is now safe as the hook has already been called
    }

    const firstOfferGroup = hotel.offers?.[0];
    const firstOffer = firstOfferGroup?.offers?.[0];

    let numberOfNights = 0;
    if (searchPayload?.checkInDate && searchPayload?.checkOutDate) {
        const checkIn = new Date(searchPayload.checkInDate);
        const checkOut = new Date(searchPayload.checkOutDate);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const getFeatures = () => {
        const features = [];
        const roomInfo = firstOffer?.roomInformation;
        const roomDescText = roomInfo?.description?.text || '';

        if (roomInfo?.typeEstimated?.bedType) {
            features.push({ name: `${roomInfo.typeEstimated.bedType} Bed`, icon: null });
        }
        if (roomInfo?.typeEstimated?.category) {
            features.push({ name: roomInfo.typeEstimated.category.replace(/_/g, ' '), icon: null });
        }
        if (firstOffer?.boardType && firstOffer.boardType !== 'ROOM_ONLY') {
            features.push({ name: firstOffer.boardType.replace(/_/g, ' '), icon: <FastfoodIcon fontSize="small" /> });
        }

        if (roomDescText.toLowerCase().includes('wifi') || roomDescText.toLowerCase().includes('wi-fi')) {
            features.push({ name: 'Free Wi-Fi', icon: <WifiIcon fontSize="small" /> });
        }
        if (roomDescText.toLowerCase().includes('bubble bath') || roomDescText.toLowerCase().includes('bathtub')) {
            features.push({ name: 'Bubble Bath', icon: <BathtubIcon fontSize="small" /> });
        }
        if (roomDescText.toLowerCase().includes('work area') || roomDescText.toLowerCase().includes('desk')) {
            features.push({ name: 'Work Area', icon: <BusinessCenterIcon fontSize="small" /> });
        }
        if (roomDescText.toLowerCase().includes('fitness') || roomDescText.toLowerCase().includes('gym')) {
            features.push({ name: 'Fitness Center', icon: <FitnessCenterIcon fontSize="small" /> });
        }
        if (roomDescText.toLowerCase().includes('pool')) {
            features.push({ name: 'Swimming Pool', icon: <PoolIcon fontSize="small" /> });
        }

        const sqmMatch = roomDescText.match(/(\d+)\s*sqm/i);
        if (sqmMatch && sqmMatch[1]) {
            features.push({ name: `${sqmMatch[1]} SqM`, icon: null });
        }

        return features;
    };

    const formattedTotalPrice = firstOffer?.price?.total ?
        Number(firstOffer.price.total).toLocaleString('en-IN', {
            style: 'currency',
            currency: firstOffer.price.currency || 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }) : null;

    const pricePerNight = (formattedTotalPrice && numberOfNights > 0) ?
        (parseFloat(firstOffer.price.total) / numberOfNights).toLocaleString('en-IN', {
            style: 'currency',
            currency: firstOffer.price.currency || 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }) : null;

    const isNonRefundable = firstOffer?.policies?.refundable?.cancellationRefund === "NON_REFUNDABLE";

    const handleViewDetailsClick = async () => {
        if (!hotel.hotelId) {
            console.error('Hotel ID is missing for detailed view.');
            return;
        }

        try {
            const result = await triggerDetailsFetch({
                hotelId: hotel.hotelId,
                checkInDate: searchPayload?.checkInDate,
                checkOutDate: searchPayload?.checkOutDate,
                adults: searchPayload?.adults,
                children: searchPayload?.children,
            }).unwrap();

            const detailedHotelData = result; // After transformResponse, 'result' should directly be the detailed hotel object

            if (!detailedHotelData) {
                throw new Error("Detailed hotel data not found in API response.");
            }

            console.log('Fetched detailed data with RTK Query:', detailedHotelData);

            navigate(`/hotel/${hotel.hotelId}`, {
                state: {
                    hotelDetails: detailedHotelData,
                    searchPayload: searchPayload
                }
            });

        } catch (err) {
            console.error('Error fetching hotel details with RTK Query:', err);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
            {/* 🖼 Image Section */}
            <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                    src={getHotelImage(hotel.hotelId)}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* 📝 Details Section */}
            <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                <div>
                    {/* Hotel Name */}
                    <h3 className="text-2xl font-bold text-gray-800">{hotel.name}</h3>
                    {/* Location - using cityCode from offer.hotel and general countryCode */}
                    <p className="text-gray-500 text-sm mt-1">
                        {firstOfferGroup?.hotel?.cityCode || 'Unknown City'}, {hotel.address?.countryCode || 'Unknown Country'}
                    </p>

                    {/* Amenities / Features */}
                    <div className="flex flex-wrap gap-x-3 gap-y-2 mt-4">
                        {firstOffer ? (
                            getFeatures().map((feature, i) => (
                                <span
                                    key={i}
                                    className="text-sm bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full flex items-center gap-1"
                                >
                                    {feature.icon}
                                    {feature.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400">
                                Room details not available
                            </span>
                        )}
                    </div>

                    {/* Cancellation Policy */}
                    {firstOffer?.policies && (
                        <div className="mt-4 text-sm flex items-center">
                            {isNonRefundable ? (
                                <span className="text-red-600 font-semibold flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"></path></svg>
                                    Non-refundable
                                </span>
                            ) : (
                                <span className="text-green-600 font-semibold flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Cancellation available
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Price & CTA Section */}
                <div className="mt-6 flex flex-col md:flex-row items-end md:items-center justify-between">
                    {formattedTotalPrice ? (
                        <div className="text-right md:text-left mb-4 md:mb-0">
                            <p className="text-sm text-gray-500">
                                Total for {numberOfNights} {numberOfNights === 1 ? 'Night' : 'Nights'}
                                {searchPayload?.adults && ` for ${searchPayload.adults} ${searchPayload.adults > 1 ? 'Adults' : 'Adult'}`}
                            </p>
                            <p className="text-4xl font-extrabold text-sky-700">
                                {formattedTotalPrice}
                            </p>
                            {pricePerNight && (
                                <p className="text-sm text-gray-500 mt-1">
                                    ({pricePerNight} / night)
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-lg font-semibold text-gray-500 mt-4 md:mb-0">
                            Price not available
                        </p>
                    )}

                    {/* Button with loading and error feedback */}
                    <button
                        onClick={handleViewDetailsClick}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-200 shadow-md hover:shadow-lg text-lg flex-shrink-0 flex items-center justify-center gap-2"
                        disabled={isFetchingDetails} // Disable button while fetching
                    >
                        {isFetchingDetails && <CircularProgress size={20} color="inherit" />}
                        {isFetchingDetails ? 'Loading...' : 'View Details'}
                    </button>
                    {detailsFetchError && ( // Display error if there was one
                        <p className="text-red-500 text-sm mt-2 md:mt-0 md:ml-4">
                            Error: {fetchErrorObject?.data?.message || 'Failed to fetch details'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HotelCard;