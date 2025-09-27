import CategoriesCard from "./CategoriesCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const categories = [
  {
    name: "Tshirts",
    imgUrl:
      "https://www.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/d-i-o/Tshirts/Women/tshirt_hs_oversized_women_pat_d28_o.jpg&resizeTo=600",
    id: 1,
    items: 10,
  },
  {
    name: "Shirts",
    imgUrl:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/white_shirt_for_women.jpg?v=1656397243",
    id: 2,
    items: 12,
  },
  {
    name: "Jeans",
    imgUrl:
      "https://assets.ajio.com/medias/sys_master/root/20240801/36gh/66ab8b171d763220fa541f12/-473Wx593H-700039187-blue-MODEL.jpg",
    id: 3,
    items: 5,
  },
  {
    name: "Party",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL-QfME81d9nCvxhA_kmF1VG1pRVp0yMbdSA&s",
    id: 4,
    items: 15,
  },
  {
    name: "Ethnic",
    imgUrl:
      "https://ambraee.com/cdn/shop/products/Project_20230411_0452.jpg?v=1691230442",
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
