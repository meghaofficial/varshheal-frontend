import { FaArrowRightLong } from "react-icons/fa6";
import Card from "../small/Card";
import { FaPlay } from "react-icons/fa";


const NewBanner = () => {
  return (
    <div className="flex md:flex-row flex-col">
      {/* left */}
      <div className="w-1/2 md:flex hidden items-center justify-center relative">
        {/* upper line indicator */}
        <div className="absolute w-full top-32 left-12">
          <div className="w-[120px]  flex flex-col gap-2">
            <p className="font-bold text-right text-nowrap">GENUINE LEATHER</p>
            <p className="text-[#464646] text-right">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#464646] absolute left-32 top-1"></div>
          <div className="w-[100px] h-[0.5px] bg-[#464646] absolute top-2 left-33"></div>
        </div>

        {/* img with shadow */}
        <div className="relative">
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-6 bg-black blur-xl rounded-full"></div>
          <img src="/images/bag.png" alt="bag" className="z-10 h-[500px]" />
        </div>

        {/* button in circle */}
        <div className="bg-[#d7cecd]/50 rounded-full h-36 w-36 flex items-center justify-center absolute right-32 bottom-32 cursor-pointer group">
          <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M150,150 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0"
              />
            </defs>

            <text fill="black" fontSize="18" letterSpacing="4">
              <textPath href="#circlePath" startOffset="0">
                Elegant and Stylish Handbags • Elegant and Stylish Handbags •
              </textPath>
            </text>
          </svg>
          <div className="bg-[#282828] rounded-full text-white p-7">
            <FaArrowRightLong
              size={25}
              className="duration-300 ease-in-out scale-100 transition-all group-hover:scale-130"
            />
          </div>
        </div>

        {/* lower line indicator */}
        <div className="absolute w-full -bottom-6 left-12">
          <div className="w-[120px] absolute right-4 bottom-4 ">
            <p className="text-[#464646]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#464646] absolute right-36 -top-16"></div>
          <div className="w-[150px] h-[0.5px] bg-[#464646] absolute -top-15 right-36"></div>
          <div className="w-[0.5px] h-[40px] bg-[#464646] absolute -top-[99.5px] left-[313px]"></div>
        </div>
      </div>

      {/* right */}
      <div className="md:w-1/2 flex relative flex-col md:py-10 py-6 md:px-0 px-8">
        <div className="font-bold text-[60px]/18">
          <p>Elevate your</p>
          <p>Style Game!</p>
        </div>
        <div className="md:absolute left-30 top-50 text-[20px] md:mt-0 mt-5">
          <p>"Quality That</p>
          <p className="underline cursor-pointer">
            <span className="text-[#cc625b]">Speaks</span> for itself"
          </p>
        </div>
        {/* shop now */}
        <div className="md:absolute top-70 left-30 flex items-center gap-6 md:mt-0 mt-5">
          <button className="bg-black text-white rounded-lg py-3  tracking-wide px-6 cursor-pointer">
            Show Now
          </button>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-[#dddddd] p-3 flex items-center justify-center cursor-pointer">
              <FaPlay />
            </div>
            <span className="">Watch Video</span>
          </div>
        </div>

        {/* try now section */}
        <div className="md:absolute bottom-28 left-30 md:w-[80%] md:mt-0 mt-12">
          <div className="flex items-center gap-2">
            <span className=" text-nowrap">TRY NOW</span>
            <div className="flex items-center">
              <div className="w-[200px] bg-black rounded-full h-[2px]"></div>
              <FaArrowRightLong strokeWidth={3} className="ml-[-2px]" />
            </div>
          </div>
          <div className="overflow-x-auto flex items-center gap-4 md:absolute top-10 w-full py-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <Card />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
