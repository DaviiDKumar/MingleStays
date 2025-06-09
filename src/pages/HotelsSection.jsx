
import { useNavigate, } from "react-router-dom";


import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const hotels = [
    {
        id: 1,
        name: "The Taj Mahal Palace",
        location: "Colaba, Mumbai",
        price: "₹12,000/night",
        image: "https://images.unsplash.com/photo-1501117716987-c8e70d1c85b6?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "The Oberoi Udaivilas",
        location: "Udaipur, Rajasthan",
        price: "₹15,000/night",
        image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        name: "ITC Grand Chola",
        location: "Chennai, Tamil Nadu",
        price: "₹10,500/night",
        image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        name: "The Leela Palace",
        location: "Bengaluru, Karnataka",
        price: "₹13,500/night",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        name: "JW Marriott Jaipur",
        location: "Jaipur, Rajasthan",
        price: "₹9,000/night",
        image: "https://images.unsplash.com/photo-1501183638714-549c3f58ab91?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 6,
        name: "The Park New Delhi",
        location: "New Delhi",
        price: "₹8,000/night",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 7,
        name: "Taj Lake Palace",
        location: "Udaipur, Rajasthan",
        price: "₹14,000/night",
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 8,
        name: "Radisson Blu Kochi",
        location: "Kochi, Kerala",
        price: "₹7,000/night",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 9,
        name: "ITC Maratha",
        location: "Mumbai, Maharashtra",
        price: "₹11,000/night",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 10,
        name: "The Lalit Great Eastern",
        location: "Kolkata, West Bengal",
        price: "₹8,500/night",
        image: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 11,
        name: "Grand Hyatt Mumbai",
        location: "Mumbai, Maharashtra",
        price: "₹12,500/night",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 12,
        name: "ITC Sonar Kolkata",
        location: "Kolkata, West Bengal",
        price: "₹10,000/night",
        image: "https://images.unsplash.com/photo-1533777324565-a04df0e527b7?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 13,
        name: "The Oberoi Gurgaon",
        location: "Gurgaon, Haryana",
        price: "₹13,000/night",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 14,
        name: "Hilton Goa Resort",
        location: "Goa",
        price: "₹9,500/night",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 15,
        name: "The Westin Pune",
        location: "Pune, Maharashtra",
        price: "₹8,700/night",
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    },
];

export default function HotelsSection() {
    const navigate = useNavigate();

    return (
        <section className="py-10 px-10">
            <h2 className="text-black font-bold text-2xl md:text-3xl font-[Passero_One] mb-5 text-center md:text-left">
                Our Top Hotels
            </h2>

            <div className="w-full overflow-x-hidden">
                <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory px-1 hide-scrollbar hotel-scroll">

                    {hotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="flex-shrink-0 snap-start bg-white rounded-lg shadow cursor-pointer border-2 border-white"
                            style={{
                                width: '60vw',
                                maxWidth: '300px',
                                minHeight: "300px",
                                boxSizing: 'border-box',
                            }}
                            onClick={() => navigate(`/hotels/${hotel.id}`)}
                        >
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-60 object-cover rounded-t-lg"
                            />
                            <div className="p-3 flex flex-col  ">
                                <h3 className="text-base font-bold truncate mt-0">{hotel.name}</h3>
                                <p className="text-xs text-gray-600 truncate mt-2">{hotel.location}</p>
                                <p className="text-sm font-semibold ">{hotel.price}</p>
                                <button
                                    className="w-[100%] py-2 mt-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold  rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/hotels/${hotel.id}`);
                                    }}
                                >
                                    Explore
                                </button>
                            </div>

                        </div>

                    ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => {
                            document.querySelector(".hotel-scroll").scrollBy({ left: -300, behavior: "smooth" });
                        }}
                        className="p-3 rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-100 transition"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => {
                            document.querySelector(".hotel-scroll").scrollBy({ left: 300, behavior: "smooth" });
                        }}
                        className="p-3 rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-100 transition"
                    >
                        <ChevronRight />
                    </button>
                </div>


            </div>

            <style>
                {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
            </style>
        </section>
    );
}
