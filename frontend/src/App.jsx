import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import SigninOTP from "./components/SigninOTP";
import SigninPassword from "./components/SigninPassword";
import Dashboard from "./components/Dashboard";
import MainP from "./components/MainP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/signin-otp" element={<SigninOTP />} />
        <Route path="/signin-password" element={<SigninPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
