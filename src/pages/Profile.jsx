import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileSection from "../components/profile/ProfileSection";

const Profile = () => {

      const [activeTab, setActiveTab] = useState(0);
      const navigate = useNavigate();
      const location = useLocation();

      const handleNavigate = (tabNo, route) => {
            setActiveTab(tabNo);
            // if (route === 'profile') navigate(`/${route}`);
            // else navigate(`${route}`);
            navigate(`${route}`);
      }

  return (
    <div className="mt-1 flex items-start">
      {/* left */}
      <div className="w-[20%] p-8 min-h-[calc(100vh-50px)] flex flex-col gap-2 shadow-lg shadow-gray-500/50">
            <span className={`p-3 cursor-pointer hover:bg-[#AE9896]/20 rounded-md ${activeTab === 0 && 'bg-[#AE9896]/20 border-l-3 border-[#AE9896]'}`} onClick={() => handleNavigate(0, "/profile")}>Profile</span>
            <span className={`p-3 cursor-pointer hover:bg-[#AE9896]/20 rounded-md ${activeTab === 1 && 'bg-[#AE9896]/20 border-l-3 border-[#AE9896]'}`} onClick={() => handleNavigate(1, "settings")}>Settings</span>
            <span className={`p-3 cursor-pointer hover:bg-[#AE9896]/20 rounded-md ${activeTab === 2 && 'bg-[#AE9896]/20 border-l-3 border-[#AE9896]'}`} onClick={() => handleNavigate(2, "order-history")}>Order History</span>
            <span className={`p-3 cursor-pointer hover:bg-[#AE9896]/20 rounded-md ${activeTab === 3 && 'bg-[#AE9896]/20 border-l-3 border-[#AE9896]'}`} onClick={() => setActiveTab(3)}>Logout</span>
      </div>
      {/* right */}
      <div className="w-[80%] bg-gray-100/50 p-8 min-h-[calc(100vh-50px)]">
            {location.pathname === '/profile' ? (
                  <ProfileSection />
            ) : (
                  <Outlet />
            )}
      </div>
    </div>
  )
}

export default Profile
