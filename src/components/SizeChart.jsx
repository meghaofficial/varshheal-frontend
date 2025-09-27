import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SizeChart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <button
        className="w-full flex justify-between items-center px-2 py-2 h-full text-left transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm hover:underline cursor-pointer">Size Chart</span>
        {/* <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {/* Animated Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="px-2 flex justify-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0352/9303/6675/files/Screenshot_2021-07-25_at_8.34.41_PM_1024x1024.png?v=1627225606"
            alt="Size Chart"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
