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
    </div>
  );
};

export default Home;
