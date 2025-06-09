import SearchBox from "../components/SearchBox"; // Adjust path if needed

export default function LandingPage() {
  return (
    <section className="w-full flex flex-col mt-22 relative">
      {/* --- Background Image Section --- */}
      <div
        className="relative w-full h-[80vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Homepage.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* --- MOBILE VIEW: Content and SearchBox inside image --- */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:hidden">
          {/* Top content: Heading + Subheading */}
          <div className="w-full text-center">
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight iceland-regular">
              Discover Your Next Adventure
            </h1>
            <p className="text-white text-base sm:text-lg mt-2 alegreya-sc-regular">
              Explore handpicked destinations, exclusive deals, and unforgettable experiences.
            </p>
          </div>

          {/* Bottom content: SearchBox at 95% width */}
          <div className="w-[95%] mt-8">
            <SearchBox />
          </div>
        </div>

        {/* --- DESKTOP VIEW: Heading inside image, SearchBox outside --- */}
        <div className="hidden md:flex relative z-20 flex-col justify-center items-center text-center h-full px-6 space-y-4">
          <h1 className="text-white text-5xl lg:text-7xl font-extrabold iceland-regular">
            Discover Your Next Adventure
          </h1>
          <p className="text-white text-xl alegreya-sc-regular max-w-2xl">
            Explore handpicked destinations, exclusive deals, and unforgettable experiences.
          </p>
        </div>

        {/* SearchBox positioned outside the image on desktop */}
        <div
          className="
            hidden md:block
            absolute left-1/2 transform -translate-x-1/2
            w-[95%] max-w-5xl z-50 px-4
            bottom-[-3rem]
          "
        >
          <SearchBox />
        </div>
      </div>
    </section>
  );
}
