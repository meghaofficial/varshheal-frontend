import BagBranding from "../componentsNew/home/BagBranding";
import DiscountSection from "../componentsNew/home/DiscountSection";
import NeedUs from "../componentsNew/home/NeedUs";
import NewBanner from "../componentsNew/home/NewBanner";
import NewCollection from "../componentsNew/home/NewCollection";
import Testimonial from "../componentsNew/home/Testimonial";

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
