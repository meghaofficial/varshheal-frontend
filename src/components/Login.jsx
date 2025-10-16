import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = ({ setRightSlider }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = () => {};

  return (
    <div className="w-full">
      <form
        className={`min-w-full md:mt-10 mt-6 mb-5`}
        onSubmit={handleSubmit}
      >
        {/* email */}
        <div className="text-sm flex flex-col mt-3 w-full">
          <label htmlFor="email" className="text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="outline-none p-3 border-b border-gray-200"
            value={formData?.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              setError((prev) => ({
                ...prev,
                email: "",
              }));
            }}
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

        {/* send otp */}
        <div className="w-full flex items-center justify-center">
          <input
            type="submit"
            className="cursor-pointer bg-black text-white m-auto hover:bg-black/80 py-2 px-5 mt-6"
            value="Sign In"
          />
        </div>

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
