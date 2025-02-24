import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import yoga from "../assets/yoga.jpg"

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userInfo,setUserInfo]=useState();
  const otpInputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signup`, formData);
      alert(response.data.message);
      setUserInfo(response.data.user);
      setOtpSent(true);
    } catch (error) {
      alert("Error signing up");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/verifyOTP`,
        {
          otp,
          userId: userInfo._id,
        });


      alert(response.data.message);
      navigate("/signin-password");
    } catch (error) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="flex items-center justify-center font-[CustomFont] min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56]">
      <div className=" rounded-2xl shadow-xl p-8 w-full max-w-4xl flex">
        {/* Left Setion */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold  text-white">Create Account</h2>
          <p className="text-gray-200 text-2xl mt-1">Please enter your account details</p>

          {!otpSent ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full p-3 mt-4 border bg-white border-gray-300 rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-400"
              />
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
                onClick={handleSignup}
                className="mt-6 w-full cursor-pointer font-bold text-2xl text-white bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
              >
                SIGN UP
              </button>

              {/* Social Sign Up */}
              {/* <div className="flex items-center justify-center space-x-4 mt-4">
                <span className="text-gray-500">Sign Up With</span>
                <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
                <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
                <FaApple className="text-black text-2xl cursor-pointer" />
              </div> */}

              <p className="bg-white text-gray-600 h-14 text-xl rounded-4xl flex  justify-center pt-3 text-center mt-4">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/signin-password")}>
                &nbsp;&nbsp;SIGN IN
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Enter OTP</h2>
              <div className="flex gap-3 mt-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    className="w-12 h-12 text-2xl text-center bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-400"
                    onChange={(e) => {
                      let newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));

                      if (e.target.value !== "" && index < 3) {
                        otpInputsRef.current[index + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {

                      if (e.key === "Backspace" && index > 0 && !otp[index]) {
                        otpInputsRef.current[index - 1].focus();
                      }
                    }}
                  />
                ))}
              </div>
              <button
                onClick={verifyOtp}
                className="mt-6 w-full bg-gradient-to-r cursor-pointer from-gray-900 to-gray-700 text-white py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>

        {/* Right Section */}
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

export default Signup;
