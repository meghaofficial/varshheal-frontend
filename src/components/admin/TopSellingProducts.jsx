import { LuExternalLink } from "react-icons/lu";

const TopSellingProducts = () => {
  return (
    <div className="">
      <div className="px-4 py-3 border-b border-gray-200">
        <span className="text-[16px] font-semibold">Top Selling Products</span>
      </div>
      {/* self made table */}
      <div>
        {/* header */}
        <div className="flex items-center px-2 py-3 border-b border-b-gray-200 font-semibold">
          <span className="min-w-[10%] text-center">Rank</span>
          <span className="min-w-[30%] ps-10">Product</span>
          <span className="min-w-[20%] text-center">Category</span>
          <span className="min-w-[20%] text-center">Amount</span>
          <span className="min-w-[10%] text-center">Sold</span>
          <span className="min-w-[10%] text-center">Action</span>
        </div>
        {/* data */}
        <div className="max-h-[245px] overflow-y-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center px-2 py-3 border-b border-b-gray-200 hover:bg-gray-200 cursor-default" key={index}>
              <span className="min-w-[10%] text-center">{index+1}</span>
              <div className="min-w-[30%] flex items-center ps-10 gap-2">
                <img
                  src="https://thehouseofrare.com/cdn/shop/products/IMG_0015_7796c3fd-360d-4315-a338-fdb5445ec3b7.jpg?v=1739189617"
                  alt="shirt"
                  className="h-10 w-10"
                />
                <span>Shirt</span>
              </div>
              <span className="min-w-[20%] text-center">Abc_Category</span>
              <span className="min-w-[20%] text-center">Rs. 3000</span>
              <span className="min-w-[10%] text-center">35</span>
              <div className="min-w-[10%] cursor-pointer flex items-center justify-center">
                <LuExternalLink />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;