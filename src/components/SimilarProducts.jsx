import { motion } from "framer-motion";
import { useState } from "react";
import ProductCard2 from "./ProductCard2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SimilarProducts = ({ similar }) => {
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

      <div className="">
        {/* header */}
        <div className="flex items-center gap-3 select-none px-6 mb-3">
          <span className="text-[25px] text-nowrap heading font-extrabold mb-2">
            Similar Products
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
            {similar?.map((d, index) => (
              <div key={index} className="p-2 flex items-center justify-center">
                <ProductCard2 detail={d} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
