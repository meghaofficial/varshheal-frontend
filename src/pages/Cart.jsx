import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-[550px] flex p-8">
      {/* left */}
      <div className="p-8 w-[70%]">
        {/* header */}
        <div className="flex items-center justify-between p-2 pb-4 border-b border-gray-300">
          <span className="text-[25px] font-semibold">Shopping Cart</span>
          <span className="text-[20px] font-semibold">3 Items</span>
        </div>
        {/* self made table */}
        <div className="mt-5">
          <div className="text-gray-500 text-[10px] flex items-center justify-center">
            <span className="min-w-[40%] ps-3">PRODUCT DETAILS</span>
            <span className="min-w-[20%] text-center">QUANTITY</span>
            <span className="min-w-[20%] text-center">PRICE</span>
            <span className="min-w-[20%] text-end pe-3">TOTAL</span>
          </div>
          {/* details */}
          <div className="max-h-[300px] overflow-y-auto mt-5 flex flex-col gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center">
                {/* product */}
                <div className="min-w-[40%] ps-3 flex gap-3">
                  <img
                    src="https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/productimage/2021/4/5/cc515fe2-8a0b-48ab-98c0-ea446b77b4f01617600056575-1.jpg"
                    alt="jwellery"
                    className="h-[60px] w-[60px]"
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-[14px]">Pendant</span>
                    <span className="text-gray-500 text-[12px]">Jwellery</span>
                    <span className="text-red-500 cursor-pointer text-[10px] ">
                      Remove
                    </span>
                  </div>
                </div>
                {/* quantity */}
                <div className="min-w-[20%] flex items-center justify-center text-xs">
                  <div
                    className="h-6 w-6 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    <FiMinus />
                  </div>
                  <div className="h-6 w-6 flex items-center justify-center border-y-2">
                    {quantity}
                  </div>
                  <div
                    className="h-6 w-6 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
                    onClick={() =>
                      setQuantity((prev) => (prev < 6 ? prev + 1 : prev))
                    }
                  >
                    <FiPlus />
                  </div>
                </div>
                {/* price */}
                <span className="min-w-[20%] text-center text-sm">
                  Rs. 3000
                </span>
                {/* total */}
                <span className="min-w-[20%] text-end pe-3 text-sm">
                  Rs. 3000
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-10">
            <MoveLeft />
            <Link to="/shop">Continue Shopping</Link>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="bg-[#F6F6F6] p-8 w-[30%]">
        {/* header */}
        <div className="flex items-center justify-between p-2 pb-4 border-b border-gray-300">
          <span className="text-[25px] font-semibold">Order Summary</span>
        </div>
        <div className="mt-5 text-sm flex items-center justify-between">
            <span>ITEMS &nbsp; 3</span>
            <span>Rs. 3999</span>
        </div>
        <div className="mt-5 text-sm flex items-center justify-between">
            <span>SHIPPING</span>
            <span>Rs. 500</span>
        </div>
        <div className="mt-5 text-sm">
            <p>PROMO CODE</p>
            <input type="text" className="p-3 text-sm bg-white outline-none w-full mt-2" placeholder="Enter your code" />
        </div>
        <button className="w-fit text-sm hover:bg-black hover:text-white border px-3 py-1 cursor-pointer mt-4">Submit</button>
        <div className="border-b border-gray-300 mt-5"></div>
        <div className="mt-5 text-sm flex items-center justify-between">
            <span>TOTAL COST</span>
            <span>Rs. 4499</span>
        </div>
        <button className="w-full text-sm hover:bg-[#AE9896] hover:text-white border px-3 py-2 cursor-pointer mt-5">CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
