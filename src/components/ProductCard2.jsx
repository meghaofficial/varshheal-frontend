import dress from "../assets/dress.png";
import { MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard2 = ({ detail }) => {
  return (
    <div className="rounded-[20px] shadow shadow-gray-300 p-4 relative overflow-hidden max-w-[200px] cursor-pointer group">
      {/* semicircle */}
      {/* if you want to use it then use the images as without background */}
      {/* <div className="bg-[#ae9996]/50 h-[200px] w-[200px] absolute rounded-full -top-15 group-hover:-top-10 -right-15 group-hover:-right-10 z-0 duration-300 transition-all scale-[80%] group-hover:scale-[100%]"></div> */}
      <img
        src={detail?.images?.img1}
        alt="dress"
        className="md:h-[200px] w-[200px] object-cover z-9 relative duration-300 transition-all scale-[100%] group-hover:scale-[120%]"
      />
      {/* -top-3 */}
      <p className="text-center relative top-6 font-semibold font-serif text-sm">
        {detail?.name}
      </p>
      {/* star and price */}
      <div className="flex items-center justify-between outfit mt-7">
        <div className="flex items-center gap-1">
          <span className="text-sm">4.5</span>
          <MdStarRate className="text-yellow-500" />
        </div>
        {/* <del className="text text-[10px]">Rs. {detail?.price}</del> */}
        <span className="font-semibold text-[15px]">Rs. {detail?.price}</span>
      </div>
      {/* buy now & add to cart */}
      <Link
        to={`/shop/${detail?.sku}`}
        className="bg-[#AE9896] rounded-full cursor-pointer py-1.5 w-full flex items-center justify-center hover:text-white mt-2"
      >
        Buy Now
      </Link>
    </div>
  );
};

export default ProductCard2;
