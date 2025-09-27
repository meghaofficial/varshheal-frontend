const CategoriesCard = ({ category, index }) => {
  return (
    <div className="border w-full border-gray-300 cursor-pointer hover:shadow-md shadow-[#0000004e]">
      <img
        src={category?.imgUrl}
        alt="category"
        className="w-full h-[380px] object-cover"
      />
      <div className="text-sm flex items-center justify-between py-3 px-2">
        {index + 1 > 9 ? (
          <span className="text-nowrap heading font-extrabold">
            {index + 1}. {category?.name}
          </span>
        ) : (
          <span className="text-nowrap heading font-extrabold">
            0{index + 1}. {category?.name}
          </span>
        )}
        <span className="text-orange-400">{category?.items} items</span>
      </div>
    </div>
  );
};

export default CategoriesCard;
