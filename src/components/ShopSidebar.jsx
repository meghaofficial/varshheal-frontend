import { ChevronRight } from "lucide-react";
import Colors from "./Colors";
import PriceRange from "./PriceRange";
import RatingFilter from "./RatingFilter";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosPrivate from "../utils/axiosPrivate";

const ShopSidebar = ({
  categories,
  setProducts,
  loading,
  setLoading,
  setCatName,
  setTotalPages,
  setTotal,
  setCurrentPage,
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? allCategories : allCategories.slice(0, 3);
  const [prms, setPrms] = useState({});
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);

  useEffect(() => {
    const filterProducts = async (page = 1, search = "") => {
      setLoading(true);
      try {
        const params = {};
        if (prms?.categoryId) params.categoryId = prms.categoryId;
        if (prms?.priceMin) params.priceMin = prms.priceMin;
        if (prms?.priceMax) params.priceMax = prms.priceMax;
        if (prms?.ratingMin) params.ratingMin = prms.ratingMin;
        if (prms?.ratingMax) params.ratingMax = prms.ratingMax;
        if (prms?.color) params.color = prms.color;
        if (prms?.search) params.search = prms.search;

        const page = prms?.page || 1;
        const limit = prms?.limit || 20;

        const res = await axiosPrivate.get("/published-products", {
          params: {
            // page,
            // limit,
            ...params,
          },
        });

        setProducts(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
        setTotal(res?.data?.total);
        setCurrentPage(res?.data?.currentPage);

        return res.data;
      } catch (error) {
        console.error(`Error fetching products:`, error);
        return null;
      } finally {
        setLoading(false);
      }
    };
    filterProducts();
  }, [prms]);

  useEffect(() => {
    const getAllColors = async () => {
      try {
        const res = await axiosPrivate.get("/colors");
        const cl = res?.data?.colors?.map((c) => {
          const obj = { color: c, isSelected: false };
          return obj;
        });
        // THIS SHOULD BE THE FORMAT
        // { color: "red", isSelected: true },
        // { color: "purple", isSelected: false },
        // { color: "orange", isSelected: true },
        // { color: "green", isSelected: true },
        // { color: "gray", isSelected: false },
        // { color: "brown", isSelected: false },
        setSelectedColors(cl);
      } catch (error) {
        console.error(error);
      }
    };
    getAllColors();
  }, []);

  return (
    <div className="relative rounded-[20px] shadow-lg shadow-geay-100 p-6 h-full">
      <span
        className="absolute right-4 top-7.5 text-[12px] cursor-pointer text-red-500"
        onClick={() => {
          setPrms([]);
          setCatName("");
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
          {visibleCategories.map((cat, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between cursor-pointer py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setPrms((prev) => ({ ...prev, categoryId: cat?._id }));
                setCatName(cat?.name);
              }}
            >
              <span
                className={`text-gray-600 ${
                  prms?.categoryId === cat?._id && "font-bold"
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
              tick={d.isSelected}
              setSelectedColors={setSelectedColors}
              index={index}
              setPrms={setPrms}
            />
          </div>
        ))}
      </div>
      <p className="pt-serif md:text-sm mt-5 font-semibold">Price Range</p>
      <div className="mt-2">
        <PriceRange setPrms={setPrms} />
      </div>
      <p className="pt-serif md:text-sm mt-5 font-semibold">Ratings</p>
      <div className="mt-2">
        <RatingFilter />
      </div>
    </div>
  );
};

export default ShopSidebar;
