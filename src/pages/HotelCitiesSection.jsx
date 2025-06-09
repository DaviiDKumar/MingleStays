import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) return allCitiesList.slice(0, 20);
    return allCitiesList.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  function handleCityClick(city) {
    setSelectedCity(city);
    if (city === "All Cities") {
      setModalOpen(true);
    } else {
      alert(`You clicked on ${city}`);
    }
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
          {indianCities.map(({ name }, idx) => (
            <button
              key={idx}
              onClick={() => handleCityClick(name)}
              className={`cursor-pointer rounded-md shadow-md transition border-2 flex items-center justify-center
                ${
                  selectedCity === name
                    ? "border-blue-500 text-blue-700"
                    : "border-gray-300 bg-white text-gray-800"
                }
                 hover:text-blue-900 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
              style={{
                height: "40px",
                width: "85px",
                maxWidth: "100%",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {name}
            </button>
          ))}

          {/* All Cities Button */}
          <button
            onClick={() => handleCityClick("All Cities")}
            className={`cursor-pointer rounded-md shadow-md transition flex items-center justify-center border-2
              ${
                selectedCity === "All Cities"
                  ? "border-blue-500 bg-blue-100 text-blue-700"
                  : "border-gray-300 bg-gray-200 text-gray-800"
              }
              hover:bg-blue-200 hover:text-blue-900 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            `}
            style={{
              height: "40px",
              width: "85px",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            All Cities
          </button>
        </div>
      </section>

      {/* Modal for All Cities */}
    <Dialog
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  PaperProps={{
    className: "backdrop-blur-md",
    style: {
      borderRadius: "1rem",
      maxWidth: "700px",
      width: "95%",
      margin: "auto",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "1.5rem",
      position: "relative",
    },
  }}
  BackdropProps={{
    style: {
      backdropFilter: "blur(6px)",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
  }}
>
  {/* ❌ X Button Top-Right */}
  <button
    onClick={() => setModalOpen(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
    aria-label="Close Modal"
  >
    &times;
  </button>

  <DialogContent className="w-full">
    <div className="flex items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 border border-gray-400 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        <SearchIcon />
      </button>
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
      "
    >
      {filteredCities.map((city, idx) => (
        <button
          key={idx}
          onClick={() => {
            setSelectedCity(city);
            setModalOpen(false);
            alert(`You clicked on ${city}`);
          }}
          className="
            border-2 border-gray-300 bg-white text-gray-800
            rounded-md shadow-md hover:shadow-lg transition
            hover:text-blue-900 hover:border-blue-400
            focus:outline-none
            h-10 w-[105px] text-sm font-semibold
          "
        >
          {city}
        </button>
      ))}
    </div>
  </DialogContent>
</Dialog>

    </>
  );
}
