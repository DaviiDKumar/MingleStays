import React from 'react';

function SearchSummaryCard({ searchPayload }) {
  return (
    <div className="lg:w-1/2 w-full aspect-square bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-4 text-center tracking-tight sm:text-left">
          Your Search
        </h2>
        <div className="flex flex-col gap-4 text-gray-800">
          {/* Check-in */}
          <div className="flex flex-row items-center p-4 bg-blue-50 rounded-xl shadow-md border border-blue-100">
            <div className="flex-shrink-0 mr-3 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-1">Check-in</p>
              <p className="font-bold text-xl text-gray-900 truncate">
                {searchPayload?.checkInDate || 'Not Set'}
              </p>
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-row items-center p-4 bg-blue-50 rounded-xl shadow-md border border-blue-100">
            <div className="flex-shrink-0 mr-3 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-1">Check-out</p>
              <p className="font-bold text-xl text-gray-900 truncate">
                {searchPayload?.checkOutDate || 'Not Set'}
              </p>
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-row items-center p-4 bg-blue-50 rounded-xl shadow-md border border-blue-100">
            <div className="flex-shrink-0 mr-3 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-1">Guests</p>
              <p className="font-bold text-xl text-gray-900 truncate">
                {searchPayload?.adults || 'N/A'} Adults
                {searchPayload?.children > 0 && (
                  <span className="ml-1 text-blue-600">
                    ({searchPayload.children} Child{searchPayload.children > 1 ? 'ren' : ''})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSummaryCard;
