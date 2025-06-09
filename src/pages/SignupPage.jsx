import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-6 py-12 mt-24 pt-0" >
      <div className="max-w-5xl w-full rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left side: white background */}
        <div className="w-full md:w-1/2 bg-white p-12">
          <h2 className="text-3xl font-semibold mb-6 passero-one-regular text-gray-800">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Right side: full blue background */}
        <div className="w-full md:w-1/2 bg-indigo-600 rounded-tr-lg rounded-br-lg p-12 flex flex-col justify-center text-white">
          <h2 className="text-4xl font-bold mb-4 passero-one-regular">
            Welcome to Mingle-Stays
          </h2>
          <p className="mb-6 text-lg leading-relaxed">
            Join our community and unlock access to the best hotel booking
            experience. Discover amazing offers, explore cities, and book your
            perfect stay hassle-free.
          </p>

          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Travel"
            className="rounded-lg shadow-lg mb-6"
          />

          <p>
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="underline hover:text-indigo-300 font-semibold"
            >
              Login here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
