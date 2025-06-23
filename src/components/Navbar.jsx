import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const navItems = [
    { name: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} />, path: "/" },
    { name: "Offers", icon: <LocalOfferIcon sx={{ fontSize: 20 }} />, path: "/offers" },
];

const pageTitles = {
    "/offers": "Latest Offers",
    "/user-dashboard": "Your Dashboard",
    "/sign-in": "Sign In",
    "/sign-up": "Sign Up",
    "/search-results": "Hotels Found", // Renamed for better readability
    // Note: "/hotel/:hotelId" is a pattern, not a direct lookup key.
    // It's here for reference, but the logic below handles it dynamically.
    "/hotel/:hotelId": "Hotel_Offers",
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === "/";

    // --- New function to get the dynamic page title ---
    const getDynamicPageTitle = () => {
        const pathname = location.pathname;

        // 1. Check for exact matches first
        if (pageTitles[pathname]) {
            return pageTitles[pathname];
        }

        // 2. Handle dynamic routes (like /hotel/:hotelId)
        if (pathname.startsWith("/hotel/")) {
            // You can enhance this further if you want to fetch the actual hotel name
            // from the URL param or a state/context, e.g., using useParams()
            // For now, it will show the generic title.
            return pageTitles["/hotel/:hotelId"]; // Use the generic title defined for the pattern
        }

        // 3. Fallback title
        return "Mingle Stays"; // A sensible default if no match
    };

    const currentPageTitle = getDynamicPageTitle();

    useEffect(() => {
        if (!isHomePage) {
            setScrolled(false);
            // Ensure mobile menu closes when navigating away from home page by direct URL or history
            setIsOpen(false); 
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 70) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHomePage]); // Dependency array includes isHomePage

    const getNavLinkClass = ({ isActive }) => { // Removed isScrolled from here as it's directly accessible
        let base = `flex items-center gap-1 cursor-pointer transition-colors duration-300 ease-in-out`;
        base += ` ${scrolled ? "text-black" : "text-white"}`;
        if (isActive) {
            base += ` ${scrolled ? "text-blue-400" : "text-blue-300"}`;
        }
        return base;
    };

    // Base class for auth buttons: no background, simple padding, rounded corners, transitions
    const baseAuthButtonClass = "flex items-center gap-1 font-passero text-base px-3 py-1.5 rounded transition duration-300 ease-in-out border cursor-pointer";

    if (!isHomePage) {
        return (
            <nav className="passero-one-regular  fixed top-0 left-0 right-0 z-[100] h-16 bg-white border-b border-gray-300 shadow-md transition-all duration-300 ease-in-out">
                <div className="max-w-7xl justify-between  px-6 sm:px-8 lg:px-10 h-full ">
                    {/* MODIFIED: Removed justify-between */}
                    <div className="flex  items-center h-full"> 
                        {/* Left: Back Arrow and Dynamic Page Title */}
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer"
                                aria-label="Go back"
                            >
                                <ArrowBackIcon sx={{ fontSize: 24, color: 'black' }} />
                            </button>
                            <h1 className="text-lg md:text-xl font-bold alegreya-sc-regular text-black transition-colors duration-300 ease-in-out">
                                {currentPageTitle}
                            </h1>
                        </div>
                        {/* Right: UserButton / Sign In/Sign Up buttons for simplified navbar */}
                      
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav
            className={`passero-one-regular fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-300 ease-in-out
                ${scrolled ? "bg border-b  shadow-md" : "bg-transparent border-transparent"}`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* --- Left: Logo and Title --- */}
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="cursor-pointer">
                            <img
                                src="/logo.jpg"
                                alt="Mingle Stays Logo"
                                className="h-10 w-auto rounded-full transition-all duration-300 ease-in-out"
                            />
                        </Link>
                        <h1 className={`text-lg md:text-xl font-bold alegreya-sc-regular md:block transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
                            Mingle Stays
                        </h1>
                    </div>

                    {/* --- Middle: Main Nav Links (for larger screens) --- */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex space-x-6 font-passero text-lg pt-2">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => `
                                            group relative pb-0.5
                                            ${getNavLinkClass({ isActive })}
                                        `}
                                        end
                                    >
                                        {item.icon}
                                        {item.name}
                                        <span
                                            className={`
                                                absolute bottom-0 left-0 h-0.5 w-full bg-blue-400
                                                transition-transform duration-300 ease-in-out
                                                ${location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                                            `}
                                        ></span>
                                    </NavLink>
                                </li>
                            ))}
                            {/* Dashboard Link - Only for Signed In users */}
                            <SignedIn>
                                <li>
                                    <NavLink
                                        to="/user-dashboard" 
                                        className={({ isActive }) => `
                                            group relative pb-0.5
                                            ${getNavLinkClass({ isActive })}
                                        `}
                                        end
                                    >
                                        <DashboardIcon sx={{ fontSize: 20 }} />
                                        Dashboard
                                        <span
                                            className={`
                                                absolute bottom-0 left-0 h-0.5 w-full bg-blue-400
                                                transition-transform duration-300 ease-in-out
                                                ${location.pathname === "/user-dashboard" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                                            `}
                                        ></span>
                                    </NavLink>
                                </li>
                            </SignedIn>
                        </ul>
                    </div>

                    {/* --- Right: Auth Buttons / User Profile (for larger screens) --- */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <SignedOut>
                            <div className="flex items-center space-x-3 transition-opacity duration-300 ease-in-out">
                                <Link to="/sign-in">
                                    <button
                                        className={`${baseAuthButtonClass} ${scrolled ? "text-blue-500 border-blue-500 hover:text-blue-400 hover:border-blue-700" : "text-white border-white hover:text-blue-300 hover:border-blue-300"}`}
                                    >
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/sign-up">
                                    <button
                                        className={`${baseAuthButtonClass} ${scrolled ? "text-green-500 border-green-500 hover:text-green-700 hover:border-green-700" : "text-white border-white hover:text-green-300 hover:border-green-300"}`}
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center gap-2 cursor-pointer transition-opacity duration-300 ease-in-out">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: `w-10 h-10 border-2 ${scrolled ? 'border-gray-300' : 'border-white'} rounded-full shadow-md transition-all duration-300 ease-in-out`, // Dynamic border color
                                            userButtonPopoverCard: "shadow-lg"
                                        }
                                    }}
                                />
                                <span className={`text-base font-passero transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
                                    Account
                                </span>
                            </div>
                        </SignedIn>
                    </div>

                    {/* --- Mobile Hamburger Menu Button --- */}
                    <div className="lg:hidden flex items-center z-[110]">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-7 h-7 flex flex-col justify-between items-center group transition-all duration-300 ease-in-out cursor-pointer"
                            aria-label="Toggle mobile menu"
                        >
                            <span
                                className={`block h-0.5 w-full transition duration-300 ease-in-out transform origin-center ${isOpen ? "rotate-45 translate-y-2.5" : ""} ${scrolled ? "bg-black" : "bg-white"}`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"} ${scrolled ? "bg-black" : "bg-white"}`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full transition duration-300 ease-in-out transform origin-center ${isOpen ? "-rotate-45 -translate-y-2.5" : ""} ${scrolled ? "bg-black" : "bg-white"}`}
                            ></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Content --- */}
            <div
                className={`fixed top-0 left-0 h-[100vh] w-64 bg border border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden z-[105] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <nav className="flex flex-col font-passero p-6 space-y-4 text-base overflow-y-auto h-full ">
                    {/* Mobile Logo and Title (at the top of the mobile menu) */}
                    <div className="flex items-center space-x-2 mb-4">
                        
                        <h1 className="text-lg boxShadow p-2 font-bold alegreya-sc-regular text-black transition-colors duration-300 ease-in-out">
                            Mingle Stays
                        </h1>
                    </div>

                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-2 cursor-pointer p-1 boxShadow text-black hover:text-blue-600 transition-colors duration-300 ease-in-out"
                            onClick={() => setIsOpen(false)}
                            end
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}

                    {/* Mobile Dashboard Link */}
                    <SignedIn>
                        <NavLink
                            to="/user-dashboard" 
                            className="flex items-center gap-2 p-1 boxShadow cursor-pointer text-black hover:text-blue-600 transition-colors duration-300 ease-in-out"
                            onClick={() => setIsOpen(false)}
                            end
                        >
                            <DashboardIcon sx={{ fontSize: 20 }} />
                            Dashboard
                        </NavLink>
                    </SignedIn>

                    {/* Mobile Auth Buttons */}
                    <SignedOut>
                        <div className="flex flex-col space-y-4 transition-opacity duration-300 ease-in-out">
                            <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                                <button
                                    className={`${baseAuthButtonClass} text-blue-500 border-blue-500 hover:text-blue-600 hover:border-blue-600 w-full justify-center`}
                                >
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                                <button
                                    className={`${baseAuthButtonClass} text-green-500 border-green-500 hover:text-green-600 hover:border-green-600 w-full justify-center`}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </SignedOut>

                    {/* Mobile UserButton and Account label */}
                    <SignedIn>
                        <div className="flex items-center p-1 boxShadow gap-2 cursor-pointer transition-opacity duration-300 ease-in-out">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 border-2 border-white rounded-full shadow-md transition-all duration-300 ease-in-out",
                                        userButtonPopoverCard: "shadow-lg"
                                    }
                                }}
                            />
                            <span className="text-black text-base transition-colors duration-300 ease-in-out">
                                Account
                            </span>
                        </div>
                    </SignedIn>
                </nav>
            </div>

            {/* --- Mobile Menu Backdrop --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-[100] lg:hidden transition-opacity duration-300 ease-in-out cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}