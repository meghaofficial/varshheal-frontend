import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileSection from "../components/profile/ProfileSection";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { LiaHistorySolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import axiosPrivate from "../utils/axiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/features/authSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleNavigate = (tabNo, route) => {
    setActiveTab(tabNo);
    navigate(`${route}`);
  };

  const logout = async () => {
    try {
      await axiosPrivate.post("/logout");
      dispatch(clearUser());
      window.google.accounts.id.disableAutoSelect();
      // const auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(() => console.log("Google user signed out"));
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="md:flex items-start">
      {/* left section for lg screen */}
      <div className="w-[20%] p-2 min-h-[calc(100vh-50px)] md:flex hidden flex-col gap-2 shadow-lg shadow-gray-500/50">
        <span
          className={`p-3 cursor-pointer hover:bg-[#e6ded3]/40 rounded-md ${
            activeTab === 0 && "bg-[#e6ded3]/40 border-l-4 border-[#e6ded3]"
          }`}
          onClick={() => handleNavigate(0, "/profile")}
        >
          Profile
        </span>
        <span
          className={`p-3 cursor-pointer hover:bg-[#e6ded3]/40 rounded-md ${
            activeTab === 1 && "bg-[#e6ded3]/40 border-l-4 border-[#e6ded3]"
          }`}
          onClick={() => handleNavigate(1, "settings")}
        >
          Settings
        </span>
        <span
          className={`p-3 cursor-pointer hover:bg-[#e6ded3]/40 rounded-md ${
            activeTab === 2 && "bg-[#e6ded3]/40 border-l-4 border-[#e6ded3]"
          }`}
          onClick={() => handleNavigate(2, "order-history")}
        >
          Order History
        </span>
        <span
          className={`p-3 cursor-pointer hover:bg-[#e6ded3]/40 rounded-md ${
            activeTab === 3 && "bg-[#e6ded3]/40 border-l-4 border-[#e6ded3]"
          }`}
          onClick={logout}
        >
          Logout
        </span>
      </div>
      {/* top section for sm screen */}
      <div className="md:hidden p-4 flex items-center justify-evenly">
        <div
          className="flex flex-col items-center justify-center"
          onClick={() => handleNavigate(0, "/profile")}
        >
          <CiUser
            size={25}
            strokeWidth="0.5px"
            className={`${activeTab === 0 ? "text-black" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${
              activeTab === 0 ? "text-black" : "text-gray-500"
            }`}
          >
            Profile
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          onClick={() => handleNavigate(1, "settings")}
        >
          <CiSettings
            size={25}
            strokeWidth="0.5px"
            className={`${activeTab === 1 ? "text-black" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${
              activeTab === 1 ? "text-black" : "text-gray-500"
            }`}
          >
            Settings
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          onClick={() => handleNavigate(2, "order-history")}
        >
          <LiaHistorySolid
            size={25}
            strokeWidth="0.5px"
            className={`${activeTab === 2 ? "text-black" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${
              activeTab === 2 ? "text-black" : "text-gray-500"
            }`}
          >
            Order History
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          onClick={() => setActiveTab(3)}
        >
          <IoIosLogOut
            size={25}
            strokeWidth="0.5px"
            className={`${activeTab === 3 ? "text-black" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${
              activeTab === 3 ? "text-black" : "text-gray-500"
            }`}
          >
            Logout
          </p>
        </div>
      </div>
      {/* right */}
      <div className="md:w-[80%] bg-[#e6ded3]/20 p-8 min-h-[calc(100vh-50px)]">
        {location.pathname === "/profile" ? <ProfileSection /> : <Outlet />}
      </div>
    </div>
  );
};

export default Profile;
