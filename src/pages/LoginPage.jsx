import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted!");
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center px-6 py-12 pt-0 mt-24">
      <div className="max-w-5xl w-full rounded-lg shadow-xl flex flex-col-reverse md:flex-row overflow-hidden">
        {/* Left side: green background */}
        <div className="w-full md:w-1/2 bg-green-600 rounded-tl-lg rounded-bl-lg p-12 flex flex-col justify-center text-white">
          <h2 className="text-4xl font-bold mb-4 passero-one-regular">
            Welcome Back to Mingle-Stays
          </h2>
          <p className="mb-6 text-lg leading-relaxed">
            Access your account and start planning your next adventure today.
            Book top hotels at exclusive prices with ease and confidence.
          </p>

          <img
            src="https://images.unsplash.com/photo-1486308510493-cb47e3dc72f9?auto=format&fit=crop&w=600&q=80"
            alt="Hotel Lobby"
            className="rounded-lg shadow-lg mb-6"
          />

          <p className="italic">
            New here?{" "}
            <NavLink
              to="/signup"
              className="underline hover:text-blue-300 font-semibold"
            >
              Create an account
            </NavLink>
          </p>
        </div>

        {/* Right side: white background with form */}
        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 passero-one-regular text-gray-900">
            Log In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-600 hover:text-green-300 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.969 9.969 0 011.175-4.238m4.387-2.052a9.958 9.958 0 014.463 0m2.01 2.01a9.96 9.96 0 012.06 2.06M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <NavLink
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
            >
              Log In
            </button>
          </form>

          {/* Optional: add any content below the form */}
        </div>
      </div>
    </div>
  );
}
 