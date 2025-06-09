import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LoginIcon from "@mui/icons-material/Login";

const navItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Offers", icon: <LocalOfferIcon />, specialColor: "text-red-600", path: "/offers" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const baseLinkClass = () =>
        `flex items-center gap-2 cursor-pointer text-black border-b-0 pb-1
     transition-all duration-200
     hover:text-blue-600 hover:border-b-[3px] hover:border-blue-600`;

    const loginButtonClass =
        "flex items-center gap-2 text-black hover:text-blue-600 font-passero text-lg border-2 border-black hover:border-blue-600 px-4 py-1 rounded transition";

    return (
        <nav className="passero-one-regular fixed top-0 left-0 right-0 z-[100] h-22 bg-white border border-gray-300 shadow-md">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* --- Left: Logo and Title --- */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/logo.jpg"
                            alt="Mingle Stays Logo"
                            className="h-12 md:h-18 w-auto rounded-full"
                        />
                        <h1 className="text-xl md:text-3xl font-bold font-passero text-black md:block">
                            Mingle Stays
                        </h1>
                    </div>

                    {/* --- Middle: Links --- */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex space-x-10 font-passero text-xl pt-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={baseLinkClass(item.specialColor)}
                                        style={item.specialColor ? { color: "red" } : {}}
                                        end
                                    >
                                        {item.icon}
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Right: Login/Signup --- */}
                    <div className="hidden lg:flex items-center">
                        <NavLink to="/login" className={loginButtonClass}>
                            Login
                            <LoginIcon />
                        </NavLink>
                    </div>

                    {/* --- Mobile Hamburger --- */}
                    <div className="lg:hidden flex items-center z-[110]">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-8 h-8 flex flex-col justify-between items-center group"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out transform origin-center ${isOpen ? "rotate-45 translate-y-3" : ""
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full bg-black transition duration-300 ease-in-out transform origin-center ${isOpen ? "-rotate-45 -translate-y-3" : ""
                                    }`}
                            ></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu --- */}
            <div
                className={`fixed top-0 left-0 h-[100vh] w-64 bg-white border border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden z-[105] ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <nav className="flex flex-col font-passero p-6 space-y-6 text-lg overflow-y-auto h-full">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 cursor-pointer text-black hover:text-blue-600"
                            style={item.specialColor ? { color: "red" } : {}}
                            onClick={() => setIsOpen(false)}
                            end
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}

                    <NavLink
                        to="/login/signup"
                        className="flex items-center gap-3 text-black hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        <LoginIcon />
                        Login
                    </NavLink>
                </nav>
            </div>

            {/* --- Backdrop --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-[100] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}
