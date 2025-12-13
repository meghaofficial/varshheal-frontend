import { useEffect, useState } from "react";
import { User, Calendar, Globe, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { PiUserLight } from "react-icons/pi";
import ManageAddress from "./profile/ManageAddress";
import { AiOutlineDelete } from "react-icons/ai";
import UserOrders from "./profile/UserOrders";
import axiosPrivate from "../utils/axiosPrivate";
import { clearUser } from "../redux/features/authSlice";

const Profile = () => {
  const menuItems = [
    "Personal Information",
    "Manage Address",
    "Order History",
    "Help",
  ];

  const [active, setActive] = useState("Personal Information");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

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
    <>
      {/* for lg screen */}
      <div
        className="px-25 py-8 md:block hidden"
        style={{ fontFamily: "Arial" }}
      >
        {/* account and signout option */}
        <div className="flex items-center justify-between px-5 pb-5 border-b border-[#d1d1d1]">
          <span className="font-semibold">VaRshheal Account</span>
          <button
            className="px-4 py-1 rounded-full cursor-pointer bg-[#de6f5e] text-white"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
        {/* body */}
        <div className="min-h-screen flex justify-between px-5">
          {/* Sidebar */}
          <aside className="w-[20%] py-12">
            <div className="flex flex-col items-start mb-8">
              <div className="w-20 h-20 bg-gray-100/50 rounded-full flex items-center justify-center">
                <PiUserLight size={30} className="text-gray-400" />
              </div>
              <h2 className="mt-4 font-semibold text-lg">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>

            {/* Menu */}
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`block text-left cursor-pointer w-full font-medium 
                ${
                  active === item
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="w-[80%] ps-20">
            <Sidebody user={user} active={active} />
          </div>
        </div>
      </div>
      {/* for sm screen */}
      <div className="md:hidden" style={{ fontFamily: "Arial" }}>
        {/* main */}
        <div className="h-[200px] flex flex-col items-center justify-center">
          <span className="text-[#d1d1d1] text-[12px]">VaRshheal Profile</span>
          <div className="w-20 h-20 bg-gray-100/50 rounded-full flex items-center justify-center mt-4">
            <PiUserLight size={30} className="text-gray-400" />
          </div>
          <h2 className="mt-4 font-semibold text-lg">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
        {/* menus */}
        <div className="grid grid-cols-2 gap-3 px-3 my-3">
          {menuItems.map((item, index) => (
            <div
              className={`${
                active === item
                  ? "bg-[#de6f5e] text-white"
                  : "border border-gray-300"
              } rounded py-3 w-full shadow flex items-center justify-center text-[13px] cursor-pointer`}
              key={index}
              onClick={() => setActive(item)}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* body */}
        <div className="px-4">
          <Sidebody user={user} active={active} />
        </div>
        <div className="flex items-center w-full justify-end px-5 pb-5 border-b border-[#d1d1d1]">
          <button
            className="px-4 py-1 rounded-full cursor-pointer bg-[#de6f5e] text-white"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
};

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-semibold mt-1">{value}</p>
      </div>
      <div className="text-xl">{icon}</div>
    </div>
  );
}

function Sidebody({ user, active }) {
  const [mappingValues, setMappingValues] = useState({});

  useEffect(() => {
    switch (active) {
      case "Personal Information":
        setMappingValues({
          text: "Manage your profile settings, preferences, and account details.",
        });
        break;
      case "Manage Address":
        setMappingValues({
          text: "Manage your addresses to add, edit, or remove delivery and billing locations.",
        });
        break;
      case "Order History":
        setMappingValues({
          text: "Check your order history for details on all past transactions.",
        });
        break;
      case "Help":
        setMappingValues({
          text: "From orders to account issues, our support team is here to help you anytime.",
        });
        break;
      default:
        setMappingValues({
          text: "Manage your profile settings, preferences, and account details.",
        });
        break;
    }
  }, [active]);

  return (
    <>
      <main className="flex-1 md:py-12 py-4">
        <h1 className="text-3xl font-semibold">{active}</h1>
        <p className="text-gray-500 mt-1 mb-4">{mappingValues.text}</p>

        {active === "Personal Information" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Name */}
            <InfoCard
              title="Name"
              value={user?.name}
              icon={<User className="text-orange-500" />}
            />

            {/* Contact */}
            <InfoCard
              title="Contactable at"
              value={user?.email}
              icon={<MessageCircle className="text-orange-500" />}
            />

            {/* Delete Account */}
            <InfoCard
              title="Remove Account"
              value="Delete your vaRshheal Account"
              icon={<AiOutlineDelete className="text-red-600 cursor-pointer" />}
            />
          </div>
        )}
        {active === "Manage Address" && <ManageAddress />}
        {active === "Order History" && <UserOrders />}
        {active === "Help" && (
          <>
            <div className="text-[13px]">
              <p>
                You can contact us on{" "}
                <span className="font-semibold">+91-9358252692</span>
              </p>
              <p className="mt-2">
                You can email us on{" "}
                <span className="font-semibold">varshheal23@gmail.com</span>
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Profile;
