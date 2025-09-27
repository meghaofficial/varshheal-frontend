import { useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const RatingFilter = () => {
  const [stars, setStars] = useState([
    { isfilled: false },
    { isfilled: false },
    { isfilled: false },
    { isfilled: false },
    { isfilled: false },
  ]);

  const handleClick = (index) => {
    setStars((prev) =>
      prev.map((star, i) => ({
        ...star,
        isfilled: i <= index, // fill up to clicked star
      }))
    );
  };

  return (
    <div className="flex gap-2">
      {stars.map((s, index) =>
        s.isfilled ? (
          <IoMdStar
            key={index}
            size={22}
            className="cursor-pointer text-yellow-500"
            onClick={() => handleClick(index)}
          />
        ) : (
          <IoMdStarOutline
            key={index}
            size={22}
            className="cursor-pointer"
            onClick={() => handleClick(index)}
          />
        )
      )}
    </div>
  );
};

export default RatingFilter;
