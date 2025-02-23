import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin-password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome to Yoga App
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please log in to access your dashboard.
        </p>
        <button
          onClick={handleLoginClick}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
