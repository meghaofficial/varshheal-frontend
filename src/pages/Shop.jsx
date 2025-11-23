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
import { Outlet } from "react-router-dom";
import Colors from "../components/Colors";
import { IoFilterSharp } from "react-icons/io5";
import axiosPrivate from "../utils/axiosPrivate";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const dummyProducts = [
  {
    id: 1,
    name: "Candles Purity Set",
    price: 35,
    img: "https://www.randbfashion.in/on/demandware.static/-/Sites-randb_master_catalog/default/dwc0d17e22/large/s6cvx4p1t1dc5ihdz76a7_8909006478528_1.jpg",
  },
  {
    id: 2,
    name: "Wu Soft Candleholders",
    price: 41,
    img: "https://5.imimg.com/data5/SELLER/Default/2024/5/422252751/HY/MD/AY/222988662/women-ethnic-dresses.jpg",
  },
  {
    id: 3,
    name: "Glass Chemical Vase",
    price: 158,
    img: "https://m.media-amazon.com/images/I/91Lta51hV-L._UY1100_.jpg",
  },
  {
    id: 4,
    name: "Carafe Clay Amber",
    price: 195,
    img: "https://d29lkp7s2wd4pq.cloudfront.net/full/Gray-and-White-Cotton-Stripe-Women-Shirt-44120.jpg",
  },
  {
    id: 5,
    name: "White Ceramic Gold Vase",
    price: 158,
    img: "https://levi.in/cdn/shop/files/871740064_01_Style_shot_f108eb59-be64-4399-aa3e-5ff0047dd631.jpg?v=1727635700",
  },
  {
    id: 6,
    name: "Ceramic White Vase",
    price: 98,
    img: "https://rukminim2.flixcart.com/image/704/844/xif0q/jean/b/l/e/38-womjennvshd-03a-dblue-urbano-fashion-original-imagpyb9qgshm2cp.jpeg?q=90&crop=false",
  },
  {
    id: 7,
    name: "Complex 2 Vases Natural",
    price: 158,
    img: "https://okhai.org/cdn/shop/files/LKS23526240_1.jpg?v=1754287188",
  },
  {
    id: 9,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://assets.ajio.com/medias/sys_master/root/20241026/X7Iy/671d1a6d260f9c41e8a25f26/-473Wx593H-466720757-grey-MODEL.jpg",
  },
  {
    id: 10,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://5.imimg.com/data5/IOS/Default/2023/6/318569095/ZZ/FO/KM/83659867/product-jpeg.png",
  },
  {
    id: 11,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://westernera.com/cdn/shop/files/wine-red-party-wear-dress-with-front-pleats-dresses-for-women-570855.jpg?v=1747167940",
  },
  {
    id: 12,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://www.ethnicset.in/cdn/shop/files/184A5822-Copy.jpg?v=1704523423",
  },
  {
    id: 13,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://ladybaazar.com/cdn/shop/files/womens_Magenta_Ethnic_Motifs_Jacquard_Maxi_Dress.jpg?v=1719396983",
  },
  {
    id: 14,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://tigc.in/cdn/shop/files/compress_womens-purple-fitted-textured-partywear-ruffle-dress-0923-fhwadrs-11-a-lilac__1.jpg?v=1720713020",
  },
  {
    id: 15,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://okhai.org/cdn/shop/files/LKS23526240_1.jpg?v=1754287188",
  },
  {
    id: 16,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://silvermerc.com/cdn/shop/files/SWF2UR_10_4.jpg?v=1704876628",
  },
  {
    id: 17,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://www.jiomart.com/images/product/original/rvll7qdeuu/fabflee-women-black-typographic-pure-cotton-tshirt-xl-product-images-rvll7qdeuu-0-202208281445.jpg?im=Resize=(500,630)",
  },
  {
    id: 18,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://d1pdzcnm6xgxlz.cloudfront.net/bottoms/8905875017073-18.jpg",
  },
  {
    id: 19,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS-UG1LUiOZWveZQ8RPqJAH2hukEG4QabpuA&s",
  },
  {
    id: 20,
    name: "Fie Cushion Cover",
    price: 65,
    img: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25958152/2023/12/5/8444ec88-b6d4-4e89-ab0b-182297ab38681701762931769-Roadster-Women-Tshirts-1251701762931449-1.jpg",
  },
];

const categories = ["Tshirts", "Shirts", "Jeans", "Party", "Ethnic"];

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [catName, setCatName] = useState("");
  const [query, setQuery] = useState("");

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
    handleGetProducts();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleGetProducts(1, query);
    }, 300);
  }, [query]);

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
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <RxCross2
              className="absolute right-2 top-2 text-gray-500 cursor-pointer"
              onClick={() => setQuery("")}
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
      <div className="flex items-center justify-between gap-2 md:hidden px-4 py-2 bg-[#e6ded3]/20">
        <div className="w-[90%]">
          <div className="cursor-pointer relative bg-[#e6ded3]/30 rounded-full">
            <input
              type="text"
              className="py-2 outline-none ps-4"
              placeholder="Search"
            />
            <Search
              size={16}
              className="absolute right-3 top-3 text-black/40"
            />
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
                <ShopSidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
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
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Shop;
