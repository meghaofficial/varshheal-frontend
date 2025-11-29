import { useState } from "react";
import {
  LuLayoutGrid,
  LuUsersRound,
  LuSettings,
  LuTag,
  LuShoppingCart,
  LuShoppingBag,
  LuSearch,
  LuBell,
} from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import Reports from "./Reports";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  return (
    <div className="flex items-start poppins">
      {/* left sidebar */}
      <div className="w-[5%] p-2 shadow shadow-gray-200 flex flex-col gap-2 h-screen overflow-y-auto items-center gap-y-2">
        <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
        <Link
          to="/admin-dashboard"
          className={`flex items-center gap-3 cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded mt-2 ${
            location.pathname === "/admin-dashboard" &&
            activeTab === 0 &&
            "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(0)}
        >
          <LuLayoutGrid size={18} />
        </Link>
        <Link
          to="category"
          className={`flex items-center cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded ${
            (location.pathname.includes("products") || activeTab === 1) &&
            "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <LuShoppingBag size={18} />
        </Link>
        <Link
          to="flash-sales"
          className={`flex items-center gap-3 cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded ${
            activeTab === 2 && "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(2)}
        >
          <LuTag size={18} />
        </Link>
        <Link
          to="customers"
          className={`flex items-center gap-3 cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded ${
            activeTab === 3 && "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(3)}
        >
          <LuUsersRound size={18} />
        </Link>
        <Link
          to="order-list"
          className={`flex items-center gap-3 cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded ${
            activeTab === 4 && "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(4)}
        >
          <LuShoppingCart size={18} />
        </Link>
        <Link
          to="settings"
          className={`flex items-center gap-3 cursor-pointer justify-center h-10 w-10 hover:bg-[#e7dfd3] rounded ${
            activeTab === 5 && "bg-[#e7dfd3] border-l-3 border-l-[#b19882]"
          }`}
          onClick={() => setActiveTab(5)}
        >
          <LuSettings size={18} />
        </Link>
      </div>
      {/* right content */}
      <div className="w-[95%] h-screen overflow-y-auto">
        {/* upper bar */}
        <div className="p-3 px-5 shadow shadow-gray-200 flex items-center justify-between">
          <span className="text-[18px] font-semibold pt-serif">
            {location.pathname === "/admin-dashboard" &&
              activeTab === 0 &&
              "Dashboard"}
            {(location.pathname === "/admin-dashboard/product" ||
              location.pathname === "/admin-dashboard/category" ||
              activeTab === 1) && (
              <>
                <Link
                  to="category"
                  className={`py-3 px-2 ${
                    location.pathname === "/admin-dashboard/category"
                      ? "text-black border-b"
                      : "text-gray-400"
                  }`}
                >
                  Category
                </Link> 
                {" "}
                <Link
                  to="product"
                  className={`py-3 px-2 ${
                    location.pathname === "/admin-dashboard/product"
                      ? "text-black border-b"
                      : "text-gray-400"
                  }`}
                >
                  Products
                </Link>
              </>
            )}
            {activeTab === 2 && "Flash Sales"}
            {activeTab === 3 && "Customers"}
            {activeTab === 4 && "Order List"}
            {activeTab === 5 && "Settings"}
          </span>
          <div className="flex items-center gap-2">
            {/* search bar */}
            {/* <div className="bg-gray-200 rounded-full p-2 px-4 flex items-center justify-center">
              <input type="text" placeholder="Search" className="outline-none text-sm" />
              <LuSearch className="text-gray-500" size={18} />
            </div> */}
            {/* notification */}
            {/* <div className="relative cursor-pointer">
              <div className="h-2 w-2 bg-red-600 absolute top-0 right-1 rounded-full"></div>
              <LuBell size={22} />
            </div> */}
            {/* admin profile */}
            {/* <div className="flex items-center gap-1 cursor-pointer ms-2 rounded">
              <img src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png" alt="admin profile" className="h-8 w-8 rounded-full" />
              <MdKeyboardArrowDown size={22} />
            </div> */}
          </div>
        </div>
        {/* lower content */}
        <div className="overflow-y-auto">
          {activeTab === 0 && location.pathname === "/admin-dashboard" ? (
            <Reports />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
