import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

const AverageRatingStars = ({ value = 0, total = 5, ratingNo }) => {
  const filledStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const emptyStars = total - filledStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: filledStars }).map((_, index) => (
        <IoMdStar
          size={20}
          key={`star-full-${index}`}
          className="text-yellow-500"
        />
      ))}

      {/* Half star */}
      {hasHalf && (
        <IoMdStarHalf size={20} key="star-half" className="text-yellow-500" />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <IoMdStarOutline
          size={20}
          key={`star-empty-${index}`}
          className="text-gray-400"
        />
      ))}
      {ratingNo && <span className="ms-2 text-sm">{ratingNo}</span>}
    </div>
  );
};

export default AverageRatingStars;
