import React from 'react';
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function RoomOffersList({ offers, formatCurrency, getCancellationPolicyText, hotelInfo, searchPayload }) {
  const navigate = useNavigate();

  const handleBooking = (offer) => {
    navigate('/book-now', {
      state: {
        hotelInfo,
        offer,
        searchPayload,
      },
    });
  };

  return (
    <div className="lg:w-1/2 w-full aspect-square bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight sm:text-left">
          Available Rooms
        </h2>

        {offers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <BedIcon className="mr-2 text-sky-600 text-2xl" />
                    {offer.roomInformation?.typeEstimated?.category?.replace(/_/g, ' ') || 'Unknown Room'}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {offer.roomInformation?.typeEstimated?.bedType && `${offer.roomInformation.typeEstimated.bedType}`}
                    {offer.roomInformation?.type && ` (${offer.roomInformation.type})`}
                  </p>

                  {offer.roomInformation?.description?.text?.trim() && (
                    <details className="text-gray-700 mb-3 border border-gray-200 rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer select-none font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
                        <span className="flex items-center">
                          <DescriptionIcon fontSize="small" className="mr-2 text-sky-500" />
                          Details
                        </span>
                        <ExpandMoreIcon className="transform transition-transform duration-300 ui-open:rotate-180" />
                      </summary>
                      <p className="p-3 pt-0 text-gray-600 leading-relaxed border-t border-gray-200 text-sm">
                        {offer.roomInformation.description.text.substring(0, 150)}...
                      </p>
                    </details>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {offer.boardType && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
                        {offer.boardType.replace(/_/g, ' ')}
                      </span>
                    )}
                    {offer.policies?.paymentType && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${offer.policies.paymentType === "prepay" ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'} shadow-sm`}>
                        {offer.policies.paymentType === "prepay" ? "Prepay" : "Pay Hotel"}
                      </span>
                    )}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${offer.policies?.refundable?.cancellationRefund === "NON_REFUNDABLE" ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} shadow-sm`}>
                      {getCancellationPolicyText(offer)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-end">
                  {offer.price?.total && offer.price?.currency && (
                    <p className="text-3xl font-extrabold text-sky-700 flex items-baseline">
                      {formatCurrency(offer.price.total, offer.price.currency)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {offer.price?.variations?.average?.base &&
                      `Avg/night: ${formatCurrency(offer.price.variations.average.base, offer.price.currency)}`}
                  </p>

                  {/* ✅ Book Now Button */}
                  <button
                    onClick={() => handleBooking(offer)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-md shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md text-gray-600 p-4 bg-gray-50 rounded-lg shadow-inner">
            <ErrorOutlineIcon className="text-red-500 mr-2" />
            No offers found.
          </p>
        )}
      </div>
    </div>
  );
}

export default RoomOffersList;
