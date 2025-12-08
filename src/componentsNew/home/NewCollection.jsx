import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const NewCollection = () => {
  return (
    <div className="md:px-32 px-8 flex md:flex-row flex-col items-center justify-center md:gap-20">
    {/* for sm screen */}
     <p className="playfair font-bold text-[40px]/13 md:hidden">
          Check Out Our New Collections
        </p>
      {/* left body */}
      <div className="flex flex-col gap-4 md:mt-0 mt-10">
        {/* left */}
        <div className="flex items-end gap-4">
          {/* left top */}
          <div className="rounded-[10px] h-[120px] md:w-[150px] w-[40%] group overflow-hidden">
            <img
              src="/images/bag2.jpg"
              alt="bag2"
              className="h-full w-full rounded-[10px] object-cover duration-300 transition-all scale-100 group-hover:scale-125 ease-in-out"
            />
          </div>
          {/* left bottom */}
          <div className="rounded-[10px] h-[200px] md:w-[230px] w-[60%] group overflow-hidden">
            <img
              src="/images/bag3photo.jpg"
              alt="bag2"
              className="h-full w-full rounded-[10px] object-cover duration-300 transition-all scale-100 group-hover:scale-125 ease-in-out"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-start gap-4">
          {/* right top */}
          <div className="rounded-[10px] h-[200px] md:w-[230px] w-[60%] group overflow-hidden">
            <img
              src="/images/bag3.jpg"
              alt="bag2"
              className="h-full w-full rounded-[10px] object-cover duration-300 transition-all scale-100 group-hover:scale-125 ease-in-out"
            />
          </div>
          {/* right bottom */}
          <div className="rounded-[10px] h-[120px] md:w-[150px] w-[40%] group overflow-hidden">
            <img
              src="/images/bag2photo.jpg"
              alt="bag2"
              className="h-full w-full rounded-[10px] object-cover duration-300 transition-all scale-100 group-hover:scale-125 ease-in-out"
            />
          </div>
        </div>
      </div>
      {/* right body */}
      <div>
        <p className="playfair font-bold text-[40px]/13 md:block hidden">
          Check Out Our New Collections
        </p>
        <p className="text-[#464646] text-[12px] md:w-[60%] md:mt-3 mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
          magnam dicta illo voluptas facere maiores beatae praesentium
          voluptatibus ut laboriosam eligendi iusto quas fuga molestiae dolore
          quod, nam culpa corrupti!
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#e1735f]" />
            <p className="text-[12px] font-bold">1year+ gurantee</p>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#e1735f]" />
            <p className="text-[12px] font-bold">Genuine Leather</p>
          </div>
        </div>
        {/* button */}
        <button className="text-white bg-black rounded cursor-pointer text-[10px] flex items-center gap-3 px-4 py-2 mt-7">
          TRY NOW
          <div className="bg-white rounded-full border border-white h-5 w-5 flex items-center justify-center cursor-pointer">
            <FaArrowRightLong size={8} className="text-black" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default NewCollection;
