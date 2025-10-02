import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import sideImg from "../assets/loginSign.png";
import axiosPrivate from "../utils/axiosPrivate";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PhoneInputReact from "../components/PhoneInputReact";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleResponse = async (credentialResponse) => {
    try {
      const googleIdToken = credentialResponse.credential;
      const decodedToken = jwtDecode(googleIdToken);

      const res = await axiosPrivate.post("/google", {
        credential: googleIdToken,
      });

      // Axios response
      const data = res.data;
      dispatch(setUser(data.user));

      navigate("/"); // redirect after updating state
    } catch (err) {
      console.error("Auth failed:", err.response?.data || err.message);
    }
  };

  const sendOtp = async () => {
    if (!phone) setError(true);
    await axiosPrivate.post("/send-otp", { phone });
    setStep("otp");
  };

  const verifyOtp = async () => {
    const res = await axiosPrivate.post("/verify-otp", { phone, otp });
    localStorage.setItem("token", res.data.token);
    alert("Logged in successfully!");
  };

  return (
    <div className="flex items-center">
      {/* left */}
      <div className="w-1/2">
        <img src={sideImg} alt="side" className="min-h-[580px]" />
      </div>
      {/* right */}
      <div className="flex flex-col items-center justify-center h-full w-1/2">
        <p className="joliet font-semibold text-[40px]">vaRshheal</p>
        <p className="text-gray-500 my-5">
          Welcome to <span className="playfair">vaRshheal</span>
        </p>
        <div className="text-sm w-full flex flex-col items-center mt-10 mb-5 gap-5">
          {/* phone */}
          <div className="w-[60%]">
            <p className="text-gray-300 mb-2">Phone</p>
            <PhoneInputReact phone={phone} setPhone={setPhone} />
            {error && (
              <p className="text-[10px] text-red-500 mt-1">
                Please enter your phone
              </p>
            )}
          </div>
          <button
            onClick={sendOtp}
            className="cursor-pointer bg-black text-white hover:bg-black/80 py-2 px-5"
          >
            Send OTP
          </button>
        </div>
        <div className="mb-7 mt-2 text-[12px] flex items-center gap-4">
          <div className="w-[150px] h-[1px] bg-gray-300"></div>
          <p className="text-gray-300">OR</p>
          <div className="w-[150px] h-[1px] bg-gray-300"></div>
        </div>
        <GoogleLogin
          onSuccess={handleResponse}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}
