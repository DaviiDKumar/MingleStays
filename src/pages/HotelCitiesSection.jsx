import { useState, useMemo, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSearchHotelsByCityNameMutation } from "../services/hotelApi"; // IMPORT YOUR API HOOK

// --- Reusable Loading Spinner Component ---
const LoadingSpinner = ({ className = "" }) => (
  <svg
    className={`animate-spin h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-label="Loading"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const indianCities = [
  { name: "Delhi" },
  { name: "Mumbai" },
  { name: "Jaipur" },
  { name: "Agra" },
  { name: "Goa" },
  { name: "Chennai" },
  { name: "Kolkata" },
];

const allCitiesList = [
  "Delhi", "Mumbai", "Jaipur", "Agra", "Goa", "Chennai", "Kolkata", "Bengaluru", "Hyderabad", "Pune",
  "Ahmedabad", "Lucknow", "Chandigarh", "Surat", "Indore", "Bhopal", "Nagpur", "Varanasi", "Amritsar", "Shimla",
  "Udaipur", "Nashik", "Coimbatore", "Madurai", "Ranchi", "Raipur", "Guwahati", "Dehradun", "Patna", "Jodhpur",
  "Mysore", "Tirupati", "Aurangabad", "Vijayawada", "Trichy", "Gwalior", "Kanpur", "Bareilly", "Noida", "Ghaziabad",
  "Thane", "Visakhapatnam", "Vadodara", "Rajkot", "Jalandhar", "Ludhiana", "Meerut", "Faridabad", "Panaji", "Manali"
];

export default function HotelCitiesSection() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Global state to disable other buttons
  const [activeCityLoading, setActiveCityLoading] = useState(null); // Tracks which specific city button is active/loading

  // Initialize your RTK Query mutation hook
  const [searchHotelsByCityName] = useSearchHotelsByCityNameMutation();

  const modalSearchInputRef = useRef(null); // Ref for focusing input in modal

  // Focus the search input when modal opens
  useEffect(() => {
    if (modalOpen && modalSearchInputRef.current) {
      modalSearchInputRef.current.focus();
    }
  }, [modalOpen]);

  const filteredCities = useMemo(() => {
    // Show top 20 initially if no search term, otherwise filter allCitiesList
    if (!searchTerm.trim()) return allCitiesList.slice(0, 20);
    return allCitiesList.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  async function performHotelSearch(city) {
    setIsSearching(true); // Start global loading state
    setActiveCityLoading(city); // Indicate which specific city is being processed

    try {
      // Calculate today's date, tomorrow's date, and day after tomorrow's date
      const today = new Date();
      
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Tomorrow's date

      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2); // Day after tomorrow's date

      // Format dates to YYYY-MM-DD
      const formatDate = (date) => date.toISOString().split('T')[0];

      const checkInDate = formatDate(tomorrow);
      const checkOutDate = formatDate(dayAfterTomorrow);

      const payload = {
        cityName: city,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: 2, // Hardcoded adults as per your request
        radius: 10, // Hardcoded radius
        radiusUnit: "KM" // Hardcoded radiusUnit
      };

      // Make the actual API call using your RTK Query mutation
      const res = await searchHotelsByCityName(payload).unwrap();

      // Assuming your API response structure is res.data.hotelsWithOffers
      const hotels = res?.data?.hotelsWithOffers || [];

      navigate("/search-results", {
        state: { payload, hotels }, // Pass payload and hotels data to the search results page
      });

    } catch (err) {
      console.error("City search failed:", err);
      // Display a user-friendly error message
      alert(`Failed to find hotels for ${city}. Please try again later.`);
    } finally {
      setIsSearching(false); // End global loading
      setActiveCityLoading(null); // Reset specific city loading
    }
  }

  function handleCityClick(city) {
    if (isSearching) return; // Prevent multiple searches

    setSelectedCity(city);
    if (city === "All Cities") {
      setModalOpen(true);
      // No activeCityLoading for 'All Cities' button itself as it just opens modal
    } else {
      performHotelSearch(city); // Directly perform search for popular cities
    }
  }

  // Handles clicks on cities within the "All Cities" modal
  function handleModalCityClick(city) {
    if (isSearching) return; // Prevent multiple searches

    setSelectedCity(city);
    setModalOpen(false); // Close modal immediately upon selection
    performHotelSearch(city); // Perform search for selected modal city
  }

  return (
    <>
      <section className="w-full max-w-[720px] mx-auto px-8 py-12 bg-transparent mt-4">
        <div
          className="
            grid
            gap-3
            grid-cols-4
            md:grid-cols-6
            lg:grid-cols-8
            justify-center
            alegreya-sc-regular
          "
        >
          {indianCities.map(({ name }) => ( // Changed key to name for better practice
            <button
              key={name}
              onClick={() => handleCityClick(name)}
              disabled={isSearching} // Disable when any search is active
              aria-label={`Find hotels in ${name}`} // Accessibility improvement
              className={`cursor-pointer rounded-md shadow-md transition border-2 flex items-center justify-center relative
                ${
                  selectedCity === name
                    ? "border-blue-500 text-blue-700" // Your current selected state
                    : "border-gray-300 bg-white text-gray-800" // Your current default state
                }
                hover:text-blue-900 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                ${isSearching ? "opacity-60 cursor-not-allowed" : ""}
              `}
              style={{
                height: "40px",
                width: "85px",
                maxWidth: "100%",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {activeCityLoading === name ? (
                // Use existing text color for spinner in popular city buttons
                <LoadingSpinner className={selectedCity === name ? "text-blue-700" : "text-gray-800"} />
              ) : (
                name
              )}
            </button>
          ))}

          {/* All Cities Button */}
          <button
            onClick={() => handleCityClick("All Cities")}
            disabled={isSearching} // Disable when any search is active
            aria-label="Search all available cities" // Accessibility improvement
            className={`cursor-pointer rounded-md shadow-md transition flex items-center justify-center border-2 relative
              ${
                selectedCity === "All Cities"
                  ? "border-blue-500 bg-blue-100 text-blue-700" // Your current selected state
                  : "border-gray-300 bg-gray-200 text-gray-800" // Your current default state
              }
              hover:bg-blue-200 hover:text-blue-900 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              ${isSearching ? "opacity-60 cursor-not-allowed" : ""}
            `}
            style={{
              height: "40px",
              width: "85px",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {activeCityLoading === "All Cities" ? (
              <LoadingSpinner className={selectedCity === "All Cities" ? "text-blue-700" : "text-gray-800"} />
            ) : (
              "All Cities"
            )}
          </button>
        </div>
      </section>

      {/* Modal for All Cities */}
      <Dialog
        open={modalOpen}
        onClose={() => !isSearching && setModalOpen(false)} // Prevent closing modal during search
        PaperProps={{
          className: "backdrop-blur-md", // Your current backdrop blur
          style: {
            borderRadius: "1rem", // Your current border-radius
            maxWidth: "700px", // Your current max-width
            width: "95%",      // Your current width
            margin: "auto",
            background: "rgba(255, 255, 255, 0.9)", // Your current background with transparency
            padding: "1.5rem",
            position: "relative",
            // Add fade-in animation for a smoother appearance
            animation: "fadeInScale 0.3s ease-out forwards",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(6px)", // Your current backdrop blur
            backgroundColor: "rgba(0,0,0,0.4)", // Your current overlay color
          },
        }}
      >
        {/* ❌ X Button Top-Right */}
        <button
          onClick={() => !isSearching && setModalOpen(false)} // Disable close button during search
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold transition-colors duration-200"
          aria-label="Close Modal"
          disabled={isSearching} // Disable close button during search
        >
          &times;
        </button>

        <DialogContent className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <input
              ref={modalSearchInputRef} // Apply ref to focus
              type="text"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-400 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSearching} // Disable input during search
              aria-label="Search for a city name"
            />
            {/* The search button in the modal is now purely visual, as filtering happens on type */}
            <span className="p-2 bg-blue-500 text-white rounded-md">
              <SearchIcon />
            </span>
          </div>

          <div
            className="
              grid gap-5
              grid-cols-3
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              justify-center
              alegreya-sc-regular
              max-h-80 overflow-y-auto pr-2 custom-scrollbar {/* Added max-height and scrollbar */}
            "
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => ( // Changed key to city for better practice
                <button
                  key={city}
                  onClick={() => handleModalCityClick(city)}
                  disabled={isSearching} // Disable when any search is active
                  aria-label={`Select city ${city}`} // Accessibility improvement
                  className="
                    border-2 border-gray-300 bg-white text-gray-800
                    rounded-md shadow-md hover:shadow-lg transition
                    hover:text-blue-900 hover:border-blue-400
                    focus:outline-none
                    h-10 w-[105px] text-sm font-semibold
                    relative
                    "
                  style={{
                    height: "40px",
                    width: "105px", // Ensure consistent width
                    maxWidth: "100%", // Added for responsiveness
                    // Additional styling from your original code
                  }}
                >
                  {activeCityLoading === city ? (
                    // Use existing text color for spinner in modal buttons
                    <LoadingSpinner className="text-gray-800" />
                  ) : (
                    city
                  )}
                </button>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg py-8">No cities found matching your search.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}