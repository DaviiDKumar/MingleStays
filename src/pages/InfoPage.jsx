import { useState, useEffect } from "react";
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';

const cards = [
    { icon: <SecurityIcon fontSize="medium" />, label: "Secure Booking" },
    { icon: <AccessTimeIcon fontSize="medium" />, label: "24/7 Support" },
    { icon: <PhoneIcon fontSize="medium" />, label: "Easy Contact" },
    { icon: <VerifiedUserIcon fontSize="medium" />, label: "Verified Hosts" },
    { icon: <LocalHotelIcon fontSize="medium" />, label: "Cozy Rooms" },
    { icon: <StarRateIcon fontSize="medium" />, label: "Highly Rated" },
    { icon: <FavoriteIcon fontSize="medium" />, label: "Customer Care" },
    { icon: <LocalHotelIcon fontSize="medium" />, label: "Fast Service" },
];

export default function WhyChooseMingleStays() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768); // <768px is mobile
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            style={{
               background: "linear-gradient(135deg, #A4B394 0%, #859970 50%, #70845C 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "3rem 1rem",
                boxSizing: "border-box",
                maxWidth: "90vw",
                margin: "0 auto",
                borderRadius: "12px",
                 marginBottom: "4rem", 
                
            }}
          
        >
            {/* Centered Title */}
            <h1
                style={{
                    fontSize: "2.8rem",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "1rem",
                    fontFamily: "'Passero One', cursive",
                    userSelect: "none",
                }}
            >
                Why Choose Mingle-Stays?
            </h1>

            {/* Subheading */}
            <p
                style={{
                    textAlign: "center",
                    fontSize: "1.2rem",
                    marginBottom: "3rem",
                    lineHeight: 1.5,
                    maxWidth: "600px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                At Mingle-Stays, we <strong>care deeply</strong> about our <strong>customers</strong> and strive to provide the <strong>best experience</strong> possible. From <strong>secure bookings</strong> to <strong>cozy rooms</strong> and <strong>round-the-clock support</strong>, your satisfaction is our priority.
            </p>

            {/* Cards container */}
            <div
                style={
                    isMobile
                        ? {
                            maxWidth: "90vw",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "1rem",
                            paddingBottom: "1rem",
                        }
                        : {
                            minWidth:"55vw",
                            maxWidth: "90vw",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "1rem",
                            overflowX: "auto",
                            paddingBottom: "1rem",
                        }
                }
            >
                {cards.map(({ icon, label }, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: isMobile ? "unset" : "0 0 auto",
                            background: "rgba(255,255,255,0.15)",
                            borderRadius: "12px",
                            padding: "0.6rem 1rem",
                            minWidth: "130px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            cursor: "default",
                            userSelect: "none",
                            whiteSpace: "nowrap",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                        }}
                    >
                        <div style={{ color: "white" }}>{icon}</div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}



    