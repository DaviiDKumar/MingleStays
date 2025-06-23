import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';

function HotelPolicies() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        General Hotel Policies
      </h2>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-start mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800">
          <InfoOutlinedIcon className="text-2xl mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-lg leading-relaxed">
            Please note that these are <strong>general guidelines</strong>. Specific cancellation, payment terms,
            and inclusions are detailed with each individual room offer listed above.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800">
          {/* Check-in Time */}
          <li className="flex items-center group">
            <div className="mr-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
              <AccessTimeIcon className="text-3xl" />
            </div>
            <div>
              <p className="text-xl font-semibold group-hover:text-gray-900 transition-colors duration-200">
                Check-in Time
              </p>
              <p className="text-lg text-gray-700">3:00 PM onwards</p>
            </div>
          </li>

          {/* Check-out Time */}
          <li className="flex items-center group">
            <div className="mr-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
              <AccessTimeIcon className="text-3xl rotate-180" />
            </div>
            <div>
              <p className="text-xl font-semibold group-hover:text-gray-900 transition-colors duration-200">
                Check-out Time
              </p>
              <p className="text-lg text-gray-700">12:00 PM (noon)</p>
            </div>
          </li>

          {/* Pet Policy */}
          <li className="flex items-center group col-span-1 md:col-span-2">
            <div className="mr-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
              <PetsIcon className="text-3xl" />
            </div>
            <div>
              <p className="text-xl font-semibold group-hover:text-gray-900 transition-colors duration-200">
                Pet Policy
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Pets are generally not allowed. Please contact the hotel directly for any exceptions or specific
                details regarding service animals.
              </p>
            </div>
          </li>

          {/* Smoking Policy */}
          <li className="flex items-center group col-span-1 md:col-span-2">
            <div className="mr-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
              <SmokeFreeIcon className="text-3xl" />
            </div>
            <div>
              <p className="text-xl font-semibold group-hover:text-gray-900 transition-colors duration-200">
                Smoking Policy
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This hotel has designated smoking and non-smoking areas. Please adhere to the policy of your booked
                room type.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HotelPolicies;
