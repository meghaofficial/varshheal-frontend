import { useState } from "react";
import { MdMyLocation } from "react-icons/md";

const AddAddressForm = ({ type, setOpenAddAddress, setInnerEditOpt }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "Home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="mx-auto bg-[#f8fbff] border border-gray-300 rounded p-6">
      <h2 className="text-blue-600 font-semibold text-sm mb-4">
        ADD A NEW ADDRESS
      </h2>

      {/* Use current location */}
      <button
        type="button"
        className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
      >
        <MdMyLocation className="text-lg" />
        Use my current location
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="mobile"
            placeholder="10-digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="locality"
            placeholder="Locality"
            value={formData.locality}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <textarea
          name="address"
          placeholder="Address (Area and Street)"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="border border-gray-300 text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input
            type="text"
            name="city"
            placeholder="City/District/Town"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          >
            <option value="">--Select State--</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="alternatePhone"
            placeholder="Alternate Phone (Optional)"
            value={formData.alternatePhone}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Type */}
        <div className="mt-3">
          <span className="text-gray-700 text-sm font-medium">
            Address Type
          </span>
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="addressType"
                value="home"
                checked={formData.addressType === "home"}
                onChange={handleChange}
              />
              Home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="addressType"
                value="work"
                checked={formData.addressType === "work"}
                onChange={handleChange}
              />
              Work
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-6 text-sm">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-10 py-2 rounded shadow hover:bg-blue-700 cursor-pointer"
          >
            SAVE
          </button>
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => type === "ADD" ? setOpenAddAddress(false) : setInnerEditOpt(null)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
