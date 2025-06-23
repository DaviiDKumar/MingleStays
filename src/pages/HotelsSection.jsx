import { useState, useEffect, useRef, useCallback, useMemo } from "react"; // Import useMemo
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSearchHotelsByCityNameMutation } from "../services/hotelApi";

const LoadingSpinner = ({ className = "" }) => (
    <svg className={`animate-spin h-5 w-5 ${className}`} viewBox="0 0 24 24">
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
    </svg>
);

export default function HotelsSection() {
    const navigate = useNavigate();
    const [displayedHotels, setDisplayedHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchHotelsByCityName] = useSearchHotelsByCityNameMutation();
    const scrollContainerRef = useRef(null);

    // --- FIX: Use useMemo for stable array references ---
    const citiesToFetch = useMemo(() => ["Delhi", "Jaipur", "Goa"], []);
    const hotelImages = useMemo(() => [
        "/hi1.jpg", "/hi2.jpg", "/hi3.jpg", "/hi4.jpg", "/hi5.jpg",
        "/hi6.jpg", "/hi7.jpg", "/hi8.jpg", "/hi9.jpg", "/hi10.jpg",
        "/hi11.jpg", "/hi12.jpg", "/hi13.jpg", "/hi14.jpg"
    ], []);
    // --- END FIX ---

    const CACHE_KEY = "cachedHotelsData"; // CACHE_KEY is a string, so its reference is stable by default

    const shuffleArray = useCallback((array) => {
        let currentIndex = array.length, randomIndex;
        const newArray = [...array];
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [
                newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    }, []); // shuffleArray's dependency array is empty, so it's stable

    useEffect(() => {
        const fetchAndCacheHotels = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { timestamp, data } = JSON.parse(cached);
                    const ttl = 24 * 60 * 60 * 1000;

                    if (Date.now() - timestamp < ttl) {
                        setDisplayedHotels(data);
                        setIsLoading(false);
                        return;
                    } else {
                        localStorage.removeItem(CACHE_KEY);
                    }
                }

                const fetched = [];
                const today = new Date();
                const checkInDate = new Date(today);
                checkInDate.setDate(today.getDate() + 2);
                const checkOutDate = new Date(today);
                checkOutDate.setDate(today.getDate() + 3);

                const format = (d) => d.toISOString().split("T")[0];

                const shuffledImages = shuffleArray(hotelImages); // hotelImages is now memoized
                let imageIndex = 0;

                for (const city of citiesToFetch) { // citiesToFetch is now memoized
                    const payload = {
                        cityName: city,
                        checkInDate: format(checkInDate),
                        checkOutDate: format(checkOutDate),
                        adults: 2,
                    };

                    try {
                        const res = await searchHotelsByCityName(payload).unwrap();
                        const hotels = res?.data?.hotelsWithOffers || [];
                        const hotelsWithAssignedImages = hotels.slice(0, 3).map(h => {
                            const assignedImage = shuffledImages[imageIndex % shuffledImages.length];
                            imageIndex++;
                            return { ...h, sourceCity: city, imageUrl: assignedImage };
                        });
                        fetched.push(...hotelsWithAssignedImages);
                    } catch (err) {
                        console.error(`Error fetching hotels for ${city}:`, err);
                    }
                }

                setDisplayedHotels(fetched);
                localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: fetched }));
            } catch (err) {
                console.error("Overall fetch error:", err);
                setError("Failed to load hotels. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndCacheHotels();
    }, [searchHotelsByCityName, shuffleArray, hotelImages, citiesToFetch, CACHE_KEY]); // Dependencies are now truly stable

    const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

    return (
        <section className="py-10 px-10">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-black font-bold text-2xl md:text-3xl font-[Passero_One]">
                    Our Top Hotels
                </h2>
            </div>

            <div className="w-full overflow-x-hidden relative">
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <LoadingSpinner className="text-sky-600 h-10 w-10" />
                        <p className="ml-3 text-lg text-gray-700">Loading top hotels...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 h-40 flex items-center justify-center">{error}</div>
                ) : displayedHotels.length === 0 ? (
                    <div className="text-center text-gray-500 h-40 flex items-center justify-center">No hotels found.</div>
                ) : (
                    <>
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-5 snap-x snap-mandatory px-1 hide-scrollbar pb-4"
                        >
                            {displayedHotels.map((hotel, idx) => {
                                const offer = hotel.offers?.[0]?.offers?.[0];
                                const price = offer?.price?.total ? `₹${Number(offer.price.total).toLocaleString("en-IN")}` : "Price Not Available";
                                return (
                                    <div
                                        key={hotel.hotelId || idx}
                                        className="flex-shrink-0 snap-start bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-200 relative overflow-hidden"
                                        style={{ width: '65vw', maxWidth: '320px', minHeight: '350px' }}
                                        onClick={() => navigate(`/hotel/${hotel.hotelId}`)}
                                    >
                                        <div className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md">
                                            {hotel.sourceCity}
                                        </div>
                                        <img
                                            src={hotel.imageUrl}
                                            alt={hotel.name}
                                            className="w-full h-52 object-cover rounded-t-xl"
                                            loading="lazy"
                                        />

                                        <div className="p-4 flex flex-col justify-between h-[calc(100%-13rem)]">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{hotel.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2 truncate">{hotel.address?.lines?.[0] || "Address not available"}</p>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    {hotel.address?.cityName}, {hotel.address?.countryCode}
                                                </p>
                                            </div>
                                            <div className="mt-auto">
                                                <p className="text-xl font-extrabold text-sky-700">{price}<span className="text-base font-medium text-gray-500">/night</span></p>
                                                <button
                                                    className="w-full py-2 mt-3 bg-sky-600 hover:bg-sky-700 text-white text-base font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/hotel/${hotel.hotelId}`);
                                                    }}
                                                >
                                                    Explore
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-center gap-4 mt-8">
                            <button onClick={scrollLeft} className="p-3 rounded-full border-2 border-sky-500 text-sky-500 hover:bg-sky-100 transition-all duration-200 shadow-md hover:shadow-lg">
                                <ChevronLeft className="text-2xl" />
                            </button>
                            <button onClick={scrollRight} className="p-3 rounded-full border-2 border-sky-500 text-sky-500 hover:bg-sky-100 transition-all duration-200 shadow-md hover:shadow-lg">
                                <ChevronRight className="text-2xl" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
}