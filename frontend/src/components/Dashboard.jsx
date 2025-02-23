import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const link =import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("You have been logged out.");
    navigate("/signin-password"); 
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("authorization");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard`, {
          headers: {
            authorization: token,
          },
        });

        
        console.log(response.status);
        
        if (response.status === 200) {
          setIsAuthenticated(true); 
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("You are not authorized to access this page.");
        navigate("/signin-password"); 
      }
    };

    fetchDashboardData();
  }, [navigate]);

  
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-[#01B7CF] via-[#1497A8] to-[#235961] p-6">
      <div className="max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Welcome to Your Yoga Dashboard
        </h1>

        <p className="text-gray-600 text-lg text-center">
          Yoga is a practice that connects the body, breath, and mind. It uses
          physical postures, breathing exercises, and meditation to improve
          overall health.
        </p>

        <ul className="mt-4 text-gray-700 list-disc list-inside">
          <li>Enhances flexibility and strength</li>
          <li>Reduces stress and anxiety</li>
          <li>Improves concentration and mental clarity</li>
          <li>Promotes better sleep</li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
