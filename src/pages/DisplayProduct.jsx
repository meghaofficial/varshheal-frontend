import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import AverageRatingStars from "../components/AverageRatingStars";
import SizeChart from "../components/SizeChart";
import { FiPlus, FiMinus } from "react-icons/fi";
import ReviewsAndRatings from "../components/ReviewsAndRatings";
import SimilarProducts from "../components/SimilarProducts";
import axiosPrivate from "../utils/axiosPrivate";
import { useParams } from "react-router-dom";

const DisplayProduct = () => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [colorsList, setColorsList] = useState([
    "black",
    "purple",
    "gray",
    "blue",
  ]);
  const [selectedColor, setSelectedColor] = useState(colorsList[0]);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const { sku } = useParams();
  const [detail, setDetail] = useState(null);
  const [similar, setSimilar] = useState([]);

  const prevClick = () => {
    if (currIndex > 0) setCurrIndex((prev) => prev - 1);
  };

  const nextClick = () => {
    if (currIndex < images?.length - 1) setCurrIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const handleGetDetails = async () => {
      try {
        const res = await axiosPrivate.get(`/get-product-details/${sku}`);

        setDetail(res?.data?.details);
        const imgs = [
          res?.data?.details?.images?.img1,
          res?.data?.details?.images?.img2 && res?.data?.details?.images?.img2,
          res?.data?.details?.images?.img3 && res?.data?.details?.images?.img3,
          res?.data?.details?.images?.img4 && res?.data?.details?.images?.img4,
        ];
        setImages(imgs);
      } catch (error) {
        console.error(error);
      }
    };

    handleGetDetails();
  }, [sku]);

  useEffect(() => {
    if (!detail?._id) return; 

    const handleGetSimilarProducts = async () => {
      try {
        const res = await axiosPrivate.get(`/similar-products/${detail._id}`);
        setSimilar(res.data.similar);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    handleGetSimilarProducts();
  }, [detail?._id]);

  return (
    <>
      <div className="p-8 flex md:flex-row flex-col justify-center items-start select-none bg-[#e6ded3]/20">
        {/* left */}
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          {/* main image */}
          <div className="relative h-[450px] md:w-[420px] flex items-center justify-center bg-[#e6ded3]/20 shadow shadow-gray-300 rounded-[10px]">
            {currIndex > 0 && (
              <div
                className="absolute top-1/2 cursor-pointer bg-white w-6 h-6 rounded flex items-center justify-center left-2"
                onClick={prevClick}
              >
                <ChevronLeft />
              </div>
            )}
            <img
              src={images[currIndex]}
              alt="jacket"
              className="h-[450px] w-auto rounded-[10px]"
            />
            {currIndex < images?.length - 1 && (
              <div
                className="absolute right-2 top-1/2 cursor-pointer bg-white w-6 h-6 flex items-center justify-center rounded"
                onClick={nextClick}
              >
                <ChevronRight />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {images?.map(
              (d, index) =>
                d && (
                  <div className="relative" key={index}>
                    <img
                      src={d}
                      alt="jacket"
                      key={index}
                      className="md:h-[120px] object-cover h-[90px] md:w-[100px] w-[60px] rounded-md cursor-pointer"
                      onClick={() => setCurrIndex(index)}
                    />
                    {/* overlay */}
                    {currIndex === index && (
                      <div className="absolute bg-black/50 md:h-[120px] h-[90px] md:w-[100px] w-[60px] rounded-md top-0"></div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        {/* right */}
        <div className="w-full md:mt-0 mt-5">
          <span className="text-[30px] font-bold">{detail?.name}</span>
          {/* avg rating */}
          <div className="mt-1">
            <AverageRatingStars value={4} total={5} ratingNo={54} />
          </div>
          {/* price */}
          <p className="text-[25px] font-bold mt-3">Rs. {detail?.price}</p>
          {/* available size */}
          {detail?.size?.length > 0 && (
            <div className="flex items-start mt-3">
              {/* available size */}
              <div>
                <span className="text-sm">Available Sizes</span>
                <div className="flex items-start gap-2 mt-2 text-sm">
                  <span
                    className={`h-8 min-w-8 flex items-center justify-center ${
                      selectedSize === "S" ? "bg-black text-white" : "border"
                    } rounded cursor-pointer`}
                    onClick={() => setSelectedSize("S")}
                  >
                    S
                  </span>
                  <span
                    className={`h-8 min-w-8 flex items-center justify-center ${
                      selectedSize === "M" ? "bg-black text-white" : "border"
                    } rounded cursor-pointer`}
                    onClick={() => setSelectedSize("M")}
                  >
                    M
                  </span>
                  <span
                    className={`h-8 min-w-8 flex items-center justify-center ${
                      selectedSize === "L" ? "bg-black text-white" : "border"
                    } rounded cursor-pointer`}
                    onClick={() => setSelectedSize("L")}
                  >
                    L
                  </span>
                  <SizeChart />
                </div>
              </div>
            </div>
          )}

          {/* available color */}
          {/* <div className="flex items-start mt-4">
            <div>
              <span className="text-sm">Available Colours</span>
              <div className="flex items-center gap-2 mt-2 text-sm">
                {colorsList?.map((color, index) => (
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-gray-300"
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color)}
                    key={index}
                  >
                    {color === selectedColor && (
                      <Check className="text-white" size={15} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* quantity */}
          <div className="flex items-start mt-4">
            <div>
              <span className="text-sm">Quantity</span>
              <div className="flex items-center mt-2 text-sm">
                <div
                  className="h-8 w-8 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                >
                  <FiMinus />
                </div>
                <div className="h-8 w-8 flex items-center justify-center border-y-2">
                  {quantity}
                </div>
                <div
                  className="h-8 w-8 flex items-center justify-center border-2 hover:bg-black hover:text-white cursor-pointer hover:border-black"
                  onClick={() =>
                    setQuantity((prev) =>
                      prev < detail?.stock ? prev + 1 : prev
                    )
                  }
                >
                  <FiPlus />
                </div>
              </div>
            </div>
          </div>

          {/* description */}
          <div className="flex items-start mt-6">
            <div>
              <span className="font-semibold text-lg">Description</span>
              <div className="text-gray-500 text-sm">
                <div
                  className={`transition-all duration-500 ease-in-out mt-1 mb-2 ${
                    showMore
                      ? "max-h-[1000px] overflow-y-auto"
                      : "max-h-[80px] overflow-y-hidden"
                  }`}
                >
                  {detail?.description?.map((d, index) => (
                    <li key={index} className="list">
                      {d}
                    </li>
                  ))}
                  <div className="text-black">
                    <p className="my-3 font-[500] text-lg">Other Details</p>

                    {/* 6x2 rows without arrays */}
                    <div className="grid grid-cols-2">
                      {detail?.material && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            Material
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            {detail?.material}
                          </div>
                        </>
                      )}

                      {detail?.material && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Capacity (L)
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.capacity}
                          </div>
                        </>
                      )}

                      {detail?.compartment_details && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            Compartment Details
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            {detail?.compartment_details}
                          </div>
                        </>
                      )}

                      {(detail?.dimensions?.length ||
                        detail?.dimensions?.breadth ||
                        detail?.dimensions?.height) && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Dimensions (LxBxH)
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.dimensions?.length} x{" "}
                            {detail?.dimensions?.breadth} x{" "}
                            {detail?.dimensions?.height}
                          </div>
                        </>
                      )}

                      {detail?.closure_type && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            Closure Type
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-white">
                            {detail?.closure_type}
                          </div>
                        </>
                      )}

                      {detail?.fit_type && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Fit Type
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.fit_type}
                          </div>
                        </>
                      )}

                      {detail?.occasion && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Occasion
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.occasion}
                          </div>
                        </>
                      )}
                      {detail?.pattern && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Pattern
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.pattern}
                          </div>
                        </>
                      )}
                      {detail?.strap_type && (
                        <>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            Strap Type
                          </div>
                          <div className="px-4 py-3 border border-gray-100 bg-gray-50">
                            {detail?.strap_type}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {!showMore ? (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </span>
                ) : (
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => setShowMore(false)}
                  >
                    Show Less
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* reviews and ratings */}
      <div className="p-8">
        <ReviewsAndRatings />
      </div>
      {/* related products */}
      <div className="sm:p-8 py-8">
        <SimilarProducts similar={similar} />
      </div>
    </>
  );
};

export default DisplayProduct;
