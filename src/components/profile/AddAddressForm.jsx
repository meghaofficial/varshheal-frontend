import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import axiosPrivate from "../../utils/axiosPrivate";

const AddAddressForm = ({ type, setOpenAddAddress, setInnerEditOpt }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternate_phone: "",
    address_type: "home",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name) {
      setError((prev) => ({
        ...prev,
        name: "Name is required.",
      }));
    }
    if (!formData.phone) {
      setError((prev) => ({
        ...prev,
        phone: "phone is required.",
      }));
    }
    if (!formData.pincode) {
      setError((prev) => ({
        ...prev,
        pincode: "Pincode is required.",
      }));
    }
    if (!formData.locality) {
      setError((prev) => ({
        ...prev,
        locality: "Locality is required.",
      }));
    }
    if (!formData.address) {
      setError((prev) => ({
        ...prev,
        address: "Address is required.",
      }));
    }
    if (!formData.city) {
      setError((prev) => ({
        ...prev,
        city: "City is required.",
      }));
    }
    if (!formData.state) {
      setError((prev) => ({
        ...prev,
        state: "State is required.",
      }));
    }
    if (!formData.address_type) {
      setError((prev) => ({
        ...prev,
        address_type: "Address type is required.",
      }));
    }
    if (
      error?.name ||
      error?.phone ||
      error?.pincode ||
      error?.locality ||
      error?.address ||
      error?.city ||
      error?.state ||
      error?.address_type
    )
      return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post("/create-address", {
        googleId: user?.id,
        ...formData,
      });
      const data = res?.data;
      if (data?.success) {
        console.log("data", data);
        setFormData({
          name: "",
          phone: "",
          pincode: "",
          locality: "",
          address: "",
          city: "",
          state: "",
          landmark: "",
          alternate_phone: "",
          address_type: "home",
        });
        // Store token
        // localStorage.setItem("token", data.jwtToken);

        // // Normalize user object to match your slice
        // const user = {
        //   id: data._id,
        //   name: data.name,
        //   email: data.email,
        // };

        // dispatch(setUser(user));
        toastSuccess(data.message || "Address added successfully");
      } else {
        toastError(
          data.message || "Couldn't add address, Please try again later"
        );
      }
      // setFormData({ email: "", password: "" });
    } catch (error) {
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use Google Maps API (requires API key)
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = res.data;

          setFormData((prev) => ({
            ...prev,
            pincode: data.address.postcode || "",
            locality: data.address.suburb || data.address.village || "",
            address: data.display_name,
            city: data.address.city || data.address.town || "",
            state: data.address.state || "",
            landmark: data.address.neighbourhood || "",
          }));
        } catch (error) {
          console.error(error);
          console.log("Failed to fetch address details");
        }
      },
      (error) => {
        console.error(error);
        console.log("Unable to retrieve your location");
      }
    );
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user?.name }));
    }
  }, [user]);

  return (
    <div className="mx-auto bg-[#f8fbff] border border-gray-300 rounded p-6">
      <h2 className="text-blue-600 font-semibold text-sm mb-4">
        ADD A NEW ADDRESS
      </h2>

      {/* Use current location */}
      <button
        type="button"
        className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded shadow hover:bg-blue-700 mb-6 cursor-pointer"
        onClick={handleUseMyLocation}
      >
        <MdMyLocation className="text-lg" />
        Use my current location
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("name") && (
              <p className="text-red-500 italic text-[10px]">{error?.name}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("phone") && (
              <p className="text-red-500 italic text-[10px]">{error?.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("pincode") && (
              <p className="text-red-500 italic text-[10px]">
                {error?.pincode}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={formData.locality}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("locality") && (
              <p className="text-red-500 italic text-[10px]">
                {error?.locality}
              </p>
            )}
          </div>
        </div>

        <div>
          <textarea
            name="address"
            placeholder="Address (Area and Street)"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {error?.hasOwnProperty("address") && (
            <p className="text-red-500 italic text-[10px]">{error?.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <input
              type="text"
              name="city"
              placeholder="City/District/Town"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("city") && (
              <p className="text-red-500 italic text-[10px]">{error?.city}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.hasOwnProperty("state") && (
              <p className="text-red-500 italic text-[10px]">{error?.state}</p>
            )}
          </div>
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
            name="alternate_phone"
            placeholder="Alternate Phone (Optional)"
            value={formData.alternate_phone}
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
                name="address_type"
                value="home"
                checked={formData.address_type === "home"}
                onChange={handleChange}
              />
              Home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="address_type"
                value="work"
                checked={formData.address_type === "work"}
                onChange={handleChange}
              />
              Work
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="address_type"
                value="other"
                checked={formData.address_type === "other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {error?.hasOwnProperty("address_type") && (
            <p className="text-red-500 italic text-[10px]">
              {error?.address_type}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-6 text-sm">
          <input
            type="submit"
            value="SAVE"
            className="bg-blue-600 text-white font-semibold px-10 py-2 rounded shadow hover:bg-blue-700 cursor-pointer"
          />
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() =>
              type === "ADD" ? setOpenAddAddress(false) : setInnerEditOpt(null)
            }
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
