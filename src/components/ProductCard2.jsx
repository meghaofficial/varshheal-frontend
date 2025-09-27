import dress from "../assets/dress.png";
import { MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard2 = () => {
  return (
    <div className="rounded-[20px] shadow shadow-gray-300 p-4 relative overflow-hidden max-w-[200px] cursor-pointer group">
      {/* semicircle */}
      <div className="bg-[#ae9996]/50 h-[200px] w-[200px] absolute rounded-full -top-15 group-hover:-top-10 -right-15 group-hover:-right-10 z-0 duration-300 transition-all scale-[80%] group-hover:scale-[100%]"></div>
      <img
        src={dress}
        alt="dress"
        className="md:h-[200px] z-9 relative duration-300 transition-all scale-[100%] group-hover:scale-[120%]"
      />
      <p className="text-center relative -top-3 font-semibold font-serif text-sm">
        Red Dress
      </p>
      {/* star and price */}
      <div className="flex items-center justify-between outfit">
        <div className="flex items-center gap-1">
          <span className="text-sm">4.5</span>
          <MdStarRate className="text-yellow-500" />
        </div>
        <span className="font-semibold">$499.5</span>
      </div>
      {/* buy now & add to cart */}
      <Link
        to="/shop/product"
        className="bg-[#AE9896] rounded-full cursor-pointer py-1.5 w-full flex items-center justify-center hover:text-white mt-2"
      >
        Buy Now
      </Link>
    </div>
  );
};

export default ProductCard2;
