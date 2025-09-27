const Checkout = () => {
  return (
    <>
      <div className="bg-[#F6F6F6] md:p-8 md:w-[30%]">
        {/* header */}
        <div className="flex items-center justify-between md:p-2 p-4 pb-4 border-b border-gray-300">
          <span className="text-[25px] font-semibold">Order Summary</span>
        </div>
        <div className="mt-5 flex items-center justify-between px-4">
          <span>ITEMS &nbsp; 3</span>
          <span>Rs. 3999</span>
        </div>
        <div className="mt-5 flex items-center justify-between px-4">
          <span>SHIPPING</span>
          <span>Rs. 500</span>
        </div>
        <div className="mt-5 px-4">
          <p>PROMO CODE</p>
          <input
            type="text"
            className="p-3 bg-white outline-none w-full mt-2"
            placeholder="Enter your code"
          />
        </div>
        <div className="px-4">
            <button className="w-fit hover:bg-black hover:text-white border px-3 py-1 cursor-pointer mt-4">
          Submit
        </button>
        </div>
        <div className="border-b border-gray-300 mt-5"></div>
        <div className="mt-5 flex items-center justify-between px-4">
          <span>TOTAL COST</span>
          <span>Rs. 4499</span>
        </div>
        <div className="p-4">
            <button className="w-full hover:bg-[#AE9896] hover:text-white border px-3 py-2 cursor-pointer">
          CHECKOUT
        </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
