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
  const colors = searchParams.getAll("color");  // returns ["red", "blue"]

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
  const handleGetProducts = useCallback(async (page = 1, search = "") => {
    setLoading(true);
    try {
      let query = `?page=${page}&limit=${10}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await axiosPrivate.get(`/published-products/${query}`, {
        withCredentials: true,
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
  }, []);

  useEffect(() => {
    handleGetCategories();
    // handleGetProducts();
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

  const clearAllFilters = () => setSearchParams({});

  // FOR SMALL SCREEN - SHOPSIDEBAR CODE
  const [selectedColors, setSelectedColors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll
    ? allCategories
    : allCategories?.slice(0, 3);
  const [prms, setPrms] = useState({});

  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);

  // CHECK PAGINATION AND LOADER

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
                  <div className="relative rounded-[20px] shadow-lg shadow-geay-100 overflow-y-auto p-6 h-full">
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
                    <p className="pt-serif md:text-sm mt-2 font-semibold">
                      Available Colors
                    </p>
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
                    <p className="pt-serif md:text-sm mt-5 font-semibold">
                      Price Range
                    </p>
                    <div className="mt-2">
                      <PriceRange setPrms={setPrms} />
                    </div>
                    <p className="pt-serif md:text-sm mt-5 font-semibold">
                      Ratings
                    </p>
                    <div className="mt-2">
                      <RatingFilter />
                    </div>
                  </div>
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
              setProducts={setProducts}
              loading={loading}
              setLoading={setLoading}
              setCatName={setCatName}
              setTotalPages={setTotalPages}
              setTotal={setTotal}
              setCurrentPage={setCurrentPage}
              updateFilter={updateFilter}
              clearAllFilters={clearAllFilters}
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
