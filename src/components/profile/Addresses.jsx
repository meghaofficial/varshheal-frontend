import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import AddAddressForm from "./AddAddressForm";
import axiosPrivate from "../../utils/axiosPrivate";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toast";

const Addresses = () => {
  const [addressList, setAddressList] = useState([]);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [editOpt, setEditOpt] = useState(null);
  const [innerEditOpt, setInnerEditOpt] = useState(null);
  const menuRef = useRef(null);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [activeAdd, setActiveAdd] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setEditOpt(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAllAddress = async () => {
    try {
      const res = await axiosPrivate.get("/all-address", {
        params: { googleId: user?.id },
      });
      if (res?.data?.success) {
        setAddressList(res?.data?.address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirm) {
      try {
        const res = await axiosPrivate.delete(`/delete-address/${id}`);
        if (res?.data?.success) {
          setAddressList((prev) => prev.filter((a) => a._id !== id));
          toastSuccess(res.data.message || "Address deleted successfully");
        }
      } catch (error) {
        console.error(error);
        toastError(error.response?.data?.message || "Failed to delete address");
      }
    }
    else {
      setEditOpt(null);
      return;
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <div className="bg-white p-4 px-6 pb-10 shadow shadow-gray-300 rounded">
      {/* we will keep whatsapp */}
      <p className="font-[600] text-lg">Manage Addresses</p>
      <div
        className="flex items-center rounded border border-gray-300 text-sm cursor-pointer text-blue-600 p-3 mt-4 gap-4"
        onClick={() => setOpenAddAddress(true)}
      >
        <Plus size={15} />
        <p>ADD A NEW ADDRESS</p>
      </div>
      {openAddAddress && (
        <div className="mt-4">
          <AddAddressForm
            setOpenAddAddress={setOpenAddAddress}
            type="ADD"
            setAddressList={setAddressList}
            setEditOpt={setEditOpt}
          />
        </div>
      )}
      {/* addresses */}
      <div className="border border-gray-300 rounded mt-5">
        {addressList?.length > 0 ? (
          <>
            {addressList?.map((address, index) =>
              innerEditOpt?._id === address?._id ? (
                <div key={index}>
                  <AddAddressForm
                    innerEditOpt={innerEditOpt}
                    setInnerEditOpt={setInnerEditOpt}
                    setAddressList={setAddressList}
                    setEditOpt={setEditOpt}
                  />
                </div>
              ) : (
                <div
                  className="p-4 border-b border-gray-300 select-none"
                  key={index}
                >
                  <div className="flex items-center justify-between relative">
                    <p className="rounded bg-gray-200 px-2 py-0.5 text-[11px] text-gray-500 w-fit">
                      {address?.address_type}
                    </p>
                    <div className="relative">
                      <TbDotsVertical
                        className="text-gray-500 cursor-pointer"
                        onClick={() =>
                          editOpt === index
                            ? setEditOpt(null)
                            : setEditOpt(index)
                        }
                      />
                      <div
                        className={`absolute top-6 right-2 bg-white shadow shadow-gray-400 rounded text-sm transform transition-all duration-300 origin-top-right text-gray-500 ${
                          editOpt === index
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                        ref={editOpt === index ? menuRef : null}
                      >
                        <p
                          className="px-3 py-1 pt-2 hover:text-black hover:bg-gray-100 cursor-pointer"
                          onClick={() => setInnerEditOpt(address)}
                        >
                          Edit
                        </p>
                        <p
                          className="px-3 py-1 pb-2 hover:text-red-500 hover:bg-gray-100 cursor-pointer"
                          onClick={() => deleteAddress(address?._id)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm flex items-center gap-4 font-[500] mt-2">
                    <p>{address?.name}</p>
                    <p>{address?.phone}</p>
                  </div>
                  <div className="text-sm mt-3">
                    <span>{address?.address}</span>,{" "}
                    <span>{address?.locality}</span>,{" "}
                    <span>{address?.city}</span>, <span>{address?.state}</span>{" "}
                    - <span className="font-[500]">{address.pincode}</span>
                  </div>
                </div>
              )
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-center min-h-[150px] text-sm">
              <p>Please add the Address</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Addresses;
