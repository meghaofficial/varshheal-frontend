import MainAdvertisement from "../components/MainAdvertisement";
import PopularCategories from "../components/PopularCategories";
import LatestOfferComp from "../components/LatestOfferComp";
import Button from "../components/Button";
import BannerSlider from "../components/BannerSlider";
import BannerVideo from "../components/BannerVideo";
import Loader from "../components/Loader";
import { toastError, toastSuccess } from "../utils/toast";

const Home = () => {
  return (
    <div className="">
      {/* <MainAdvertisement /> */}
      {/* <BannerSlider /> */}
      <BannerVideo />

      {/* our amazing features */}
      {/* <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-20 gap-5 lg:my-16 my-20 px-4">
        <div
          className="flex lg:flex-row flex-row-reverse items-center gap-5 lg:w-[30%] w-full"
          style={{ justifyContent: "start" }}
        >
          <div className="lg:w-full w-1/2 h-[2px] rounded-full bg-black"></div>
          <span className="text-[20px] text-nowrap heading font-extrabold">
            Our Amazing Feature
          </span>
        </div>
        <div className="border-t border-gray-300 lg:w-[70%] w-full flex md:flex-row flex-col md:items-center justify-center">
          <div className="flex flex-col md:items-center justify-center md:px-6 md:py-0 py-6">
            <span className="text-[16px] text-nowrap heading font-extrabold">
              100% Satisfied Customers
            </span>
            <span className="text-[12px] text-gray-500 md:text-center mt-1">
              Lorem ipsum dolor sit amet consectetur Delectus, consequuntur!
            </span>
          </div>
          <div className="flex flex-col md:items-center justify-center md:border-x md:border-y-0 border-y border-gray-300 md:px-6 py-4">
            <span className="text-[16px] text-nowrap heading font-extrabold">
              Expert Consumer Services
            </span>
            <span className="text-[12px] text-gray-500 md:text-center mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
          <div className="flex flex-col md:items-center justify-center md:px-6 md:py-0 py-6">
            <span className="text-[16px] text-nowrap heading font-extrabold">
              Fast & Free Shipping
            </span>
            <span className="text-[12px] text-gray-500 md:text-center mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
        </div>
      </div> */}

      {/* remember your last one */}
      <div className="bg-gradient-to-r from-[#faf9f7] to-transparent w-full relative h-[300px] md:block hidden mt-20">
        <div className="bg-[#f6f3ee] rounded-r-full h-full w-[300px] p-10"></div>
        <div className="flex flex-col gap-2 absolute top-8 left-[200px] p-10">
          <span className="text-gray-500 text-sm">Remember Your Last One</span>
          <span className="lg:text-[30px] md:text-[20px] text-nowrap heading font-extrabold">
            Gift Ideas That Last Longer
          </span>
          <span className="text-orange-400 text-sm">Sale Up to 50% Off</span>
          <div className="mt-2">
            <Button classname="px-3 py-1 test-sm" name="Let's Go" url="" />
          </div>
        </div>
        <div className="absolute right-7 top-0">
          <img
            src="https://assets.ajio.com/medias/sys_master/root/20250110/0prw/6781372b0431850e0d92746e/-1117Wx1400H-701040430-blue-MODEL.jpg"
            alt="dress"
            className="h-[300px] w-[220px] rounded-b-full z-[9]"
          />
          <div className="bg-[#ae9996] h-[300px] w-[220px] rounded-b-full absolute top-3 left-3 -z-1"></div>
        </div>
      </div>
      {/* remember your last one for smaller screens */}
      <div className="bg-gradient-to-r from-[#faf9f7] to-transparent w-full relative h-[280px] md:hidden mb-[300px] mt-20">
        <div className="bg-[#f6f3ee] rounded-r-full h-full w-[150px] p-10"></div>
        <div className="flex flex-col gap-2 absolute top-0 left-[50px] p-10">
          <span className="text-gray-500 text-sm">Remember Your Last One</span>
          <span className="text-[22px] heading font-extrabold">
            Gift Ideas That Last Longer
          </span>
          <span className="text-orange-400 text-sm">Sale Up to 50% Off</span>
          <div className="mt-2">
            <Button classname="px-3 py-1 test-sm" name="Let's Go" url="" />
          </div>
        </div>
        <div className="absolute right-7 top-[230px]">
          <img
            src="https://assets.ajio.com/medias/sys_master/root/20250110/0prw/6781372b0431850e0d92746e/-1117Wx1400H-701040430-blue-MODEL.jpg"
            alt="dress"
            className="h-[300px] w-[220px] rounded-b-full z-[9]"
          />
          <div className="bg-[#ae9996] h-[300px] w-[220px] rounded-b-full absolute top-3 left-3 -z-1"></div>
        </div>
      </div>

      {/* popular categories */}
      <PopularCategories />

      {/* latest offer */}
      <LatestOfferComp />
    </div>
  );
};

export default Home;
