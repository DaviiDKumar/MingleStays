import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  useAuth,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import HotelsSearchResults from "./pages/HotelsSearchResults";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import MyBookingsPage from "./pages/MyBookingPage";
import SSOCallbackPage from "./pages/SSOCallbackPage";

// -----------------------------
// Loader for Clerk and routing
const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <div className="text-xl text-gray-700 mb-4">{message}</div>
      <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full animate-progress-bar"
          style={{ animation: "progress-bar 1.5s linear infinite" }}
        ></div>
      </div>
    </div>
  </div>
);

// -----------------------------
// Redirect if already signed in (for sign-in and sign-up)
const RedirectIfSignedIn = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/user-dashboard", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return <LoadingScreen message="Checking auth..." />;
  return children;
};

// -----------------------------
// Protect routes: store path and redirect to sign-in
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/sign-in", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return <LoadingScreen message="Authenticating..." />;
  return isSignedIn ? children : null;
};

// -----------------------------
// Main App
function App() {
  const { isLoaded: isClerkAuthLoaded } = useAuth();
  const { isLoaded: isClerkUserLoaded } = useUser();

  if (!isClerkAuthLoaded || !isClerkUserLoaded) {
    return <LoadingScreen message="Loading application..." />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={
            <RedirectIfSignedIn>
              <SignInPage />
            </RedirectIfSignedIn>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectIfSignedIn>
              <SignUpPage />
            </RedirectIfSignedIn>
          }
        />
        <Route path="/sso-callback" element={<SSOCallbackPage />} />
        <Route path="/search-results" element={<HotelsSearchResults />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />

        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-now"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
