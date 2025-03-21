import { useRef, useState } from "react";
import axios from "axios";
import yoga from "../assets/yoga.jpg"
import { useNavigate } from "react-router-dom";

const SigninOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const otpInputsRef = useRef([]);
  const navigate = useNavigate();

  const requestOTP = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/signin/request-otp`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setMessage("Request timed out. Please try again.");
      } else if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error sending OTP. Please try again.");
      }
      console.error("OTP request error:", error);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 4) {
      setMessage("Please enter complete OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/signin/otp`, 
        { email, otp },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setMessage("Request timed out. Please try again.");
      } else if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error verifying OTP. Please try again.");
      }
      console.error("OTP verification error:", error);
    }
  };

  const handleResendOTP = async () => {
    setOtp("");
    // Clear OTP input fields
    otpInputsRef.current.forEach(input => {
      if (input) input.value = "";
    });
    await requestOTP();
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value[0]; // Only take the first character if multiple are pasted
    let newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center font-[CustomFont] min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56]">
      <div className="rounded-2xl shadow-xl p-8 w-full max-w-4xl flex">
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold text-white">Sign In</h2>
          <p className="text-gray-200 text-2xl mt-1">Enter your registered email</p>
          <p className="text-2xl mt-1 cursor-pointer bg-amber-50 text-black rounded-4xl text-center" 
             onClick={() => navigate("/signin-password")}>
            Login with <span className="text-xl font-semibold text-red-600">Password</span>
          </p>

          <input
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-400"
          />
          <button 
            onClick={requestOTP} 
            disabled={otpSent} 
            className="mt-6 w-full cursor-pointer font-bold text-2xl text-white bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
          >
            Request OTP
          </button>

          {otpSent && (
            <>
              <div className="flex gap-3 mt-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    className="w-12 h-12 text-2xl text-center bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-3 focus:ring-blue-400"
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && index > 0 && !e.target.value) {
                        otpInputsRef.current[index - 1].focus();
                      }
                    }}
                  />
                ))}
              </div>

              <p className="text-gray-200 mt-2">
                Didn't receive OTP? 
                <span 
                  className="text-white cursor-pointer font-semibold ml-2"
                  onClick={handleResendOTP}
                >
                  Resend
                </span>
              </p>

              <button
                onClick={verifyOTP}
                className="mt-6 w-full cursor-pointer font-bold text-2xl text-white bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
              >
                SUBMIT OTP
              </button>
            </>
          )}
          {message && (
            <p className={`text-white font-semibold mt-2 p-2 rounded ${
              message.includes("success") ? "bg-green-500" : "bg-red-500"
            }`}>
              {message}
            </p>
          )}
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
};

export default SigninOTP;