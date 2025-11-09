import CategoriesCard from "./CategoriesCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const categories = [
  {
    name: "Tshirts",
    imgUrl:
      "",
    id: 1,
    items: 10,
  },
  {
    name: "Shirts",
    imgUrl:
      "",
    id: 2,
    items: 12,
  },
  {
    name: "Jeans",
    imgUrl:
      "",
    id: 3,
    items: 5,
  },
  {
    name: "Party",
    imgUrl:
      "",
    id: 4,
    items: 15,
  },
  {
    name: "Ethnic",
    imgUrl:
      "",
    id: 5,
    items: 8,
  },
];

const PopularCategories = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="md:mt-24 mt-32">
      {/* header */}
      <div className="flex items-center gap-3 select-none px-6">
        <span className="text-[25px] text-nowrap heading font-extrabold mb-2">
          Popular Categories
        </span>
        <div className="bg-gray-300 w-full h-[1px]"></div>
      </div>
      <div className="relative overflow-visible z-0 px-5">
        <Carousel
          responsive={responsive}
          arrows={true}
          infinite={false}
          autoPlay={false}
        >
          {/* {images.map((img, idx) => (
      <div key={idx} className="p-2">
        <img
          src={img}
          alt={`slide-${idx}`}
          className="w-full h-[380px] object-cover rounded"
        />
      </div>
    ))} */}
          {categories.map((cat, index) => (
            <div key={cat.id} className="p-2">
              <CategoriesCard category={cat} index={index} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default PopularCategories;
