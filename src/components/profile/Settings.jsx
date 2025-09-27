import { useState } from "react";
import UpdatePassword from "../settings/UpdatePassword";

const Settings = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* header */}
      <span className="text-[25px] font-semibold pt-serif">Settings</span>
      {/* lower content */}
      <div className="mt-4 rounded-md">
        {/* navs */}
        <div className="flex text-sm">
          <p className={`p-3 rounded-t-md cursor-pointer hover:font-semibold min-w-[150px] flex items-center justify-center ${activeTab === 0 && 'font-semibold bg-white'}`} onClick={() => setActiveTab(0)}>Update Password</p>
          <p className={`p-3 rounded-t-md cursor-pointer hover:font-semibold min-w-[150px] flex items-center justify-center ${activeTab === 1 && 'font-semibold bg-white'}`} onClick={() => setActiveTab(1)}>Update Email</p>
          <p className={`p-3 rounded-t-md cursor-pointer hover:font-semibold min-w-[150px] flex items-center justify-center ${activeTab === 2 && 'font-semibold bg-white'}`} onClick={() => setActiveTab(2)}>Address Book</p>
          <p className={`p-3 rounded-t-md cursor-pointer hover:font-semibold min-w-[150px] flex items-center justify-center ${activeTab === 3 && 'font-semibold bg-white'}`} onClick={() => setActiveTab(3)}>Payment Options</p>
        </div>
        {/* content */}
        <div className="bg-white p-4 rounded-b-md">
          {activeTab === 0 && <UpdatePassword />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
