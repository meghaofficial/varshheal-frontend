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
  setProducts,
  loading,
  setLoading,
  setCatName,
  setTotalPages,
  setTotal,
  setCurrentPage,
  updateFilter,
  clearAllFilters,
}) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll
    ? allCategories
    : allCategories?.slice(0, 3);
  const [prms, setPrms] = useState({});
  const [searchParams] = useSearchParams();
  const [catID, setCatID] = useState(null);
  // const [loading, setLoading] = useState(false);
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);

  useEffect(() => {
    const catId = categories?.filter((c) => c?.name === category);
    setCatID(catId?.[0]?._id);
  }, [category]);

  console.log(catID);

  // CHECK PAGINATION AND LOADER

  useEffect(() => {
    const filterProducts = async (page = 1, search = "") => {
      setLoading(true);
      try {
        // const params = {};
        // if (prms?.categoryId) params.categoryId = prms.categoryId;
        // if (prms?.priceMin) params.priceMin = prms.priceMin;
        // if (prms?.priceMax) params.priceMax = prms.priceMax;
        // if (prms?.ratingMin) params.ratingMin = prms.ratingMin;
        // if (prms?.ratingMax) params.ratingMax = prms.ratingMax;
        // if (prms?.color) params.color = prms.color;
        // if (prms?.search) params.search = prms.search;

        // const page = prms?.page || 1;
        // const limit = prms?.limit || 20;

        const page = searchParams.get("page") || 1;
        const search = searchParams.get("sq") || "";
        const category = searchParams.get("category") || "";
        const priceMin = searchParams.get("min") || "";
        const priceMax = searchParams.get("max") || "";
        const colors = searchParams.getAll("color");

        const url = new URLSearchParams();

        url.set("page", page);
        url.set("limit", 10);

        if (search) url.set("search", search);
        if (priceMin) url.set("priceMin", priceMin);
        if (priceMax) url.set("priceMax", priceMax);

        let res;
        if (catID) {
          if (category) url.set("categoryId", catID);
          res = await axiosPrivate.get(`/published-products?${url}`, {
            params: {
              color: colors,
            },
          });
        }

        // const res = await axiosPrivate.get("/published-products", {
        //   params: {
        //     // page,
        //     // limit,
        //     ...params,
        //   },
        // });

        setProducts(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
        setTotal(res?.data?.total);
        setCurrentPage(res?.data?.currentPage);

        return res?.data;
      } catch (error) {
        console.error(`Error fetching products:`, error);
        return null;
      } finally {
        setLoading(false);
      }
    };
    filterProducts();
  }, [searchParams, catID]);

  // const getAllColors = async () => {
  //   try {
  //     const res = await axiosPrivate.get("/colors");
  //     const cl = res?.data?.colors?.map((c) => {
  //       const obj = { color: c, isSelected: false };
  //       return obj;
  //     });
  //     // THIS SHOULD BE THE FORMAT
  //     // { color: "red", isSelected: true },
  //     // { color: "purple", isSelected: false },
  //     // { color: "orange", isSelected: true },
  //     // { color: "green", isSelected: true },
  //     // { color: "gray", isSelected: false },
  //     // { color: "brown", isSelected: false },
  //     const colors = searchParams.getAll("color");
  //     const paramsColor = colors?.map((c) => {
  //       if (!cl?.includes(res?.data?.colors)) {
  //         const obj = { color: c, isSelected: true };
  //         return obj;
  //       }
  //     });
  //     setSelectedColors([...paramsColor, ...cl]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAllColors = async () => {
    try {
      const res = await axiosPrivate.get("/colors");

      // Convert API colors → default unselected objects
      let cl = res?.data?.colors?.map((c) => ({
        color: c,
        isSelected: false,
      }));

      // Get selected colors from URL params
      const urlColors = searchParams.getAll("color"); // array of strings

      // First: mark API colors as selected if found in params
      cl = cl.map((item) => ({
        ...item,
        isSelected: urlColors.includes(item.color),
      }));

      // Second: Add colors from params that are NOT present in API
      const extraColors = urlColors
        .filter((c) => !cl.some((item) => item.color === c))
        .map((c) => ({ color: c, isSelected: true }));

      // Final merged array
      setSelectedColors([...cl, ...extraColors]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllColors();
  }, []);

  return (
    <div className="relative rounded-[20px] shadow-lg shadow-geay-100 overflow-y-auto p-6 h-full">
      <span
        className="absolute right-4 top-7.5 text-[12px] cursor-pointer text-red-500"
        onClick={() => {
          setPrms([]);
          setCatName("");
          clearAllFilters();
          // getAllColors();
          updateFilter("min", 500);
          updateFilter("max", 3000);
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
