import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import sideImg from "../assets/loginSign.png";
import axiosPrivate from "../utils/axiosPrivate";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import OtpInput from "../components/OtpInput";
import Login from "../components/Login";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [rightSlider, setRightSlider] = useState("");
  const [otp, setOtp] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!formData.fullname) {
    //   setError((prev) => ({
    //     ...prev,
    //     fullname: "Full name is required.",
    //   }));
    // }
    // if (!formData.email) {
    //   setError((prev) => ({
    //     ...prev,
    //     email: "Email is required.",
    //   }));
    // }
    // if (!formData.password) {
    //   setError((prev) => ({
    //     ...prev,
    //     password: "Password is required.",
    //   }));
    // }
    setRightSlider("otp");
  };

  return (
    <div className="flex items-center">
      {/* left */}
      <div className="md:block hidden w-1/2">
        <img src={sideImg} alt="side" className="min-h-[600px]" />
      </div>
      {/* right */}
      <div className="flex flex-col items-center justify-center md:w-1/2 w-full md:h-full min-h-[600px]">
        <p className="joliet font-semibold text-[40px]">vaRshheal</p>
        <p className="text-gray-500 mt-5">
          Welcome to <span className="playfair">vaRshheal</span>
        </p>
        <div className="text-sm w-full flex flex-col items-center">
          <div className="relative w-[90%] md:w-[60%] overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out`}
              style={{
                transform:
                  rightSlider === "otp"
                    ? "translateX(-100%)"
                    : rightSlider === "login"
                    ? "translateX(-200%)"
                    : "translateX(0)",
              }}
            >
              {/* ---------- SIGNUP FORM ---------- */}
              <form
                className="min-w-full md:mt-10 mt-6 mb-5 flex-shrink-0"
                onSubmit={handleSubmit}
              >
                {/* fullname */}
                <div className="text-sm flex flex-col w-full">
                  <label htmlFor="fullname" className="text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="outline-none p-3 border-b border-gray-200"
                    value={formData?.fullname}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        fullname: e.target.value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        fullname: "",
                      }));
                    }}
                  />
                  {error?.fullname && (
                    <p className="text-red-500 italic text-[10px]">
                      {error.fullname}
                    </p>
                  )}
                </div>

                {/* email */}
                <div className="text-sm flex flex-col w-full mt-3">
                  <label htmlFor="email" className="text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="outline-none p-3 border-b border-gray-200"
                    value={formData?.email}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                  />
                  {error?.email && (
                    <p className="text-red-500 italic text-[10px]">
                      {error.email}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="text-sm flex flex-col w-full mt-3 relative select-none">
                  <label htmlFor="password" className="text-gray-300">
                    Password
                  </label>
                  <input
                    type={showPwd ? "text" : "password"}
                    className="outline-none p-3 border-b border-gray-200"
                    value={formData?.password}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }}
                  />
                  {/* eye */}
                  <div
                    className="absolute right-0 bottom-2 z-99 text-gray-400"
                    onClick={() => setShowPwd((prev) => !prev)}
                  >
                    {showPwd ? (
                      <div className="cursor-pointer p-2">
                        <Eye size={16} />
                      </div>
                    ) : (
                      <div className="cursor-pointer p-2">
                        <EyeOff size={16} />
                      </div>
                    )}
                  </div>
                  {error?.password && (
                    <p className="text-red-500 italic text-[10px]">
                      {error.password}
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center justify-center">
                  <input
                    type="submit"
                    className="cursor-pointer bg-black text-white m-auto hover:bg-black/80 py-2 px-5 mt-6"
                    value="Send OTP"
                  />
                </div>

                <p
                  className="text-end mt-2 pe-2 text-[10px] hover:underline cursor-pointer text-gray-500 hover:text-black select-none"
                  onClick={() => setRightSlider("login")}
                >
                  Already have an account?
                </p>
              </form>

              {/* ---------- OTP FORM ---------- */}
              <div className="min-w-full flex-shrink-0 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-start ps-10 mb-10">
                  <div
                    className="p-2 cursor-pointer w-fit border rounded group hover:bg-black"
                    onClick={() => setRightSlider("")}
                  >
                    <FaArrowLeft className="group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Enter OTP</label>
                  <OtpInput otp={otp} setOtp={setOtp} />
                  <button className="cursor-pointer bg-black text-white m-auto hover:bg-black/80 py-2 px-5 mt-6">
                    Verify
                  </button>
                </div>
              </div>

              {/* ---------- LOGIN FORM ---------- */}
              <div className="min-w-full flex-shrink-0">
                <Login setRightSlider={setRightSlider} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-7 md:mt-2 text-[12px] flex items-center justify-center gap-4 md:w-full w-[70%]">
          <div className="w-[150px] h-[1px] bg-gray-200"></div>
          <p className="text-gray-300">OR</p>
          <div className="w-[150px] h-[1px] bg-gray-200"></div>
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
