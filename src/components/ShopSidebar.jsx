import { ChevronRight } from "lucide-react";
import Colors from "./Colors";
import PriceRange from "./PriceRange";
import RatingFilter from "./RatingFilter";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosPrivate from "../utils/axiosPrivate";
import { useSearchParams } from "react-router-dom";

const ShopSidebar = ({
  categories,
  loading,
  setLoading,
  setCatName,
  updateFilter,
  clearAllFilters,
  selectedColors,
  setSelectedColors,
  getAllColors
}) => {
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll
    ? allCategories
    : allCategories?.slice(0, 3);
  const [prms, setPrms] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);

  // CHECK PAGINATION AND LOADER

  return (
    <div className="relative rounded-[20px] shadow-lg shadow-geay-100 overflow-y-auto p-6 h-full">
      <span
        className="absolute right-4 top-7.5  cursor-pointer text-red-500"
        onClick={() => {
          // setCatName("");
          clearAllFilters();
          getAllColors();
          // updateFilter("min", 500);
          // updateFilter("max", 3000);
        }}
      >
        Reset
      </span>
      <span className="pt-serif font-bold md:text-[18px] text-[20px]">
        Categories
      </span>
      <div className="outfit font-[400] md:text-sm mt-1 mb-4">
        {/* Categories */}
        <AnimatePresence>
          {visibleCategories?.map((cat, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between cursor-pointer py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setPrms((prev) => ({
                  ...prev,
                  categoryId: cat?._id,
                }));
                setCatName(cat?.name);
                updateFilter("category", cat?.name);
              }}
            >
              <span
                className={`text-gray-600 ${
                  (prms?.categoryId === cat?._id ||
                    searchParams.get("category") === cat?.name) &&
                  "font-bold"
                }`}
              >
                {cat?.name}
              </span>
              <ChevronRight size={17} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show All / Show Less button */}
        {allCategories.length > 3 && (
          <span
            onClick={() => setShowAll(!showAll)}
            className="flex items-center justify-center cursor-pointer rounded-full border border-gray-300 py-2 md:text-sm hover:text-white hover:bg-black hover:border-none mt-2 transition"
          >
            {showAll ? "Show Less" : "Show All"}
          </span>
        )}
      </div>
      <p className="pt-serif font-bold md:text-[18px] text-[20px] mt-6">
        Filters
      </p>
      <p className="pt-serif md:text-sm mt-2 font-semibold">Available Colors</p>
      <div className="flex items-center flex-wrap gap-3 mt-2">
        {selectedColors.map((d, index) => (
          <div key={index}>
            <Colors
              color={d.color}
              tick={
                d.isSelected || searchParams.getAll("color")?.includes(d.color)
              }
              setSelectedColors={setSelectedColors}
              index={index}
              setPrms={setPrms}
            />
          </div>
        ))}
      </div>
      <p className="pt-serif md:text-sm mt-5 font-semibold">Price Range</p>
      <div className="mt-2">
        <PriceRange setPrms={setPrms} updateFilter={updateFilter} />
      </div>
      <p className="pt-serif md:text-sm mt-5 font-semibold">Ratings</p>
      <div className="mt-2">
        <RatingFilter />
      </div>
    </div>
  );
};

export default ShopSidebar;
