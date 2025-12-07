import { X } from "lucide-react";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const SearchPanel = ({ setOpenSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 w-full">
        <FaArrowLeftLong onClick={() => setOpenSearch(false)} size={18} className="cursor-pointer" />
        <div className="flex items-center gap-4 border border-[#464646] rounded-md relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="p-4 poppins text-[12px] w-full outline-none"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {query && (
            <X
              className="text-[#464646] cursor-pointer absolute top-4 right-2"
              onClick={() => setQuery("")}
              size={18}
            />
          )}
        </div> 
      </div>
      {/* search results */}
      <div className="mt-4">
        <div className="flex items-center gap-4 p-3 cursor-pointer bg-[#f5f5f5]/50 hover:bg-[#f5f5f5]">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/81E1+kRA7VL.jpg"
            alt="bag"
            className="h-10 w-15 object-cover"
          />
          <p className="text-[12px]">Something called bag</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
