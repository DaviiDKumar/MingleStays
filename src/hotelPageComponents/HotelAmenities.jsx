import React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function HotelAmenities() {
  const amenities = [
    { icon: <WifiIcon className="text-3xl" />, label: 'Free Wi-Fi' },
    { icon: <PoolIcon className="text-3xl" />, label: 'Swimming Pool' },
    { icon: <RestaurantIcon className="text-3xl" />, label: 'Restaurant & Bar' },
    { icon: <FitnessCenterIcon className="text-3xl" />, label: 'Fitness Center' },
    { icon: <LocalParkingIcon className="text-3xl" />, label: 'Ample Parking' },
    { icon: <SupportAgentIcon className="text-3xl" />, label: '24/7 Front Desk' },
    { icon: <BusinessCenterIcon className="text-3xl" />, label: 'Business Facilities' },
    { icon: <RoomServiceIcon className="text-3xl" />, label: 'Room Service' },
    { icon: <CheckCircleOutlineIcon className="text-3xl" />, label: 'Concierge Service' },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        Hotel Amenities
      </h2>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 text-gray-800">
          {amenities.map((item, index) => (
            <li key={index} className="flex items-center group">
              <div className="mr-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
                {item.icon}
              </div>
              <p className="text-xl font-semibold group-hover:text-gray-900 transition-colors duration-200">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotelAmenities;
