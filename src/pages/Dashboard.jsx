import { useState } from "react";
import {
  LuLayoutGrid,
  LuUsersRound,
  LuSettings,
  LuTag,
  LuShoppingCart,
  LuShoppingBag,
  LuSearch,
  LuBell
} from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import Reports from "./Reports";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  return (
    <div className="flex items-start">
      {/* left sidebar */}
      <div className="w-[20%] p-6 shadow shadow-gray-200 flex flex-col gap-2 h-screen overflow-y-auto">
        <p className="text-[25px]">VARSHAEL</p>
        <Link
          to="/admin-dashboard"
          className={`flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md mt-4 ${
            activeTab === 0 && location.pathname === '/admin-dashboard' && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(0)}
        >
          <LuLayoutGrid size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="products"
          className={`flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md ${
            activeTab === 1 || location.pathname.includes("products") && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <div className="flex items-center gap-3">
            <LuShoppingBag size={20} />
            <span>Products</span>
          </div>
          <MdKeyboardArrowDown size={20} />
        </Link>
        <Link
          to="flash-sales"
          className={`flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md ${
            activeTab === 2 && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(2)}
        >
          <LuTag size={20} />
          <span>Flash Sales</span>
        </Link>
        <Link
          to="customers"
          className={`flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md ${
            activeTab === 3 && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(3)}
        >
          <LuUsersRound size={20} />
          <span>Customers</span>
        </Link>
        <Link
          to="order-list"
          className={`flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md ${
            activeTab === 4 && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(4)}
        >
          <LuShoppingCart size={20} />
          <span>Order List</span>
        </Link>
        <Link
          to="settings"
          className={`flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-purple-100 rounded-md ${
            activeTab === 5 && "bg-purple-100 border-l-3 border-l-purple-700"
          }`}
          onClick={() => setActiveTab(5)}
        >
          <LuSettings size={20} />
          <span>Settings</span>
        </Link>
      </div>
      {/* right content */}
      <div className="w-[80%] h-screen overflow-y-auto">
        {/* upper bar */}
        <div className="p-4 px-6 shadow shadow-gray-200 flex items-center justify-between">
          <span className="text-[25px] font-[500]">
            {activeTab === 0 && "Dashboard"}
            {activeTab === 1 && "Products"}
            {activeTab === 2 && "Flash Sales"}
            {activeTab === 3 && "Customers"}
            {activeTab === 4 && "Order List"}
            {activeTab === 5 && "Settings"}
          </span>
          <div className="flex items-center gap-2">
            {/* search bar */}
            <div className="bg-gray-200 rounded-full p-2 px-4 flex items-center justify-center">
              <input type="text" placeholder="Search" className="outline-none text-sm" />
              <LuSearch className="text-gray-500" size={20} />
            </div>
            {/* notification */}
            <div className="relative cursor-pointer">
              <div className="h-2 w-2 bg-red-600 absolute top-0 right-1 rounded-full"></div>
              <LuBell size={22} />
            </div>
            {/* admin profile */}
            <div className="flex items-center gap-1 cursor-pointer ms-2 rounded">
              <img src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png" alt="admin profile" className="h-8 w-8 rounded-full" />
              <MdKeyboardArrowDown size={22} />
            </div>
          </div>
        </div>
        {/* lower content */}
        <div className="overflow-y-auto bg-[#F5F5F5]">
          {activeTab === 0 && location.pathname === '/admin-dashboard' ? <Reports /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;