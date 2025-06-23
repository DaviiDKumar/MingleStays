import SearchBox from "../components/SearchBox"; // Adjust path if needed

export default function LandingPage() {
  const handleSearch = ({ cityCode, checkInDate, checkOutDate, adults }) => {
    console.log("Search triggered with values:");
    console.log("City Code:", cityCode);
    console.log("Check-in:", checkInDate);
    console.log("Check-out:", checkOutDate);
    console.log("Adults:", adults);
  };

  return (
    <section className="w-full flex flex-col relative">
      <div
        className="relative w-full h-[95vh] md:h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Homepage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* MOBILE VIEW */}
        <div className="relative mt-16 z-20 flex flex-col justify-center items-center h-full px-4 lg:hidden">
          <div className="w-full text-center">
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight iceland-regular">
              Discover Your Next Adventure
            </h1>
            <p className="text-white text-base sm:text-lg mt-2 alegreya-sc-regular">
              Explore handpicked destinations, exclusive deals, and unforgettable experiences.
            </p>
          </div>

          <div className="w-[95%] mt-8">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex relative mt-16 z-20 flex-col justify-center items-center text-center h-full px-6 space-y-4">
          <h1 className="text-white text-5xl lg:text-7xl font-extrabold iceland-regular">
            Discover Your Next Adventure
          </h1>
          <p className="text-white text-xl alegreya-sc-regular max-w-2xl">
            Explore handpicked destinations, exclusive deals, and unforgettable experiences.
          </p>
        </div>

        <div
          className="
            hidden lg:block                       
            absolute bottom-[-3rem]
            left-0 right-0 mx-auto
            w-full max-w-5xl
            z-50
          "
        >
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
