import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import AverageRatingStars from "../components/AverageRatingStars";
import SizeChart from "../components/SizeChart";
import { FiPlus, FiMinus } from "react-icons/fi";
import ReviewsAndRatings from "../components/ReviewsAndRatings";
import SimilarProducts from "../components/SimilarProducts";

const DisplayProduct = () => {
  const [images, setImages] = useState([
    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPUmE2py_1PUvhgFq_lN6W-sg1l8e10CjVmmm-P39mspIp2L48OuViUNmon_7TFIwp8LFtK7iUFafEBWzB_ZeumfxP001jxIj5TXJb_G4",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMh65ciTKPdoz-NFXRzic15kwYRan6pAq-Se9YOVYq7UTeXyIgbJ_g9iFiASTX6HWyOuI5WGAF5t7NKWFbZG0GOmdN2nOLUzmK_DcleMiW3HB1KqrvoCDW",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS2jcnY7PcEkn8joEu831XRmVLH6VJ5fvFZbM-hHducbSzs7MuEqhPGbDGJgWjVYw7wRZCbGQkeDWXoYES2q1skexetEgsS4CDNjHQiz58",
    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSK83sklFfbBE0XXIujdLTp7ZKp8tBNIrleSO0c1lU7pg396vsP-gRlyh1iRLOi88gEDNgjgRjRtkKwX2WJFsieaDi4viNxwy9pYMaX5iLNsfkEPh95PlFr",
  ]);
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

  const prevClick = () => {
    if (currIndex > 0) setCurrIndex((prev) => prev - 1);
  };

  const nextClick = () => {
    if (currIndex < images?.length - 1) setCurrIndex((prev) => prev + 1);
  };

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
            {images?.map((d, index) => (
              <div className="relative">
                <img
                  src={d}
                  alt="jacket"
                  key={index}
                  className="md:h-[120px] h-[90px] md:w-[100px] w-[60px] rounded-md cursor-pointer"
                  onClick={() => setCurrIndex(index)}
                />
                {/* overlay */}
                {currIndex === index && (
                  <div className="absolute bg-black/50 md:h-[120px] h-[90px] md:w-[100px] w-[60px] rounded-md top-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="w-full md:mt-0 mt-5">
          <span className="text-[30px] font-bold">Blazer Jacket</span>
          {/* avg rating */}
          <div className="mt-1">
            <AverageRatingStars value={4} total={5} ratingNo={54} />
          </div>
          {/* price */}
          <p className="text-[25px] font-bold mt-3">Rs. 2000</p>
          {/* available size */}
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

          {/* available color */}
          <div className="flex items-start mt-4">
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
          </div>

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
                    setQuantity((prev) => (prev < 6 ? prev + 1 : prev))
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
                  className={`transition-all duration-500 ease-in-out overflow-hidden mt-1 mb-2 ${
                    showMore ? "max-h-[1000px]" : "max-h-[80px]"
                  }`}
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Totam ratione harum sapiente beatae accusamus fugiat
                    quibusdam molestiae rem sint delectus labore unde in
                    voluptatibus eius odio, aliquam nesciunt dolores voluptate
                    ipsum omnis quos neque odit sit. Rem autem cumque odit
                    corrupti laboriosam eveniet error iure molestiae? Ex maxime
                    iure dicta. Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Quae temporibus fugiat numquam provident
                    at, perferendis dolorem repellendus hic? Officia rem, fugiat
                    beatae odio distinctio doloribus similique alias aperiam
                    iste accusantium repellendus, obcaecati perspiciatis quis,
                    rerum ea corrupti delectus quisquam sint numquam! Tenetur
                    officiis quas saepe rem, reiciendis similique aperiam culpa?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Atque quidem quasi dolore nihil rem sed at debitis error
                    suscipit, maiores unde ut perspiciatis pariatur molestiae
                    officiis neque! Tempore a ducimus unde placeat sapiente
                    pariatur veritatis aliquam, fugiat minus quidem vitae enim
                    itaque temporibus mollitia corporis eligendi? Magnam totam
                    blanditiis officia eaque similique distinctio dicta, ad
                    consectetur quam nisi molestiae maiores dignissimos
                    laboriosam iste vel ipsum ipsa. Nesciunt harum sint quas
                    minus quasi quia necessitatibus, ex non labore, quo
                    accusantium? Consequuntur sunt cupiditate expedita deleniti
                    temporibus cumque, possimus deserunt? Atque porro vero quia,
                    doloribus est ratione aperiam adipisci illum voluptate
                    repudiandae.
                  </p>
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
        <SimilarProducts />
      </div>
    </>
  );
};

export default DisplayProduct;
