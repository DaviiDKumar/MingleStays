import React from 'react';

function HotelImageGallery({ staticHotelImages, hotelInfo, isModalOpen, openModal, closeModal }) {
  return (
    <div className="mb-12 max-w-8xl mx-auto">
      {/* Desktop View */}
      {staticHotelImages.length > 0 && (
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative md:col-span-2 lg:col-span-3 h-[400px] lg:h-[550px] overflow-hidden rounded-xl shadow-xl">
            <img
              src={staticHotelImages[0]}
              alt={hotelInfo.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 passero-one-regular left-6 text-white text-5xl font-bold drop-shadow-lg">
              {hotelInfo.name}
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-1 grid grid-cols-2 grid-rows-2 gap-4 h-[400px] lg:h-[550px]">
            {staticHotelImages.slice(1, 4).map((img, i) => (
              <div key={i} className="rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img src={img} alt={`${hotelInfo.name} gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <div
              onClick={openModal}
              className="rounded-lg shadow-md bg-gray-200 flex items-center justify-center cursor-pointer relative group overflow-hidden"
            >
              {staticHotelImages[4] && (
                <img
                  src={staticHotelImages[4]}
                  alt="View all"
                  className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-101 transition-transform duration-300"
                />
              )}
              <div className="flex flex-col items-center justify-center text-white text-center p-2 absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-sm hover:underline font-semibold">See All Photos</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative h-[250px] sm:h-[300px] overflow-hidden rounded-xl shadow-xl mb-6">
          <img src={staticHotelImages[0]} alt={hotelInfo.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
            {hotelInfo.name}
          </div>
        </div>
        <button
          onClick={openModal}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-bold text-lg shadow-md"
        >
          See All Photos ({staticHotelImages.length})
        </button>
      </div>

      {/* Modal Gallery */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-11/12 h-5/6 max-w-5xl flex flex-col overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700"
              aria-label="Close image gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 px-6 pt-0">
              Photos for {hotelInfo.name || 'This Hotel'}
            </h2>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 px-2">
              {staticHotelImages.map((imgSrc, index) => (
                <div key={index} className="w-full h-64 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={imgSrc}
                    alt={`${hotelInfo.name} image ${index + 1}`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelImageGallery;
