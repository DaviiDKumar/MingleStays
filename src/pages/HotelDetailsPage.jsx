import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Import your new child components
import HotelHeader from '../hotelPageComponents/HotelHeader';
import HotelImageGallery from '../hotelPageComponents/HotelImageGallery';
import SearchSummaryCard from '../hotelPageComponents/SearchSummaryCard';
import RoomOffersList from '../hotelPageComponents/RoomOffersList';
import HotelAmenities from '../hotelPageComponents/HotelAmenities';
import HotelPolicies from '../hotelPageComponents/HotelPolicies';

const staticHotelImages = [
  "/hdmain.jpg", "/hd1.jpg", "/hd2.jpg", "/hd3.jpg", "/hd4.jpg", "/hd5.jpg", "/hd6.jpg", "/hd7.jpg",
];

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const { state } = useLocation();

  const [hotelDetails, setHotelDetails] = useState(state?.hotelDetails || null);
  const [searchPayload, setSearchPayload] = useState(state?.searchPayload || null);
  const [loading, setLoading] = useState(!state?.hotelDetails);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!hotelDetails && hotelId) {
      const fetchDetails = async () => {
        setLoading(true);
        setError(null);

        const apiBaseUrl = 'http://localhost:9000/api/v1/hotels';
        const detailsApiUrl = `${apiBaseUrl}/${hotelId}`;
        const params = new URLSearchParams();
        let currentSearchPayload = searchPayload;

        if (!currentSearchPayload) {
          const urlParams = new URLSearchParams(window.location.search);
          const defaultAdults = urlParams.get('adults') || '1';
          const today = new Date();
          const defaultCheckIn = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
          const defaultCheckOut = new Date(defaultCheckIn.getFullYear(), defaultCheckIn.getMonth(), defaultCheckIn.getDate() + 4);

          currentSearchPayload = {
            checkInDate: urlParams.get('checkInDate') || defaultCheckIn.toISOString().split('T')[0],
            checkOutDate: urlParams.get('checkOutDate') || defaultCheckOut.toISOString().split('T')[0],
            adults: defaultAdults,
            children: urlParams.get('children') || '0',
          };
          setSearchPayload(currentSearchPayload);
        }

        if (currentSearchPayload?.checkInDate) params.append('checkInDate', currentSearchPayload.checkInDate);
        if (currentSearchPayload?.checkOutDate) params.append('checkOutDate', currentSearchPayload.checkOutDate);
        if (currentSearchPayload?.adults) params.append('adults', currentSearchPayload.adults);
        if (currentSearchPayload?.children) params.append('children', currentSearchPayload.children);

        const fullDetailsApiUrl = params.toString() ? `${detailsApiUrl}?${params.toString()}` : detailsApiUrl;

        try {
          const response = await fetch(fullDetailsApiUrl);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
          }

          if (data.data?.hotelsWithOffers?.length > 0) {
            setHotelDetails(data.data.hotelsWithOffers[0]);
          } else {
            setError("Hotel details not found or no offers for the selected dates/guests.");
          }
        } catch (err) {
          setError(err.message || "Could not load hotel details. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [hotelId, hotelDetails, searchPayload]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <CircularProgress size={60} color="primary" />
        <p className="ml-4 text-xl text-gray-700">Loading hotel details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 text-red-700 p-6">
        <ErrorOutlineIcon sx={{ fontSize: 80 }} className="mb-4" />
        <h1 className="text-3xl font-bold mb-3 text-center">Error Loading Details</h1>
        <p className="text-lg mb-6 text-center max-w-xl">{error}</p>
      </div>
    );
  }

  if (!hotelDetails || !hotelDetails.hotel) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-500">
        <p className="text-xl">No hotel details found for this ID.</p>
      </div>
    );
  }

  const hotelInfo = hotelDetails.hotel;
  const offers = hotelDetails.offers || [];

  const formatCurrency = (amount, currency) => {
    if (typeof amount === 'string') amount = parseFloat(amount);
    if (isNaN(amount)) return 'N/A';
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const getCancellationPolicyText = (offer) => {
    const cancellation = offer.policies?.cancellations?.[0];
    const refundable = offer.policies?.refundable?.cancellationRefund;
    if (!cancellation) return "Policy not specified";

    switch (cancellation.policyType) {
      case "CANCELLATION":
        if (refundable === "NON_REFUNDABLE") return "Non-Refundable";
        if (cancellation.deadline) {
          const deadlineDate = new Date(cancellation.deadline);
          const now = new Date();
          return deadlineDate > now
            ? `Free cancellation until ${deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
            : "Cancellation possible (fees may apply)";
        }
        return "Cancellation possible";
      case "NO_CANCELLATION":
        return "No Cancellation Allowed";
      default:
        return "Policy Details Available";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-6 w-full px-10 font-sans">
      <HotelHeader hotelInfo={hotelInfo} />

      <HotelImageGallery
        staticHotelImages={staticHotelImages}
        hotelInfo={hotelInfo}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-12">
        <SearchSummaryCard searchPayload={searchPayload} />
        <RoomOffersList
          offers={offers}
          hotelInfo={hotelInfo}
          searchPayload={searchPayload}
          formatCurrency={formatCurrency}
          getCancellationPolicyText={getCancellationPolicyText}
        />

      </div>

      <HotelAmenities />
      <HotelPolicies />
    </div>
  );
}

export default HotelDetailsPage;
