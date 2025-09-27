import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

// OLD

const MainAdvertisement = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [adData, setAdData] = useState([
    {
      title: "Purposeful Goods and Gifts Crafted by Hands",
      mainImg:
        "https://www.soosi.co.in/cdn/shop/products/IMG-20190407-WA0045_2048x.jpg?v=1571711111",
      subImg:
        "https://www.soosi.co.in/cdn/shop/products/IMG-20190407-WA0045_2048x.jpg?v=1571711111",
      url: "",
    },
    {
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
      mainImg:
        "https://img105.savana.com/goods-pic/09e000de747e404cb622161da777c0e6_w540_h720_q85.webp",
      subImg:
        "https://img105.savana.com/goods-pic/09e000de747e404cb622161da777c0e6_w540_h720_q85.webp",
      url: "",
    },
    {
      title: "vitae accusantium sapiente ipsam non, labore",
      mainImg:
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24451772/2023/8/11/ca63ff49-e860-4860-a9a2-57317dcfb4d01691733858691WomenFloralSequinesandMukaishEmbroideredMaxiDress1.jpg",
      subImg:
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/24451772/2023/8/11/ca63ff49-e860-4860-a9a2-57317dcfb4d01691733858691WomenFloralSequinesandMukaishEmbroideredMaxiDress1.jpg",
      url: "",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev === adData.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [adData.length]);

  return (
    <div className="overflow-x-hidden">
      {/* main top advertisement section for lg and md screen */}
      <div className="bg-[#f1eae2] sm:flex items-center justify-between hidden">
        {/* left image */}
        <div className="relative left-10 lg:block hidden">
          <div className="bg-[#ae9896] h-[400px] w-[280px] rounded-t-full"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currIndex} // important for re-animation on change
              src={adData?.[currIndex]?.subImg}
              alt="dress"
              className="h-[400px] w-[280px] absolute top-5 left-5 rounded-t-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* mid content */}
        <div className="lg:relative left-10 lg:ms-0 ms-10 lg:w-[35%] w-full">
          <p className="text-orange-400 mb-2">New Collection</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currIndex} // re-trigger when index changes
              className="text-[40px]/[50px] heading font-extrabold tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {adData?.[currIndex]?.title}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 mb-5 text-gray-500 md:text-start text-center">
            Supporting local makers since 2023
          </p>
          <Button classname='px-3 py-2' name='SHOP NOW' url='' />
        </div>

        {/* right image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currIndex}
            src={adData?.[currIndex]?.mainImg}
            alt="dress"
            className="h-[500px] max-w-[400px] object-cover"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* for sm screen */}
      <div className="bg-[#f1eae2] sm:hidden p-5 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center mb-5">
          <p className="text-orange-400 mb-2">New Collection</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currIndex} // important for re-animation on change
              className="text-[30px]/[40px] heading font-extrabold tracking-wide text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {adData?.[currIndex]?.title}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 mb-5 text-gray-500">
            Supporting local makers since 2023
          </p>
          <div className="flex items-center">
            <Link
              to={adData?.[currIndex]?.url}
              className="px-3 py-2 border-2 border-black cursor-pointer hover:text-white hover:bg-black"
            >
              SHOP NOW
            </Link>
            <Link
              to={adData?.[currIndex]?.url}
              className="px-3 py-2 border-y-2 border-r-2 border-black hover:text-white hover:bg-black cursor-pointer"
            >
              <ChevronRight />
            </Link>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.img
            key={currIndex}
            src={adData?.[currIndex]?.mainImg}
            alt="dress"
            className="h-[500px] max-w-[400px] object-cover"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainAdvertisement;
