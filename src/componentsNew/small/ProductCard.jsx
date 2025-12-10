import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const interval = 3000;
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // Auto slide
  //   useEffect(() => {
  //     const slider = setInterval(() => {
  //       setCurrent((prev) => (prev + 1) % images.length);
  //     }, interval);

  //     return () => clearInterval(slider);
  //   }, [images.length, interval]);

  return (
    <div
      className="p-1 rounded-[15px] group shadow w-fit relative overflow-hidden bg-cover bg-center"
      // style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className="relative">
        {/* Outer wrapper must have a fixed width */}
        <div className="md:w-[200px] overflow-hidden rounded-[15px]">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 rounded-[15px]"
            style={{ transform: `translateX(-${current * 100}%)` }}
            ref={imgRef}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`slide-${index}`}
                className="md:w-[200px] h-[160px] rounded-[15px] object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 
          ${current === index ? "bg-white scale-110" : "bg-white/40"}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      {/* lower body */}
      <div className="w-full flex items-center justify-between md:px-3 px-1 py-2">
        <div>
          <p className="playfair text-[14px]">Some Title</p>
          <p className="mt-[-2px] text-[#de6f5e] font-semibold playfair text-[14px]">
            Rs.200
          </p>
        </div>
        <div className="rounded-full p-3 bg-[#f0f0f0] cursor-pointer hover:bg-[#ffecee]" onClick={() => navigate("/product-name")}>
          <GoArrowUpRight />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
