import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axiosPrivate from "../utils/axiosPrivate";
import { toastError } from "../utils/toast";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";

const Login = ({ setRightSlider }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...formData };
    copyLoginInfo[name] = value;
    setFormData(copyLoginInfo);
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (error?.email || error?.password) return;
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post("/signin", formData);
      const data = res?.data;
      if (data?.success) {
        // Store token
        localStorage.setItem("token", data.jwtToken);

        // Normalize user object to match your slice
        const user = {
          id: data._id,
          name: data.name,
          email: data.email,
        };

        dispatch(setUser(user));
        toastSuccess(data.message || "Logged in successfully");
      } else {
        toastError(data.message || "Login failed");
      }
      setFormData({ email: "", password: "" });
    } catch (error) {
      toastError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className={`min-w-full md:mt-10 mt-6 mb-5`} onSubmit={handleSubmit}>
        {/* email */}
        <div className="text-sm flex flex-col mt-3 w-full">
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
          {error?.hasOwnProperty("email") && (
            <p className="text-red-500 italic text-[10px]">{error?.email}</p>
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
            className="absolute right-2 bottom-2 z-99 text-gray-400"
            onClick={() => {
              setShowPwd((prev) => !prev);
              setError(null);
            }}
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
          {error?.hasOwnProperty("password") && (
            <p className="text-red-500 italic text-[10px]">{error?.password}</p>
          )}
        </div>

        {/* sign in */}
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <div className="bg-black py-2 px-5 w-[80px] flex items-center justify-center mt-5">
              <Loader height={20} width={20} fill="#fff" bg="#000" />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <input
              type="submit"
              className="cursor-pointer bg-black text-white m-auto hover:bg-black/80 py-2 px-5 mt-6"
              value="Sign In"
            />
          </div>
        )}

        <p
          className="text-end mt-2 pe-4 text-[10px] hover:underline cursor-pointer text-gray-500 hover:text-black select-none"
          onClick={() => setRightSlider("")}
        >
          Don't have an account?
        </p>
      </form>
    </div>
  );
};

export default Login;
