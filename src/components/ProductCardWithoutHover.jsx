import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCardWithoutHover = () => {
  const [images, setImages] = useState([
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTiMpD9t1Uwg0kmglb7FIZBLdPt5cNOB7NZEnawDSy82Qub4B1p9jbV-Pg__ZWL-bt5u2XuZNIsubAOg0Wwiq6_NREurG0_gYcuu8d6cIs",
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ4vm5zDeElqACCFM00reKAU0gpJNxvHPw_ON8mj01KoWj7q55Lg0yiou5QnCCQx7nDEKXzRlgJBWcTZ4G4Bc4nlLUxriG4AHc3mCciyI8",
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS-qMVwvFoYfYWJkvjQsJFV9k33yo5LarMErqCz_PTKsH7A_6JZDYEcNaIcREU2grSPk64FFbcZhcvNaXSEPpn0uker6rWYVSQ2HV8F_d6w",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlk6wotA0KK3GVHzfSMg28QnJEwZOsClIQ-N9GpzJR7tXilj6YqtPuRf_GR6R83jimyay_Ln2Kg8hfOuWvkiC-r1Wh9P1Ly9nZuA7TQhg",
  ]);
  const [currIndex, setCurrIndex] = useState(0);

  const nextClick = () => {
    setCurrIndex((prev) => (prev + 1) % images.length);
  };

  const prevClick = () => {
    setCurrIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="transition-all duration-300 shadow-lg p-3 w-fit group select-none relative">
      {/* main images */}
      <div className="relative">
        <div
          className="absolute top-[130px] left-1 translate-x-0 transition-all duration-300 ease-in-out z-[999]"
          onClick={prevClick}
        >
          <ChevronLeft className="text-gray-400 cursor-pointer" />
        </div>
        <div className="relative w-[200px] h-[300px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currIndex * 100}%)` }}
          >
            {images.map((image, index) => {
              return (
                <img src={image} alt="man" className="w-[200px]" key={index} />
              );
            })}
          </div>
        </div>
        <div
          className="absolute top-[130px] right-1 translate-x-0 transition-all duration-300 ease-in-out"
          onClick={nextClick}
        >
          <ChevronRight className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* sub images */}
      <div className="-translate-y-4 flex items-center justify-center gap-2">
        {images.map((image, index) => {
          return (
            <div
              className={`w-[40px] h-[40px] overflow-hidden cursor-pointer ${
                currIndex === index ? "border" : ""
              } `}
              key={index}
              onClick={() => setCurrIndex(index)}
            >
              <img
                src={image}
                alt="dark"
                className="w-[40px] h-auto object-cover scale-125"
              />
            </div>
          );
        })}
      </div>

      <p className="text-center font-semibold text-[14px] -translate-y-2">
        Rs. 1130
      </p>
      <p className="text-center text-gray-600 text-[14px] mt-2 -translate-y-4">
        Some title
      </p>
      <p
        //     onClick={() => navigate(`/products/${productDetails?._id}`)}
        className="cursor-pointer relative text-center flex items-center justify-center -translate-y-3 transition-all duration-300 ease-in-out"
      >
        <span className="relative after:block after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-500 after:w-full text-[15px]">
          SELECT OPTIONS
        </span>
      </p>
    </div>
  );
};

export default ProductCardWithoutHover;
