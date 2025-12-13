import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import axiosPrivate from "../../utils/axiosPrivate";
import { useSelector } from "react-redux";
import WrappingComp from "../WrappingComp";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const ManageAddress = () => {
  const { user } = useSelector((state) => state.auth);
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
  const [addressList, setAddressList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);

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
        setAddressList((prev) => [...prev, data?.address]);
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
        toastSuccess(data.message || "Address added successfully");
      } else {
        toastError(
          data.message || "Couldn't add address, Please try again later"
        );
      }
    } catch (error) {
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const {
      name,
      phone,
      pincode,
      locality,
      address,
      city,
      state,
      landmark,
      alternate_phone,
      address_type,
    } = formData;
    try {
      const res = await axiosPrivate.patch(`/update-address/${id}`, {
        googleId: user?.id,
        name,
        phone,
        pincode,
        locality,
        address,
        city,
        state,
        landmark,
        alternate_phone,
        address_type,
      });
      if (res?.data?.success) {
        toastSuccess(res?.data?.message || "Successfully updated address");
        setAddressList((prev) =>
          prev.map((a) => {
            if (a._id === id) {
              return res?.data?.address;
            } else return a;
          })
        );
      }
      setActiveAddress(null);
    } catch (error) {
      console.error(error);
    } finally {
      setActiveAddress(null);
    }
  };

  //   Auto detect area by pincode
  useEffect(() => {
    const handlePincodeChange = async () => {
      if (formData?.pincode?.length === 6) {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${formData?.pincode}`
        );
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
            locality: postOffice.Name,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
            locality: "",
          }));
        }
      }
    };
    handlePincodeChange();
  }, [formData?.pincode]);

  const getAllAddress = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/all-address", {
        params: { googleId: user?.id },
      });
      if (res?.data?.success) {
        setAddressList(res?.data?.address);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirm) {
      setIsLoading(true);
      try {
        const res = await axiosPrivate.delete(`/delete-address/${id}`);
        if (res?.data?.success) {
          setAddressList((prev) => prev.filter((a) => a._id !== id));
          toastSuccess(res.data.message || "Address deleted successfully");
        }
      } catch (error) {
        console.error(error);
        toastError(error.response?.data?.message || "Failed to delete address");
      } finally {
        setIsLoading(false);
      }
    } else {
      setEditOpt(null);
      return;
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  useEffect(() => {
    if (activeAddress) {
      setFormData((prev) => ({
        ...prev,
        name: activeAddress.name || "",
        phone: activeAddress.phone || "",
        pincode: activeAddress.pincode || "",
        locality: activeAddress.locality || "",
        address: activeAddress.address || "",
        city: activeAddress.city || "",
        state: activeAddress.state || "",
        address_type: activeAddress.address_type || "",
        landmark: activeAddress.landmark || "",
        alternate_phone: activeAddress.alternate_phone || "",
      }));
    }
  }, [activeAddress]);

  return (
    <div>
      {/* button for address form and list */}
      <div className="flex items-center justify-end mb-5">
        {openForm ? (
          <button
            onClick={() => setOpenForm(false)}
            className="rounded-md cursor-pointer text-[14px] underline"
          >
            Address Book
          </button>
        ) : (
          <button
            onClick={() => setOpenForm(true)}
            className="rounded-md cursor-pointer text-[14px] underline"
          >
            Add Address
          </button>
        )}
      </div>
      {openForm ? (
        <>
          {/* Form */}
          <form
            onSubmit={(e) =>
              activeAddress
                ? handleUpdate(e, activeAddress?._id)
                : handleSubmit(e)
            }
            // onSubmit={handleSubmit}
            className="space-y-4"
          >
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
                  <p className="text-red-500 italic text-[10px]">
                    {error?.name}
                  </p>
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
                  <p className="text-red-500 italic text-[10px]">
                    {error?.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
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
                <p className="text-red-500 italic text-[10px]">
                  {error?.address}
                </p>
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
                  <p className="text-red-500 italic text-[10px]">
                    {error?.city}
                  </p>
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
                  <p className="text-red-500 italic text-[10px]">
                    {error?.state}
                  </p>
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
              <button
                type="submit"
                className="rounded-md bg-black text-white cursor-pointer px-9 py-2 text-[14px]"
              >
                Save
              </button>
              <button
                type="button"
                className="text- hover:underline cursor-pointer"
                onClick={() => {
                  setOpenForm(false);
                  setActiveAddress(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <WrappingComp
            loading={isLoading}
            list={addressList}
            emptyMsg="Please Add the Address"
            children={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {addressList?.map((address, index) => (
                  <div className="" key={index}>
                    <InfoCard
                      deleteAddress={deleteAddress}
                      setActiveAddress={setActiveAddress}
                      setOpenForm={setOpenForm}
                      addressDetails={address}
                    />
                  </div>
                ))}
              </div>
            }
          />
        </>
      )}
    </div>
  );
};

function InfoCard({
  deleteAddress,
  setActiveAddress,
  setOpenForm,
  addressDetails,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{addressDetails?.name}</p>
        <p className="font-semibold mt-1">{addressDetails?.phone}</p>
        <div className="mt-1">
          <div className="text-sm mt-3">
            <span>{addressDetails?.address}</span>,{" "}
            <span>{addressDetails?.locality}</span>,{" "}
            <span>{addressDetails?.city}</span>,{" "}
            <span>{addressDetails?.state}</span> -{" "}
            <span className="font-[500]">{addressDetails.pincode}</span>
          </div>
        </div>
        <div className="flex items-center justify-start mt-2 gap-2 w-full">
          <AiOutlineDelete
            className="cursor-pointer text-red-600"
            onClick={() => deleteAddress(addressDetails?._id)}
          />
          <FiEdit
            size={15}
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => {
              setActiveAddress(addressDetails);
              setOpenForm(true);
            }}
          />
        </div>
      </div>
      <div className="text-xl">
        <p className="rounded bg-gray-200 px-2 py-0.5 text-[11px] text-gray-500 w-fit">
          {addressDetails?.address_type}
        </p>
      </div>
    </div>
  );
}

export default ManageAddress;
