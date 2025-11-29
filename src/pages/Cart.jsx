import { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MoveLeft, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosPrivate from "../utils/axiosPrivate";

const Cart = () => {
  const [details, setDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getCartDetails = async () => {
    try {
      const res = await axiosPrivate.get("/cart");
      setDetails(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  console.log("details", details);
  // updateCartItem(product._id, 3, { size: "M", color: "Black" });

  return (
    <div className="md:min-h-[550px] md:pb-0 pb-8 flex md:flex-row flex-col md:p-8 bg-[#e6ded3]/20">
      {/* left */}
      <div className="md:p-8 md:w-[70%]">
        {/* header */}
        <div className="flex items-center justify-between md:p-2 p-4 pb-4 border-b border-gray-300">
          <span className="md:text-[25px] text-[20px] font-semibold">
            Shopping Cart
          </span>
          <span className="md:text-[20px] text-[20px] font-semibold">
            {details?.totalItems} Items
          </span>
        </div>
        {/* self made table */}
        <div className="mt-5">
          <div className="text-gray-500 text-[10px] md:flex hidden items-center justify-center">
            <span className="min-w-[40%] ps-3">PRODUCT DETAILS</span>
            <span className="min-w-[20%] text-center">QUANTITY</span>
            <span className="min-w-[20%] text-center">PRICE</span>
            <span className="min-w-[20%] text-end pe-3">TOTAL</span>
          </div>

          {/* details for lg screen */}
          <div className="md:max-h-[300px] overflow-y-auto mt-5 md:flex hidden flex-col gap-6">
            {details?.items?.map((d, index) => (
              <DetailForLg index={index} d={d} />
            ))}
          </div>
          {/* details for sm screen */}
          <div className="overflow-y-auto mt-5 md:hidden flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-5 cursor-pointer"
              >
                <div className="flex justify-between items-baseline w-full">
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/productimage/2021/4/5/cc515fe2-8a0b-48ab-98c0-ea446b77b4f01617600056575-1.jpg"
                      alt="jwellery"
                      className="h-[150px] min-w-[150px]"
                    />
                    <div className="w-full">
                      <p className="">
                        Lorem, ipsum ieuhf e iuh ih ihii ni ii ioni i...
                      </p>
                      {/* quantity */}
                      <div className="flex items-center my-2 text-xs">
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
                      <div className="flex gap-2 mt-2">
                        <p className="text-gray-500">Price</p>
                        <p>Rs. 2025</p>
                      </div>
                      {/* total price */}
                      <div className="flex gap-2">
                        <p className="text-gray-500">Total Price</p>
                        <p>Rs. 2025</p>
                      </div>
                    </div>
                  </div>
                  <RiDeleteBin6Line
                    className="text-red-600 cursor-pointer"
                    size={22}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* for lg screen */}
          <div className="md:flex hidden items-center gap-2 mt-10">
            <MoveLeft />
            <Link to="/shop">Continue Shopping</Link>
          </div>
          {/* for sm screen */}
          <div className="md:hidden flex items-center justify-end pe-4 gap-2 mt-10">
            <Link to="/checkout">Checkout</Link>
            <MoveRight />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="bg-[#F6F6F6] md:p-8 md:w-[30%] md:block hidden">
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
          <input
            type="text"
            className="p-3 text-sm bg-white outline-none w-full mt-2"
            placeholder="Enter your code"
          />
        </div>
        <button className="w-fit text-sm hover:bg-black hover:text-white border px-3 py-1 cursor-pointer mt-4">
          Submit
        </button>
        <div className="border-b border-gray-300 mt-5"></div>
        <div className="mt-5 text-sm flex items-center justify-between">
          <span>TOTAL COST</span>
          <span>Rs. 4499</span>
        </div>
        <button className="w-full text-sm hover:bg-[#AE9896] hover:text-white border px-3 py-2 cursor-pointer mt-5">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

const DetailForLg = ({ index, d }) => {
  const [quantity, setQuantity] = useState(1);

  const updateCartItem = async (productId, newQuantity, variant = {}) => {
    try {
      const res = await axiosPrivate.put("/cart/update", {
        productId: productId,
        quantity: newQuantity,
        variant: variant,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={index} className="flex items-center justify-center">
      {/* product */}
      <div className="min-w-[40%] ps-3 flex gap-3">
        <img
          src={d?.product?.images?.img1}
          className="h-[60px] w-[60px] object-cover"
        />
        <div className="flex flex-col justify-evenly">
          <span className="text-[14px]">{d?.product?.name}</span>
          {/* <span className="text-gray-500 text-[12px]">Jwellery</span> */}
          <span className="text-red-500 cursor-pointer text-[10px] ">
            Remove
          </span>
        </div>
      </div>
      {/* quantity */}
      <div className="min-w-[20%] flex items-center justify-center text-xs">
        <div
          className="h-6 w-6 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
          onClick={() => {
            setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
            updateCartItem(d?.product?._id, d?.quantity - 1);
          }}
        >
          <FiMinus />
        </div>
        <div className="h-6 w-6 flex items-center justify-center border-y-2">
          {d?.quantity}
        </div>
        <div
          className="h-6 w-6 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
          onClick={() => {
            setQuantity((prev) => (prev < 6 ? prev + 1 : prev));
            updateCartItem(d?.product?._id, d?.quantity + 1);
          }}
        >
          <FiPlus />
        </div>
      </div>
      {/* price */}
      <span className="min-w-[20%] text-center text-sm">Rs. {d?.price}</span>
      {/* total */}
      <span className="min-w-[20%] text-end pe-3 text-sm">
        Rs. {d?.quantity > 0 ? d?.price * d?.quantity : d?.price}
      </span>
    </div>
  );
};

export default Cart;
