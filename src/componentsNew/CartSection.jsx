import { X } from "lucide-react";
import { PiPlus, PiMinus } from "react-icons/pi";
import { FiExternalLink } from "react-icons/fi";

const CartSection = ({ setOpenCart }) => {
  return (
    <div className="md:p-6 px-4 pb-6 overflow-y-auto">
      <div className="md:flex hidden items-center justify-between mb-5">
        <p className="playfair text-[30px]">Your Cart</p>
        <X className="cursor-pointer" onClick={() => setOpenCart(false)} />
      </div>
      {/* list of cart */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <CartItem />
        </div>
      ))}
      <button className="mt-5 w-full bg-black text-white rounded-md py-3 cursor-pointer text-[12px]">CHECK OUT</button>
    </div>
  );
};

function CartItem() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-3 relative">
        <div className="rounded-md border border-[#d1d1d1] p-3 w-full flex items-end gap-3">
          <img
            src="https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/2024/NOVEMBER/21/hEmSpFvs_f89a48b50ab0414299836ab336e02511.jpg"
            alt="bag"
            className="h-[100px] w-[100px] rounded object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-[14px]">Product Title</p>
            <div className="flex items-center gap-2">
              <div className="bg-[#f89d8e] text-white cursor-pointer p-1 rounded-full">
                <PiMinus size={12} />
              </div>
              <span className="text-[12px]">1</span>
              <div className="bg-[#f89d8e] text-white cursor-pointer p-1 rounded-full">
                <PiPlus size={12} />
              </div>
            </div>
            <p className="text-[12px]">
              <span className="font-semibold">Price:</span>{" "}
              <span>Rs. 1200</span>
            </p>
            <p className="text-[12px] -mt-2">
              <span className="font-semibold">Total:</span>{" "}
              <span>Rs. 1200</span>
            </p>
          </div>
        </div>
        <button className="text-red-600 cursor-pointer hover:underline text-[12px] absolute bottom-3 right-3">
          Remove
        </button>
        <FiExternalLink className="cursor-pointer absolute right-3 top-3" />
      </div>
    </>
  );
}

export default CartSection;
