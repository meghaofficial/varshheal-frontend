import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileSection from "../components/profile/ProfileSection";
import { FiBox, FiHeart, FiGift, FiHeadphones } from "react-icons/fi";
import axiosPrivate from "../utils/axiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/features/authSlice";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { ChevronRight } from "lucide-react";
import { FaUser } from "react-icons/fa6";
import { AiOutlinePoweroff } from "react-icons/ai";

const links = [
  { icon: <FiBox size={22} />, label: "Orders", route: "orders" },
  { icon: <FiHeart size={22} />, label: "Wishlist", route: "wishlist" },
  { icon: <FiGift size={22} />, label: "Coupons", route: "coupons" },
  { icon: <FiHeadphones size={22} />, label: "Help Center", route: "help" },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        dispatch(clearUser());
      } else {
        await axiosPrivate.post("/logout");
        dispatch(clearUser());
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="md:flex items-start md:py-5 md:px-10 gap-5 bg-[#F1F3F6]">
      {/* left section for lg screen */}
      <div className="w-[20%] md:flex hidden flex-col gap-3">
        {/* top */}
        <div className="bg-white shadow shadow-gray-300 rounded p-4 flex items-center gap-3">
          <img
            src={user?.avatar}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-[10px] text-gray-500">Hello,</p>
            <p className="text-sm">{user?.name}</p>
          </div>
        </div>
        {/* bottom */}
        <div className="bg-white shadow shadow-gray-300 rounded flex flex-col">
          {/* my orders */}
          <div
            className="flex items-center justify-between w-full group cursor-pointer p-4 border-b border-b-gray-200"
            onClick={() => navigate("orders")}
          >
            <div className="flex items-center gap-3">
              <GiCardboardBoxClosed size={20} className="text-[#7e6d6b]" />
              <p
                className={`text-sm group-hover:text-black group-hover:font-semibold ${
                  location.pathname.includes("orders")
                    ? "text-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                MY ORDERS
              </p>
            </div>
            <ChevronRight />
          </div>
          {/* account settings */}
          <SideSection
            icon={<FaUser size={16} className="text-[#7e6d6b]" />}
            name="ACCOUNT SETTINGS"
            menus={["Profile Information", "Manage Addresses"]}
          />
          {/* logout */}
          <div
            className="flex items-center gap-3 p-4 group cursor-pointer"
            onClick={logout}
          >
            <AiOutlinePoweroff size={20} className="text-[#7e6d6b]" />
            <p className="text-sm text-gray-500 group-hover:text-black group-hover:font-semibold">
              Logout
            </p>
          </div>
        </div>
      </div>
      {/* section for sm screen */}
      <div className="md:hidden p-3 bg-white flex flex-col items-center justify-evenly">
        <div className="bg-[#E6DED3]/20 rounded p-4 w-full text-sm">
          <p className="uppercase font-[500] text-[15px]">{user?.name}</p>
          <p className="mt-1 text-gray-500">{user?.email || user?.phone}</p>
        </div>
        {/* 4 options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mt-3">
          {links.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 gap-2 border border-gray-300 rounded py-3 cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-sm transition-all duration-200"
              onClick={() => navigate(`/rv/${item.route}`)}
            >
              <span className="text-blue-700">{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* right */}
      <div className="md:w-[80%] md:mt-0 mt-3">
        {location.pathname === "/account" ? <ProfileSection /> : <Outlet />}
      </div>
    </div>
  );
};

function SideSection({ icon, name, menus }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (menu) => {
    if (menu === "Profile Information") navigate("/account");
    else if (menu === "Manage Addresses") navigate("addresses");
  };

  return (
    <div className="flex flex-col w-full group cursor-pointer border-b border-b-gray-200">
      <div className="flex items-center gap-3 p-4">
        {icon}
        <p
          className={`text-sm ${
            location.pathname.includes("account")
              ? "text-black font-semibold"
              : "text-gray-500"
          } group-hover:text-black group-hover:font-semibold`}
        >
          {name}
        </p>
      </div>
      <div>
        {menus.map((menu, index) => (
          <p
            className={`text-[12px] py-3 px-5 
            ${
              location.pathname === "/account" &&
              menu === "Profile Information" &&
              "bg-[#E6DED3]/50 font-semibold"
            } 
            ${
              location.pathname === "/account/addresses" &&
              menu === "Manage Addresses" &&
              "bg-[#E6DED3]/50 font-semibold"
            } 
            hover:bg-[#E6DED3]/50 hover:font-semibold`}
            key={index}
            onClick={() => handleNavigate(menu)}
          >
            {menu}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Profile;
