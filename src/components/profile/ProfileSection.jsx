import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import FAQSection from "./FAQSection";
import { useState } from "react";
import axiosPrivate from "../../utils/axiosPrivate";
import { useEffect } from "react";

const ProfileSection = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-4 px-6 md:shadow shadow-gray-300 md:rounded">
      {/* personal information */}
      <PersonalInformation user={user} />

      {/* email address */}
      <EmailAddress user={user} />

      <FAQSection />
    </div>
  );
};

function PersonalInformation({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState({
    fname: "", lname: ""
  });
  const [formData, setFormData] = useState({
    name: "", gender: "female"
  });

  const updateDetails = async () => {
    try {
      const res = await axiosPrivate.patch("/update-auth-details");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user){
      if (user?.name) setFormData(prev => ({ ...prev, name: user.name }));
      if (user?.gender) setFormData(prev => ({ ...prev, gender: user.gender }));
    }
  }, [user]);

  useEffect(() => {
    if (name.fname){
      setFormData(prev => ({ ...prev, name: `${name.fname} ${name.lname}` }))
    }
  }, [name.fname, name.lname])

  return (
    <div>
      <div className="flex items-baseline gap-8">
        <p className="font-[600] text-lg">Personal Information</p>
        {/* <p
          className="text-blue-600 text-[12px] font-semibold cursor-pointer select-none"
          onClick={() => setIsEdit((prev) => !prev)}
        >
          {isEdit ? 'Cancel' : 'Edit'}
        </p> */}
      </div>
      <div className="mt-4 flex md:flex-row flex-col items-center md:gap-4 gap-3">
        {/* first name */}
        {isEdit ? (
          <div className="bg-white border border-gray-300 rounded p-2 py-1 md:min-w-[180px] md:w-auto w-full focus-within:border-blue-500">
            <label
              htmlFor="firstName"
              className="block text-gray-500 text-[10px]"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={name?.fname}
              className="w-full text-black uppercase focus:outline-none text-[12px]"
              onChange={(e) => setName(prev => ({ ...prev, fname: e.target.value }))}
            />
          </div>
        ) : (
          <div className="bg-[#FAFAFA] border border-gray-300 rounded p-2 pt-5 md:min-w-[180px] md:w-auto w-full">
            <p className="text-gray-500 text-sm uppercase">
              {user?.name?.split(" ")[0]}
            </p>
          </div>
        )}
        {/* last name */}
        {isEdit ? (
          <div className="bg-white border border-gray-300 rounded p-2 py-1 md:min-w-[180px] md:w-auto w-full focus-within:border-blue-500">
            <label
              htmlFor="lastName"
              className="block text-gray-500 text-[10px]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={name?.lname}
              className="w-full text-black uppercase focus:outline-none text-[12px]"
              onChange={(e) => setName(prev => ({ ...prev, lname: e.target.value }))}
            />
          </div>
        ) : (
          <div className="bg-[#FAFAFA] border border-gray-300 rounded p-2 pt-5 md:min-w-[180px] md:w-auto w-full">
            <p className="text-gray-500 text-sm uppercase">
              {user?.name?.split(" ")[1]}
            </p>
          </div>
        )}
      </div>
      {/* <p className="text-sm mt-4">Your Gender</p>
      <div className="text-[12px] text-gray-500 flex items-center gap-4 mt-2">
        <div className="flex items-center gap-3">
          {isEdit ? (
            <input type="radio" name="gender" onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))} value="male" checked={formData?.gender === "male"} />
          ) : (
            <div className="h-3 w-3 rounded-full border border-gray-500 p-1 flex items-center justify-center">
              {formData.gender === "male" && (
                <div className="bg-gray-500 h-[10px] min-w-[10px] rounded-full"></div>
              )}
            </div>
          )}
          <p>Male</p>
        </div>
        <div className="flex items-center gap-3">
          {isEdit ? (
            <input type="radio" name="gender"  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))} value="female" checked={formData?.gender === "female"} />
          ) : (
            <div className="h-3 w-3 rounded-full border border-gray-500 p-1 flex items-center justify-center">
              {formData.gender === "female" && (
                <div className="bg-gray-500 h-[10px] min-w-[10px] rounded-full"></div>
              )}
            </div>
          )}
          <p>Female</p>
        </div>
      </div> */}
    </div>
  );
}

function EmailAddress({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="mt-7">
      <div className="flex items-baseline gap-8">
        <p className="font-[600] text-lg">Email Address</p>
        {/* <p
          className="text-blue-600 text-[12px] font-semibold cursor-pointer"
          onClick={() => setIsEdit((prev) => !prev)}
        >
          Edit
        </p> */}
      </div>
      {isEdit ? (
        <div className="bg-white border border-gray-300 rounded p-2 py-1 md:min-w-[180px] md:w-fit w-full focus-within:border-blue-500 mt-4">
          <label
            htmlFor="firstName"
            className="block text-gray-500 text-[10px]"
          >
            Email
          </label>
          <input
            id="firstName"
            type="text"
            value={email}
            className="w-full text-black focus:outline-none text-[12px]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div className="bg-[#FAFAFA] border border-gray-300 rounded p-2 pt-5 md:min-w-[180px] md:w-fit w-full mt-4">
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
