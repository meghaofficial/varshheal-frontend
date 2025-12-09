import { useSearchParams } from "react-router-dom";
import ProductCard from "./small/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const images = [
    "https://www.thepurpletree.in/cdn/shop/files/TOTE_BAG_465.jpg?v=1750061139&width=533",
    "https://brownliving.in/cdn/shop/files/just-be-there-100-cotton-canvas-tote-bag-ecomantraa-sustainable-tote-bag-brown-living-em-0051b-233582.jpg?v=1729441221",
    "https://www.thepurpletree.in/cdn/shop/files/DUCKTOTE00003_3.jpg?v=1713008138",
  ];
  const paramsCat = searchParams.get("category");

  const cards = Array.from({ length: 30 }, (_, i) => i + 1);

  // 🔥 Updated for 4 cards per row:
  const cardsPerRow = 4;
  const rowsPerSection = 2;
  const cardsPerSection = cardsPerRow * rowsPerSection; // 8 cards per section

  const totalSections = Math.ceil(cards.length / cardsPerSection);

  const [activeIndex, setActiveIndex] = useState(0);

  const sections = Array.from({ length: totalSections }).map((_, i) =>
    cards.slice(i * cardsPerSection, (i + 1) * cardsPerSection)
  );

  return (
    <div className="md:px-32">
      {/* upper bar for categories */}
      <div className="p-3 md:mt-3">
        <p className="playfair">CATEGORIES</p>
        <div className="flex gap-3 mt-3  w-full overflow-x-auto hide-scrollbar">
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              !paramsCat && "bg-black text-white"
            }`}
            onClick={() => setSearchParams({})}
          >
            All
          </span>
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              paramsCat === "bags" && "bg-black text-white"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("category", "bags");
                return params;
              });
            }}
          >
            Bags
          </span>
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              paramsCat === "sandals" && "bg-black text-white"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("category", "sandals");
                return params;
              });
            }}
          >
            Sandals
          </span>
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              paramsCat === "perfumes" && "bg-black text-white"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("category", "perfumes");
                return params;
              });
            }}
          >
            Perfumes
          </span>
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              paramsCat === "tshirts" && "bg-black text-white"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("category", "tshirts");
                return params;
              });
            }}
          >
            T-Shirts
          </span>
          <span
            className={`rounded-full text-nowrap border px-3 text-[12px] py-1 cursor-pointer hover:bg-black hover:text-white ${
              paramsCat === "jwelleries" && "bg-black text-white"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("category", "jewlleries");
                return params;
              });
            }}
          >
            Jwelleries
          </span>
        </div>
      </div>
      {/* for lg screen */}
      <div className="relative w-full h-full mt-3 md:block hidden">
        {/* Visible Section */}
        <div className="w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-4 gap-4 p-4 w-full"
            >
              {sections[activeIndex].map((num) => (
                <ProductCard key={num} images={images} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vertical Clickable Dots */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: totalSections }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#de6f5e] scale-125"
                  : "bg-gray-400/50"
              }`}
            />
          ))}
        </div>
      </div>
      {/* for sm screen */}
      <div className="w-full grid grid-cols-2 gap-4 mt-2 mb-10 md:hidden px-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index}>
            <ProductCard images={images} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
