import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineArrowForward } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Test from "./Test";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [activeColor, setActiveColor] = useState("pink");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/images/bag2photo.jpg",
    "/images/funky1.jpeg",
    "/images/funky2.webp",
    "/images/funky3.jpg",
  ];

  return (
    <>
      {/* for lg screen */}
      <div className="md:flex hidden justify-center items-start gap-5 mt-10 relative">
        {/* left */}
        <div className={`w-1/2 flex flex-col px-20`}>
          <div className="flex items-center gap-3">
            <span
              className=" cursor-pointer hover:underline"
              onClick={() => navigate("/collections")}
            >
              COLLECTIONS
            </span>
            <MdOutlineArrowForward
              className="text-[#d1d1d1]"
              strokeWidth="0px"
              size={20}
            />
            <span className="">COATS</span>
          </div>
          <p className="playfair text-[60px]/15 w-[600px] mt-10">
            Nicole full length trench coat
          </p>
          {/* colors */}
          <div className="p-6 flex items-center gap-2 mt-5">
            <div
              className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                activeColor === "pink" && "border"
              }`}
              onClick={() => setActiveColor("pink")}
            >
              <div
                className={`h-[19px] w-[19px] rounded-full bg-pink-300`}
              ></div>
            </div>
            <div
              className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                activeColor === "red" && "border"
              }`}
              onClick={() => setActiveColor("red")}
            >
              <div
                className={`h-[19px] w-[19px] rounded-full bg-red-300`}
              ></div>
            </div>
            <div
              className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                activeColor === "green" && "border"
              }`}
              onClick={() => setActiveColor("green")}
            >
              <div
                className={`h-[19px] w-[19px] rounded-full bg-green-300`}
              ></div>
            </div>
          </div>
          {/* add to card */}
          {isAddedToCart ? (
            <button
              className="text-white bg-green-500 rounded cursor-pointer text-[10px] flex items-center gap-3 px-4 py-2 mb-3 ms-6 w-fit"
              onClick={() => setIsAddedToCart(false)}
            >
              REMOVE FROM CART
              <div className="bg-white rounded-full border border-white h-5 w-5 flex items-center justify-center cursor-pointer">
                <BsCheckLg size={15} className="text-green-500" />
              </div>
            </button>
          ) : (
            <button
              className="text-white bg-black rounded cursor-pointer text-[10px] flex items-center gap-3 px-4 py-2 mb-3 ms-6 w-fit"
              onClick={() => setIsAddedToCart(true)}
            >
              ADD TO CART
              <div className="bg-white rounded-full border border-white h-5 w-5 flex items-center justify-center cursor-pointer">
                <FaArrowRightLong size={8} className="text-black" />
              </div>
            </button>
          )}
          {/* description */}
          <div
            className="flex items-start mt-2 ps-6"
            style={{ fontFamily: "Arial" }}
          >
            <div>
              <span className="font-semibold text-lg">Description</span>
              <div className="text-gray-500 text-sm">
                <div
                  className={`transition-all duration-500 ease-in-out mt-1 mb-2 ${
                    showMore
                      ? "max-h-[1000px] overflow-y-auto"
                      : "max-h-[80px] overflow-y-hidden"
                  }`}
                >
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Neque accusamus unde, ea totam, placeat officiis deleniti
                    accusantium ab pariatur doloribus nesciunt ex maiores itaque
                    atque deserunt non? Hic tenetur sequi cumque dignissimos,
                    amet eligendi unde saepe mollitia quam neque. Numquam non
                    quasi harum debitis a sunt molestiae dicta aspernatur
                    dolorum velit dolore, nobis corrupti nihil. Vero dicta nobis
                    sed, aperiam, ullam modi illo illum cum, minima obcaecati
                    quod! Officiis libero tempore porro soluta beatae! Soluta
                    fuga ea impedit eius saepe non perspiciatis quos
                    voluptatibus doloribus omnis distinctio quasi, maiores,
                    labore a ipsam nulla! Nobis harum recusandae ullam
                    veritatis! Quo, sunt?
                  </p>
                </div>

                {!showMore ? (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </span>
                ) : (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(false)}
                  >
                    Show Less
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 pe-20 flex flex-col gap-5 items-center h-[600px] hide-scrollbar overflow-y-auto">
          <div className="min-h-[600px] w-full">
            <video
              src="/videos/demo.mp4"
              className="object-cover h-full w-full rounded-tr-[100px] rounded-bl-[100px]"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          {images?.map((im, index) => (
            <div className="min-h-[600px] w-full" key={index}>
              <img
                src={im}
                alt=""
                className={`object-cover h-full w-full ${
                  index % 2 === 0
                    ? "rounded-tr-[100px] rounded-bl-[100px]"
                    : "rounded-br-[100px] rounded-tl-[100px]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* for sm screen */}
      <div className="mb-10 md:hidden">
        {/* header (collections->category) */}
        <div className="flex items-center gap-3 px-5 mt-4">
          <span
            className=" cursor-pointer hover:underline text-[13px]"
            onClick={() => navigate("/collections")}
          >
            COLLECTIONS
          </span>
          <MdOutlineArrowForward
            className="text-[#d1d1d1]"
            strokeWidth="0px"
            size={20}
          />
          <span className="text-[13px]">COATS</span>
        </div>
        {/* images */}
        <div className="mt-7 px-5">
          <div className="">
            <div className="flex h-[350px] w-full overflow-hidden rounded-tr-[80px] rounded-bl-[80px]">
              {images.map((src, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="relative cursor-pointer"
                    animate={{
                      width: isActive ? "100%" : "15px",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <img
                      src={src}
                      className="h-full w-full object-cover"
                      alt={`Image-${index}`}
                    />

                    {/* Dark overlay on collapsed images */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* below sm images */}
          <div className="flex items-center gap-2 justify-center mt-5">
            {images?.map((im, index) => (
              <div
                key={index}
                className={`w-full h-[100px] rounded-[15px] ${
                  activeIndex === index && "border-[2px] border-[#de6f5e]"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={im}
                  alt=""
                  className="w-full h-full object-cover rounded-[13px]"
                />
              </div>
            ))}
          </div>
        </div>
        {/* colors & add to cart */}
        <div className="flex items-center justify-between p-5 mt-3">
          {/* colors */}
          <div>
            <p className="text-[#d1d1d1] text-[14px] mb-1.5">Available Colors</p>
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                  activeColor === "pink" && "border"
                }`}
                onClick={() => setActiveColor("pink")}
              >
                <div
                  className={`h-[19px] w-[19px] rounded-full bg-pink-300`}
                ></div>
              </div>
              <div
                className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                  activeColor === "red" && "border"
                }`}
                onClick={() => setActiveColor("red")}
              >
                <div
                  className={`h-[19px] w-[19px] rounded-full bg-red-300`}
                ></div>
              </div>
              <div
                className={`h-6 w-6 cursor-pointer p-[2px] flex items-center justify-center rounded-full ${
                  activeColor === "green" && "border"
                }`}
                onClick={() => setActiveColor("green")}
              >
                <div
                  className={`h-[19px] w-[19px] rounded-full bg-green-300`}
                ></div>
              </div>
            </div>
          </div>
          {/* add to cart */}
          {isAddedToCart ? (
            <button
              className="text-white bg-green-500 rounded cursor-pointer text-[10px] flex items-center gap-3 px-4 py-2 w-fit"
              onClick={() => setIsAddedToCart(false)}
            >
              REMOVE FROM CART
              <div className="bg-white rounded-full border border-white h-5 w-5 flex items-center justify-center cursor-pointer">
                <BsCheckLg size={15} className="text-green-500" />
              </div>
            </button>
          ) : (
            <button
              className="text-white bg-black rounded cursor-pointer text-[10px] flex items-center gap-3 px-4 py-2 w-fit"
              onClick={() => setIsAddedToCart(true)}
            >
              ADD TO CART
              <div className="bg-white rounded-full border border-white h-5 w-5 flex items-center justify-center cursor-pointer">
                <FaArrowRightLong size={8} className="text-black" />
              </div>
            </button>
          )}
        </div>
        {/* description */}
        <div
            className="flex items-start mt-2 px-6"
            style={{ fontFamily: "Arial" }}
          >
            <div>
              <span className="font-semibold text-lg">Description</span>
              <div className="text-gray-500 text-sm">
                <div
                  className={`transition-all duration-500 ease-in-out mt-1 mb-2 ${
                    showMore
                      ? "max-h-[1000px] overflow-y-auto"
                      : "max-h-[80px] overflow-y-hidden"
                  }`}
                >
                  <p className="">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Neque accusamus unde, ea totam, placeat officiis deleniti
                    accusantium ab pariatur doloribus nesciunt ex maiores itaque
                    atque deserunt non? Hic tenetur sequi cumque dignissimos,
                    amet eligendi unde saepe mollitia quam neque. Numquam non
                    quasi harum debitis a sunt molestiae dicta aspernatur
                    dolorum velit dolore, nobis corrupti nihil. Vero dicta nobis
                    sed, aperiam, ullam modi illo illum cum, minima obcaecati
                    quod! Officiis libero tempore porro soluta beatae! Soluta
                    fuga ea impedit eius saepe non perspiciatis quos
                    voluptatibus doloribus omnis distinctio quasi, maiores,
                    labore a ipsam nulla! Nobis harum recusandae ullam
                    veritatis! Quo, sunt?
                  </p>
                </div>

                {!showMore ? (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </span>
                ) : (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(false)}
                  >
                    Show Less
                  </span>
                )}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ProductPage;
