import { motion } from "framer-motion";
import { useState } from "react";
import ProductCard2 from "./ProductCard2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SimilarProducts = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  const [len, setLen] = useState(16);
  const [currIndex, setCurrIndex] = useState(0);
  const visibleCount = 4;

  const handleNext = () => {
    if (currIndex + visibleCount < len) {
      setCurrIndex(currIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (currIndex - visibleCount >= 0) {
      setCurrIndex(currIndex - visibleCount);
    }
  };

  return (
    <>
      {/* <div>
      <p className="text-2xl font-semibold">You may also like</p>
      <div className="flex items-center my-4">
        <div className="cursor-pointer" onClick={handlePrev}>
          <ChevronLeft />
        </div>
        <div className="overflow-hidden mt-4 w-[1120px] mx-auto pb-2">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: -currIndex * 290 }} // move exactly 1 card+gap per step
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {Array.from({ length: len }).map((_, index) => (
              <div key={index} className="w-[250px] flex-shrink-0">
                <ProductCard2 />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="cursor-pointer" onClick={handleNext}>
          <ChevronRight />
        </div>
      </div>
    </div> */}

      <div className="">
        {/* header */}
        <div className="flex items-center gap-3 select-none px-6 mb-3">
          <span className="text-[25px] text-nowrap heading font-extrabold mb-2">
            Popular Categories
          </span>
          <div className="bg-gray-300 w-full h-[1px]"></div>
        </div>
        <div className="relative overflow-visible z-0 px-5">
          <Carousel
            responsive={responsive}
            arrows={true}
            infinite={false}
            autoPlay={false}
          >
            {Array.from({ length: 18 }).map((_, index) => (
              <div key={index} className="p-2 flex items-center justify-center">
                {/* <CategoriesCard category={cat} index={index} /> */}
                <ProductCard2 />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
