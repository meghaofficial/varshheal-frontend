import { useEffect, useRef, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";

const orders = [
  {
    id: 1,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/3_16_058f5ddc-d3ae-4fad-8a0b-9d5c6bacf6d2.jpg?v=1753704458&width=1000",
    title: "Bellavita Gift Set 4×20 ml Luxury Scent",
    price: "₹541",
    status: 1,
    statusType: "Delivered",
    date: "Jan 01",
    color: "",
    showColor: false,
    message: "Your item has been delivered",
    orderId: "15102025",
  },
  {
    id: 2,
    image:
      "https://m.media-amazon.com/images/I/718Ot6Op28L._UF894,1000_QL80_.jpg",
    title: "Filsfa 6Piece Stainless Steel Set for Tea",
    price: "₹185",
    status: 0,
    statusType: "Cancelled",
    date: "Nov 16, 2024",
    color: "Silver",
    showColor: true,
    message:
      "Your request a cancellation because you changed your mind about this product",
    orderId: "25102025",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZMkHA_6Z4Oq2u5s7WvrlrRfoDkwgjZxT2Q&s",
    title: "Oliveware Octavia Lunchbox | Microwave Safe",
    price: "₹659",
    status: 1,
    statusType: "Delivered",
    date: "Nov 09, 2024",
    color: "Red",
    showColor: true,
    message: "Your item has been delivered",
    orderId: "35102025",
  },
  {
    id: 4,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/pillow/m/f/y/10-norma-flexi-puff-foam-pillow-pack-of-1-1-norma-flexi-puff-original-imah4xg9ma9hazzp.jpeg?q=90",
    title: "Sleepwell Pillow Set || Comfort And Support",
    price: "₹509",
    status: 0,
    statusType: "Cancelled",
    date: "Nov 09, 2024",
    color: "Blue",
    showColor: true,
    message: "You returned this product",
    orderId: "45102025",
  },
];

const MyOrders = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filterRef = useRef();
  const filterBtnRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sq = searchParams.get("sq");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target)
      ) {
        setOpenFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`search?sq=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <div className="px-6 rounded">
      {/* search & filter */}
      <div className="flex items-center gap-4">
        {/* search */}
        <form className="text-sm w-[90%] flex items-center shadow shadow-gray-300 rounded bg-white" onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full outline-none p-2"
            placeholder="Search your orders here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="submit"
            value="Search Orders"
            className="p-2 cursor-pointer text-white bg-[#B19882] rounded-r px-4"
          />
        </form>
        {/* filter */}
        <div className="relative w-[10%]">
          <div
            className="text-gray-500 hover:text-black bg-white cursor-pointer flex items-center gap-2 border border-gray-200 rounded px-3 py-2 text-sm shadow shadow-gray-300 select-none"
            onClick={() => setOpenFilters((prev) => !prev)}
            ref={filterBtnRef}
          >
            <IoFilterSharp />
            <span>Filters</span>
          </div>
          <div
            className={`absolute top-11 right-0 bg-white shadow shadow-gray-400 rounded text-sm transform transition-all duration-300 origin-top-right text-gray-500 min-w-[150px] ${
              openFilters ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            ref={filterRef}
          >
            <p className="px-3 py-1 pt-2 text-black bg-gray-100 cursor-pointer">
              All
            </p>
            <p className="px-3 py-1 pt-2 hover:text-black hover:bg-gray-100 cursor-pointer">
              Delivered
            </p>
            <p className="px-3 py-1 pb-2 hover:text-black hover:bg-gray-100 cursor-pointer">
              Not Delivered
            </p>
          </div>
        </div>
      </div>
      {/* below orders list */}
      <div className="mx-auto mt-5 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex bg-white hover:shadow cursor-pointer rounded p-4 space-x-4 border border-gray-300"
            onClick={() =>
              navigate(
                `/order_details?order_id=${order.orderId}&item_id=${order.id}`
              )
            }
          >
            <div className="w-[40%] flex items-start gap-5">
              <div className="h-[80px] min-w-[80px]">
                <img
                  src={order?.image}
                  alt={order?.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-sm truncate">{order?.title}</p>
                {order?.color && (
                  <p className="text-[12px] text-gray-500">
                    Color: {order?.color}
                  </p>
                )}
              </div>
            </div>
            <div className="w-[20%] text-sm flex justify-center">
              <p>{order?.price}</p>
            </div>
            <div className="w-[40%]">
              <div className="flex items-start gap-2">
                {/* sign */}
                <div
                  className={`h-2 min-w-2 rounded-full mt-1 ${
                    order?.status === 1 ? "bg-red-400" : "bg-green-400"
                  }`}
                ></div>
                {/* message */}
                <p className="text-[11px] font-[500]">
                  {order?.statusType} on {order?.date}
                </p>
              </div>
              <p className="text-[12px] mt-2 font-[300]">{order?.message}</p>
              {/* rate n review product */}
              <div
                className="text-blue-600 text-sm flex items-center gap-1 group mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <IoMdStar />
                <p className="group-hover:underline">Rate & Review Product</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
