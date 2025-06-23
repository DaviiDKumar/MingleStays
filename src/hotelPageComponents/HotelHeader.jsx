import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function HotelHeader({ hotelInfo }) {
  return (
    <div className="mb-10 pb-8 border-b pt-3 alegreya-sc-regular border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          {hotelInfo.name || 'Luxurious Retreat'}
        </h1>
      </div>

      <p className="text-gray-700 text-lg sm:text-xl flex items-center mb-4">
        <LocationOnIcon className="mr-2 text-sky-500 text-2xl sm:text-3xl" />
        <span className="font-medium">
          {hotelInfo.address?.lines?.join(', ') ? `${hotelInfo.address.lines.join(', ')}, ` : ''}
          {hotelInfo.address?.countryCode || 'India'}
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-base text-gray-600 mt-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-800 mr-2">Hotel ID:</span>
          <span className="font-normal text-gray-700">{hotelInfo.hotelId}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-800 mr-2">Chain Code:</span>
          <span className="font-normal text-gray-700">{hotelInfo.chainCode || 'N/A'}</span>
        </div>
        {hotelInfo.latitude && hotelInfo.longitude && (
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 mr-2">Coordinates:</span>
            <span className="font-normal text-gray-700">
              {hotelInfo.latitude}, {hotelInfo.longitude}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelHeader;
