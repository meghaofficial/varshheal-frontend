import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

const UserOrders = () => {
  const [query, setQuery] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const filterRef = useRef();
  const filterBtnRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target)
      ) {
        setOpenFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* search and filter */}
      <div className="flex items-center justify-center w-full gap-4">
        {/* search */}
        <div className="flex items-center gap-4 border border-[#464646] rounded-md relative w-full">
          <input
            type="text"
            placeholder="Search Your Order"
            className="p-2 px-4 text-[13px] w-full outline-none"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {query && (
            <X
              className="text-[#464646] cursor-pointer absolute top-2 right-2"
              onClick={() => setQuery("")}
              size={18}
            />
          )}
        </div>
        {/* filter */}
        <div className="w-[20%]">
          <div className="w-full relative flex items-center justify-center">
            <div
              className="text-gray-500 w-full hover:text-black bg-white cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded px-3 py-2 text-sm shadow shadow-gray-300 select-none"
              onClick={() => setOpenFilters((prev) => !prev)}
              ref={filterBtnRef}
            >
              <p className="text-center">Filters</p>
            </div>
            <div
              className={`absolute z-[999] top-11 right-0 bg-white shadow shadow-gray-400 rounded text-sm transform transition-all duration-300 origin-top-right text-gray-500 min-w-[150px] ${
                openFilters ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              ref={filterRef}
            >
              <p className="px-3 py-1 pt-2 text-black bg-gray-100 cursor-pointer">
                All
              </p>
              <p className="px-3 py-1 pt-2 hover:text-black hover:bg-gray-100 cursor-pointer">
                Delivered
              </p>
              <p className="px-3 py-1 pb-2 hover:text-black hover:bg-gray-100 cursor-pointer">
                Not Delivered
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* all orders */}
      <div className="mt-5 flex flex-col gap-3 max-h-[600px] overflow-y-auto hide-scrollbar">
        {Array.from({ length: 4 }).map((order, index) => (
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start relative" key={index}>
            <div className="flex flex-col w-full">
              {/* upper details */}
              <div>
                <p className="font-semibold">ORDERID-12345</p>
                <p className="text-[14px]">3 Items</p>
              </div>
              {/* products */}
              <div className="flex overflow-x-auto">
              <div className="flex items-center gap-3 pb-2 text-[14px] mt-2">
                {Array.from({ length: 10 }).map((d, index) => (
                  <div
                    className="bg-white w-[200px] p-3 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start"
                    key={index}
                  >
                    <div>
                      {/* <p className="text-gray-500 text-sm">hello</p> */}
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvbgeQYK1c7W5Vim4Ej8pfCRjBq4JgNPNfA&s"
                        alt="item"
                        className="rounded-md h-[100px] w-[100px] object-cover"
                      />
                      <p className="font-semibold mt-2">Bella Vita</p>
                      <p className="">Total Rs. 455</p>
                      <p className="">Delievered on 28-Feb-2025</p>
                    </div>
                    <div className="text-xl">5</div>
                  </div>
                ))}
              </div>
              </div>
            </div>
            {/* status */}
            <div className="absolute top-3 right-3 flex items-center justify-evenly gap-2 rounded-full px-4 py-1 bg-[#f2f2f2]">
              <div
                className={`h-[5px] w-[5px] rounded-full bg-green-600`}
              ></div>
              <span className="text-[10px]">Delievered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
