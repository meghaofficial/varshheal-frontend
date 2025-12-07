import MainAdvertisement from "../components/MainAdvertisement";
import PopularCategories from "../components/PopularCategories";
import LatestOfferComp from "../components/LatestOfferComp";
import Button from "../components/Button";
import BannerSlider from "../components/BannerSlider";
import BannerVideo from "../components/BannerVideo";
import Loader from "../components/Loader";
import { toastError, toastSuccess } from "../utils/toast";
import Banner from "./Banner";
import NewBanner from "../componentsNew/NewBanner";
import NewCollection from "../componentsNew/NewCollection";
import BagBranding from "../componentsNew/BagBranding";
import DiscountSection from "../componentsNew/DiscountSection";
import NeedUs from "../componentsNew/NeedUs";
import Testimonial from "../componentsNew/Testimonial";

const Home = () => {
  return (
    <div className="bg-[#ffffff]" style={{ fontFamily: "Helvetica" }}>
      <NewBanner />

      {/* Checkout our new collection */}
      <div className="md:mt-70 mt-16">
        <NewCollection />
      </div>

      {/* Bag branding */}
      <div className="md:mt-50 mt-16">
        <BagBranding />
      </div>

      {/* discount section */}
      <div className="md:mt-40 mt-16">
        <DiscountSection />
      </div>

      {/* need us section */}
      <div className="md:mt-40 mt-16">
        <NeedUs />
      </div>

      {/* customers says */}
      <div className="md:mt-40 mt-16">
        <Testimonial />
      </div>

      {/* <MainAdvertisement /> */}
      {/* <BannerSlider /> */}
      {/* <Banner /> */}
      {/* <BannerVideo /> */}

      {/* remember your last one */}
      {/* <div className="bg-gradient-to-r from-[#faf9f7] to-transparent w-full relative h-[300px] md:block hidden mt-20">
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
            src="https://res.cloudinary.com/dmheb1ryv/image/upload/v1763739398/WhatsApp_Image_2025-09-28_at_11.16.40_279adb8a_ypuc9g.jpg"
            alt="dress"
            className="h-[300px] w-[220px] rounded-b-full z-[9]"
          />
          <div className="bg-[#ae9996] h-[300px] w-[220px] rounded-b-full absolute top-3 left-3 -z-1"></div>
        </div>
      </div> */}
      {/* remember your last one for smaller screens */}
      {/* <div className="bg-gradient-to-r from-[#faf9f7] to-transparent w-full relative h-[280px] md:hidden mb-[300px] mt-20">
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
            src="https://res.cloudinary.com/dmheb1ryv/image/upload/v1763739398/WhatsApp_Image_2025-09-28_at_11.16.40_279adb8a_ypuc9g.jpg"
            alt="dress"
            className="h-[300px] w-[220px] rounded-b-full z-[9]"
          />
          <div className="bg-[#ae9996] h-[300px] w-[220px] rounded-b-full absolute top-3 left-3 -z-1"></div>
        </div>
      </div> */}

      {/* popular categories */}
      {/* <PopularCategories /> */}

      {/* latest offer */}
      {/* <LatestOfferComp /> */}
    </div>
  );
};

export default Home;
