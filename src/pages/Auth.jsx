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
import { useEffect } from "react";
import { useRef } from "react";
import Loader from "../components/Loader";
import { toastError, toastSuccess } from "../utils/toast";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [rightSlider, setRightSlider] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ws = useRef(null);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isValidOtp, setIsValidOtp] = useState(false);

  const handleResponse = async (credentialResponse) => {
    try {
      const googleIdToken = credentialResponse.credential;
      const decodedToken = jwtDecode(googleIdToken);

      const res = await axiosPrivate.post("/google", {
        credential: googleIdToken,
      });

      const data = res.data;

      // if backend explicitly returns success = false
      if (data?.success === false) {
        toastError(data.message || "Something went wrong");
        return;
      }

      // success case
      dispatch(setUser(data.user));
      navigate("/");
    } catch (err) {
      // handle server or network errors properly
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";
      toastError(errorMsg);
    }
  };

  // GO TO HELL
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...formData };
    copySignupInfo[name] = value;
    setFormData(copySignupInfo);
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError((prev) => ({
        ...prev,
        name: "Full name is required.",
      }));
    }
    if (!formData.email) {
      setError((prev) => ({
        ...prev,
        email: "Email is required.",
      }));
    }
    if (!formData.password) {
      setError((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
    }
    if (error.name || error.email || error.password) return;
    setIsLoading(true);
    const { email } = formData;
    try {
      // Register email in WebSocket so server knows which client to send OTP
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: "REGISTER", email }));
      } else {
        console.warn("WebSocket not ready, retrying signup anyway");
      }

      // Trigger signup API (this will generate + send OTP)
      const { data } = await axiosPrivate.post("/signup", formData);
      const { success, message } = data;

      if (success) {
        toastSuccess(message);
        setRightSlider("otp");
      } else {
        toastError(message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setFormData((prev) => ({ ...prev, email: "" }));
        toastError(error.response.data.message || "Something went wrong.");
        return;
      } else {
        toastError("Something went wrong. Please try again later.");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const wsf = new WebSocket("http://localhost:8000/api/auth");
    ws.current = wsf;

    wsf.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    wsf.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "OTP_SENT") {
      }
    };

    wsf.onclose = () => console.log("❌ WebSocket closed");

    return () => wsf.close();
  }, []);

  const handleVerify = async () => {
    if (disableVerifyBtn) return;
    setOtpLoading(true);
    try {
      const response = await axiosPrivate.post("/signup/verify", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp,
      });

      if (response.data.success) {
        setOtp("");
        setIsValidOtp(true);
        toastSuccess("Signup successful");
      } else {
        setIsValidOtp(false);
        toastError(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length >= 6) setDisableVerifyBtn(false);
    else setDisableVerifyBtn(true);
  }, [otp]);

  useEffect(() => {
    if (isValidOtp) setRightSlider("login");
  }, [isValidOtp]);

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
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                  {error?.name && (
                    <p className="text-red-500 italic text-[10px]">
                      {error.name}
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
                    onChange={handleChange}
                    name="email"
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
                    onChange={handleChange}
                    name="password"
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
                  {isLoading ? (
                    <div className="bg-black py-2 px-5 w-[100px] flex items-center justify-center mt-5">
                      <Loader height={20} width={20} fill="#fff" bg="#000" />
                    </div>
                  ) : (
                    <input
                      type="submit"
                      className="cursor-pointer bg-black text-white m-auto hover:bg-black/80 py-2 px-5 mt-5"
                      value="Send OTP"
                    />
                  )}
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
                    onClick={() => {
                      setRightSlider("");
                      setOtp("");
                    }}
                  >
                    <FaArrowLeft className="group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label>Enter OTP</label>
                  <OtpInput otp={otp} setOtp={setOtp} />
                  {otpLoading ? (
                    <div className="bg-black py-2 px-5 w-[80px] flex items-center justify-center mt-5">
                      <Loader height={20} width={20} fill="#fff" bg="#000" />
                    </div>
                  ) : (
                    <button
                      className={`${
                        disableVerifyBtn
                          ? "bg-black/80"
                          : "cursor-pointer hover:bg-black/80"
                      } text-white bg-black m-auto py-2 px-5 mt-5`}
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
                  )}
                  <p className="italic text-gray-500 text-[10px] text-center mt-3">
                    This OTP will be valid till 60sec
                  </p>
                </div>
              </div>

              {/* ---------- LOGIN FORM ---------- */}
              <div className="min-w-full flex-shrink-0">
                <Login setRightSlider={setRightSlider} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-7 md:mt-2  flex items-center justify-center gap-4 md:w-full w-[70%]">
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
