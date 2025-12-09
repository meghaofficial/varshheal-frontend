import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./small/ProductCard";

export default function Test() {
  const cards = Array.from({ length: 30 }, (_, i) => i + 1);

  // 🔥 Updated for 4 cards per row:
  const cardsPerRow = 4;
  const rowsPerSection = 2;
  const cardsPerSection = cardsPerRow * rowsPerSection; // 8 cards per section

  const totalSections = Math.ceil(cards.length / cardsPerSection);

  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://www.thepurpletree.in/cdn/shop/files/TOTE_BAG_465.jpg?v=1750061139&width=533",
    "https://brownliving.in/cdn.shop/files/just-be-there-100-cotton-canvas.jpg",
    "https://www.thepurpletree.in/cdn/shop/files/DUCKTOTE00003_3.jpg?v=1713008138",
  ];

  const sections = Array.from({ length: totalSections }).map((_, i) =>
    cards.slice(i * cardsPerSection, (i + 1) * cardsPerSection)
  );

  return (
    <div className="relative w-full h-full">
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
  );
}
