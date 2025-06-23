// Footer.jsx
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        // Main footer container matching the light background and general padding
        // Added 'bg-white' back as it was removed in the provided snippet
        <footer className="bg-white text-gray-700 iceland-regular py-10 px-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Three-column grid for desktop */}

                {/* Column 1: Brand & About Us */}
                <div className="flex flex-col text-left"> {/* Always aligned left */}
                    <h3 className="text-lg passero-one-regular font-bold text-gray-900 mb-3">
                        MINGLE STAYS
                    </h3>
                    <p className="passero-one-regular font-medium text-gray-700 mb-4 text-sm leading-tight">
                        CHEAP.<br />BEST COMFORTABLE_STAYS
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        Your seamless hotel booking engine. Find perfect stays, compare prices, and book with ease. Fast, reliable, user-friendly.
                    </p>

                    <div className="flex space-x-4 justify-start"> {/* Social icons always aligned left */}
                        <a href="https://www.facebook.com/sevengramscaffe" target="_blank" rel="noopener noreferrer" aria-label="Seven Grams Caffé on Facebook" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                            <FacebookIcon fontSize="medium" />
                        </a>
                        <a href="https://www.instagram.com/sevengramscaffe" target="_blank" rel="noopener noreferrer" aria-label="Seven Grams Caffé on Instagram" className="text-gray-500 hover:text-pink-600 transition-colors duration-300">
                            <InstagramIcon fontSize="medium" />
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="text-left"> {/* Always aligned left */}
                    <h3 className="text-base passero-one-regular font-bold text-gray-900 mb-4 uppercase">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-sm"> {/* Link list with spacing */}
                        <li><a href="/our-story" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Our Story</a></li>
                        <li><a href="/faqs" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">FAQs</a></li>
                    </ul>
                </div>

                {/* Column 3: Stay In Touch (Newsletter) */}
                <div className="text-left"> {/* Always aligned left */}
                    <h3 className="text-base passero-one-regular font-bold text-gray-900 mb-4 uppercase">
                        Stay In Touch
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Subscribe to receive updates, access to exclusive deals, and more.
                    </p>
                    <form action="[Your Newsletter Signup Endpoint]" method="POST" className="flex flex-col gap-3"> {/* Newsletter form */}
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            aria-label="Enter your email for newsletter signup"
                            className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-800 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 w-[60%] md:w-[50%]"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>

            </div>

            {/* Bottom Copyright Bar - Centered */}
            <div className="max-w-7xl mx-auto text-center text-gray-500 text-xs mt-1 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center sm:space-x-4">
                <span className="font-bold whitespace-nowrap">© {currentYear} MINGLE STAYS</span>
                <span className="hidden sm:inline">|</span>
                <a href="/terms-of-service" className="text-gray-500 hover:text-gray-700 transition-colors duration-300 whitespace-nowrap">TERMS OF SERVICE</a>
                <span className="hidden sm:inline">|</span>
                <a href="/privacy-policy" className="text-gray-500 hover:text-gray-700 transition-colors duration-300 whitespace-nowrap">PRIVACY POLICY</a>
            </div>
        </footer>
    );
};

export default Footer;