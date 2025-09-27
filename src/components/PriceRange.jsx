import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const PriceRange = () => {
  // state will hold the range as [min, max]
  const [priceRange, setPriceRange] = useState([500, 3000]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center mt-4">
      <RangeSlider
        min={0}
        max={5000}
        step={50}
        value={priceRange}              // controlled state
        onInput={setPriceRange}         // updates state automatically
      />

      {/* Showing selected values */}
      <div className="flex justify-between w-full mt-2 text-gray-700 text-sm font-medium">
        <span>Rs. {priceRange[0]}</span>
        <span>Rs. {priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceRange;
