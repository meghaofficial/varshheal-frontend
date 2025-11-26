import React, { useState, useEffect, useCallback } from "react";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import ProductCardWithoutHover from "../components/ProductCardWithoutHover";
import ProductCard2 from "../components/ProductCard2";
import { ChevronRight, Search } from "lucide-react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import PriceRange from "../components/PriceRange";
import RatingFilter from "../components/RatingFilter";
import Pagination from "../components/Pagination";
import { Outlet, useSearchParams } from "react-router-dom";
import Colors from "../components/Colors";
import { IoFilterSharp } from "react-icons/io5";
import axiosPrivate from "../utils/axiosPrivate";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [catName, setCatName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("sq") || "";
  const category = searchParams.get("category") || "";
  const colors = searchParams.getAll("color"); // returns ["red", "blue"]

  const handleGetCategories = useCallback(async (page = 1, search = "") => {
    // setLoading(true);
    try {
      let query = `?page=${page}&limit=${10}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await axiosPrivate.get(`/published-categories/${query}`, {
        withCredentials: true,
      });

      setCategories(res?.data?.data);

      return res.data;
    } catch (error) {
      console.error(`Error fetching categories:`, error);
      return null;
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, []);

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     handleGetProducts(1, query);
  //   }, 300);
  // }, [query]);

  const updateFilter = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    searchParams.delete("sq");
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  // FOR SMALL SCREEN - SHOPSIDEBAR CODE
  const [selectedColors, setSelectedColors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll
    ? allCategories
    : allCategories?.slice(0, 3);

  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);

  // CHECK PAGINATION AND LOADER

  useEffect(() => {
    const filterProducts = async (page = 1, search = "") => {
      setLoading(true);
      try {
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

        const catId = categories?.filter((c) => c?.name === category);

        if (catId?.[0]?._id) {
          if (category) url.set("categoryId", catId?.[0]?._id);
        }
        res = await axiosPrivate.get(`/published-products?${url}`, {
          params: {
            color: colors,
          },
        });

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
  }, [categories, searchParams]);

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
    // const getAllColors = async () => {
    //   try {
    //     const res = await axiosPrivate.get("/colors");
    //     const cl = res?.data?.colors?.map((c) => {
    //       const obj = { color: c, isSelected: false };
    //       return obj;
    //     });
    //     // THIS SHOULD BE THE FORMAT
    //     // { color: "red", isSelected: true },
    //     setSelectedColors(cl);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    getAllColors();
  }, []);

  return (
    <div className="">
      {/* header */}
      <div className="bg-[#e6ded3]/40 flex items-center justify-between pe-6">
        <div className="px-6 py-4 text-[15px] quicksand font-[500] flex items-center gap-3">
          <span className="cursor-pointer hover:font-bold">Home</span>
          <span>{">"}</span>
          <span className="cursor-pointer hover:font-bold">Categories</span>
          <span>{">"}</span>
          <span className="cursor-pointer hover:font-bold">
            {catName ? catName : "All"}
          </span>
        </div>
        {/* search */}
        <div className="md:block hidden cursor-pointer relative">
          <input
            type="text"
            className="bg-white/50 py-1 rounded-full outline-none ps-3"
            placeholder="Search"
            value={query}
            onChange={(e) => updateFilter("sq", e.target.value)}
          />
          {query ? (
            <RxCross2
              className="absolute right-2 top-2 text-gray-500 cursor-pointer"
              onClick={clearSearch}
            />
          ) : (
            <Search
              size={16}
              className="absolute right-2 top-2 text-black/40"
            />
          )}
        </div>
      </div>
      {/* search & filter for sm screen */}
      {location.pathname === "/shop" && (
        <div className="flex items-center justify-between gap-2 md:hidden px-4 py-2 bg-[#e6ded3]/20">
          <div className="w-[90%]">
            <div className="cursor-pointer relative bg-[#e6ded3]/30 rounded-full">
              <input
                type="text"
                className="py-2 outline-none ps-4"
                placeholder="Search"
                value={query}
                onChange={(e) => updateFilter("sq", e.target.value)}
              />
              {query ? (
                <RxCross2
                  className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                  onClick={clearSearch}
                />
              ) : (
                <Search
                  size={16}
                  className="absolute right-2 top-2 text-black/40"
                />
              )}
            </div>
          </div>
          {/* side filter for sm screens */}
          <div className="relative">
            {/* Menu Button */}
            <button onClick={() => setIsOpen(true)} className="w-[10%] text-xl">
              <IoFilterSharp />
            </button>

            {/* Dark Overlay */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/70 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />
              )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="fixed top-0 left-0 w-[70%] h-full bg-white z-50 flex flex-col"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.4 }}
                >
                  {/* Close Button */}
                  {/* <button
                  onClick={() => setIsOpen(false)}
                  className="self-end text-2xl text-gray-700"
                >
                  <FaTimes />
                </button> */}

                  {/* Sidebar Links */}
                  <ShopSidebar
                    categories={categories}
                    loading={loading}
                    setLoading={setLoading}
                    setCatName={setCatName}
                    updateFilter={updateFilter}
                    clearAllFilters={clearAllFilters}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    getAllColors={getAllColors}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      {location.pathname === "/shop" ? (
        <div className="p-4 flex items-start gap-4 bg-[#e6ded3]/20">
          {/* left filters for lg screens */}
          <div className="md:block hidden w-[20%]">
            <ShopSidebar
              categories={categories}
              loading={loading}
              setLoading={setLoading}
              setCatName={setCatName}
              updateFilter={updateFilter}
              clearAllFilters={clearAllFilters}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              getAllColors={getAllColors}
            />
          </div>
          {/* right */}
          <div className="md:w-[80%] flex items-center justify-center flex-col w-full">
            {loading ? (
              <div className="h-[450px] flex items-center justify-center">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                {products?.length <= 0 ? (
                  <div className="flex items-center justify-center h-[500px] w-full">
                    <p>Product Not Found!</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:gap-x-8 gap-x-4 md:gap-y-6 gap-y-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full justify-items-center">
                      {products?.map((p, index) => (
                        <div key={index}>
                          <ProductCard2 detail={p} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-center">
                      <Pagination totalPages={totalPages} />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Shop;
