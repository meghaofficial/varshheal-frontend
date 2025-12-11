import React from "react";

const BagBranding = () => {
  return (
    <div className="relative flex md:flex-row flex-col items-center justify-center md:px-32 px-8">
      {/* bagbranding title hidden for sm screens */}
      <div className="absolute left-45 top-20 md:block hidden">
        <p className="text-[60px]">BAG</p>
        <p className="text-[60px] mt-[-25px]">Branding</p>
        <div className="rounded h-1 w-10 bg-black absolute -right-12 bottom-10"></div>
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[1px] bg-[#464646]"></div>
          <p className=" text-[#464646]">EXCELLENT QUALITY</p>
        </div>
        <button className="rounded-md bg-black text-white cursor-pointer px-9 py-2 text-[14px] absolute -bottom-20">
          View Article
        </button>
      </div>
      {/* for lg screen */}
      <div className="md:hidden relative">
        <p className="text-[50px]/15">BAG Branding</p>
        <div className="rounded h-1 w-10 bg-black absolute right-6 bottom-6 md:block hidden"></div>
      </div>
      <img
        src="/images/bag4photo.jpg"
        alt="bag4"
        className="rounded md:h-[550px] md:mt-0 mt-5"
      />
      {/* sm screen button */}
      <button className="rounded-md bg-black text-white cursor-pointer px-9 py-2 text-[14px] absolute bottom-52 md:hidden">
        View Article
      </button>
      {/* right for lg */}
      <div className="md:absolute left-[850px] md:block md:mt-0 mt-6 flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-4 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Camera Bag
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
        <div className="flex items-center gap-4 md:mt-5 md:ps-6 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Duffle Bag
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
        <div className="flex items-center gap-4 md:mt-5 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Sling Bag
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
        <div className="flex items-center gap-4 md:mt-5 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Clutch
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
        <div className="flex items-center gap-4 md:mt-5 md:ps-6 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Flap Bag
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
        <div className="flex items-center gap-4 md:mt-5 duration-300 ease-in-out cursor-pointer group translate-x-0 hover:translate-x-[30px]">
          <span className="text-[#d1d1d1] playfair text-[20px] group-hover:text-black">
            Bagpack
          </span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv6ck2DPM2yqdewLRM9XTVk_Jk0vefwMR2g&s"
            alt="camera bag"
            className="rounded-full h-7 w-7"
          />
        </div>
      </div>
    </div>
  );
};

export default BagBranding;
