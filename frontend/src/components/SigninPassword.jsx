import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import yoga from "../assets/yoga.jpg";

function SigninPassword() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/signin/password`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      console.log("Tokens is",response.data.token);
      if (response.data.token) {
        
        localStorage.setItem('token', response.data.token);
      }
      
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        // The server responded with a status code outside of 2xx
        alert(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        alert("Error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center font-[CustomFont] min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56]">
      <div className="rounded-2xl shadow-xl p-8 w-full max-w-4xl flex">
        <div className="w-1/2 p-6 flex flex-col justify-center">

        <h2 className="text-4xl font-semibold  text-white">Welcome Back</h2>
        <p className="text-gray-200 text-2xl mt-1">Please enter your account details</p>
        <p className=" text-2xl mt-1 cursor-pointer bg-amber-50 text-black rounded-4xl text-center" onClick={()=>{
          navigate("/signin-otp")
        }}>Login with <span className=" text-xl font-semibold text-red-600 ">OTP</span></p>
          <input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            onChange={handleChange}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-3xl   focus:outline-none focus:ring-3 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            className="mt-6 w-full cursor-pointer font-bold text-2xl text-white bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
          >
            LOGIN
          </button>

          <p className="bg-white text-gray-600 h-14 text-xl rounded-4xl flex justify-center pt-3 text-center mt-4">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
              &nbsp;&nbsp;SIGN UP
            </span>
          </p>
        </div>

        <div className="w-1/2 h-130 bg-[rgba(13,84,88,0.5)] rounded-2xl flex flex-col items-center justify-center text-white px-8">
          <h2 className="text-4xl text-center">Discover the Ancient Wisdom of the Vedas with AI</h2>
          <div className="mt-6 w-64 h-64 rounded-lg overflow-hidden">
            <img src={yoga} alt="Yoga Pose" className="w-full h-full object-cover [clip-path:polygon(50%_0%,_85%_20%,_100%_50%,_85%_80%,_50%_100%,_15%_80%,_0%_50%,_15%_20%)]" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default SigninPassword;
