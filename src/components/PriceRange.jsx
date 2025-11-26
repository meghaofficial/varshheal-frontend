import { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSearchParams } from "react-router-dom";

const PriceRange = ({ setPrms, updateFilter }) => {
  // state will hold the range as [min, max]
  const [searchParams] = useSearchParams();
  const priceMin = searchParams.get("min");
  const priceMax = searchParams.get("max");
  const [priceRange, setPriceRange] = useState(
    [priceMin, priceMax]
  );

  // useEffect(() => {
  //   setPrms(prev => ({ ...prev, priceMin: priceRange[0] }));
  //   setPrms(prev => ({ ...prev, priceMax: priceRange[1] }));
  // }, [priceRange]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      updateFilter("min", priceRange[0]);
      updateFilter("max", priceRange[1]);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [priceRange]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center mt-4">
      <RangeSlider
        min={0}
        max={5000}
        step={50}
        value={priceRange} // controlled state
        onInput={setPriceRange} // updates state automatically
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
