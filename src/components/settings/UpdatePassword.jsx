import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import CustomInput from "../CustomInput";

const UpdatePassword = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sentOtp, setSentOtp] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    email: "",
  });

  return (
    <div className="w-full min-h-[320px] flex">
      {/* left */}
      <div className="w-[30%] text-sm flex flex-col items-center justify-evenly">
        <p
          className={`flex items-center gap-2 cursor-pointer hover:underline ${
            activeTab === 0 ? "text-black underline" : "text-blue-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Through Old Password <FaExternalLinkAlt size={10} />
        </p>
        <p
          className={`flex items-center gap-2 cursor-pointer hover:underline ${
            activeTab === 1 ? "text-black underline" : "text-blue-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Through Email <FaExternalLinkAlt size={10} />
        </p>
        {/* <p
          className={`flex items-center gap-2 cursor-pointer hover:underline ${
            activeTab === 2 ? "text-black underline" : "text-blue-500"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Through Phone <FaExternalLinkAlt size={10} />
        </p> */}
      </div>
      {/* right */}
      <div className="w-[70%] bg-[#F1EAE2]">
        {/* pwd through old pwd */}
        {activeTab === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <CustomInput
              type="text"
              label="Old Password"
              id="password"
              setFormData={setFormData}
              formData={formData}
            />
            <CustomInput
              type="text"
              label="New Password"
              id="newPassword"
              setFormData={setFormData}
              formData={formData}
            />
            <button className="bg-black text-white px-4 py-2 rounded-md mt-3 text-sm cursor-pointer hover:bg-black/80">
              Change
            </button>
          </div>
        )}
        {console.log("formdata", formData)}
        {/* through email */}
        {activeTab === 1 && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <CustomInput type="email" label="Email" id="email" formData={formData} />
            <button
              className="bg-black text-white px-4 py-2 rounded-md mt-3 text-sm cursor-pointer hover:bg-black/80"
              onClick={() =>
                formData.email
                  ? setSentOtp(true)
                  : alert("Please enter email/phone")
              }
            >
              Sent OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
