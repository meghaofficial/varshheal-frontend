import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import AddAddressForm from "./AddAddressForm";

const Addresses = () => {
  const [addressList, setAddressList] = useState([
    {
      name: "Megha Sharma",
      phone: "89487248990",
      pincode: "202001",
      locality: "Begum Bagh",
      address: "2/277 Begum Bagh",
      city: "Aligarh",
      state: "Uttar Pradesh",
      landmark: "Mukti Marg",
      alternatePhone: "7923847892",
      type: "Home",
    },
    {
      name: "Megha Sharma",
      phone: "89487248990",
      pincode: "202001",
      locality: "Begum Bagh",
      address: "2/277 Begum Bagh",
      city: "Aligarh",
      state: "Uttar Pradesh",
      landmark: "Mukti Marg",
      alternatePhone: "7923847892",
      type: "Home",
    },
    {
      name: "Megha Sharma",
      phone: "89487248990",
      pincode: "202001",
      locality: "Begum Bagh",
      address: "2/277 Begum Bagh",
      city: "Aligarh",
      state: "Uttar Pradesh",
      landmark: "Mukti Marg",
      alternatePhone: "7923847892",
      type: "Home",
    },
  ]);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [editOpt, setEditOpt] = useState(null);
  const [innerEditOpt, setInnerEditOpt] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setEditOpt(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <AddAddressForm setOpenAddAddress={setOpenAddAddress} type="ADD" />
        </div>
      )}
      {/* addresses */}
      <div className="border border-gray-300 rounded mt-5">
        {addressList?.map((address, index) =>
          innerEditOpt === index ? (
            <AddAddressForm setInnerEditOpt={setInnerEditOpt} />
          ) : (
            <div
              className="p-4 border-b border-gray-300 select-none"
              key={index}
            >
              <div className="flex items-center justify-between relative">
                <p className="rounded bg-gray-200 px-2 py-0.5 text-[11px] text-gray-500 w-fit">
                  {address?.type}
                </p>
                <div className="relative">
                  <TbDotsVertical
                    className="text-gray-500 cursor-pointer"
                    onClick={() =>
                      editOpt === index ? setEditOpt(null) : setEditOpt(index)
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
                    <p className="px-3 py-1 pt-2 hover:text-black hover:bg-gray-100 cursor-pointer" onClick={() => setInnerEditOpt(index)}>
                      Edit
                    </p>
                    <p className="px-3 py-1 pb-2 hover:text-red-500 hover:bg-gray-100 cursor-pointer">
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
                <span>{address?.locality}</span>, <span>{address?.city}</span>,{" "}
                <span>{address?.state}</span> -{" "}
                <span className="font-[500]">{address.pincode}</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Addresses;
