import { Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Colors = ({ color, tick, setSelectedColors, index, setPrms }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColors = searchParams.getAll("color"); // array

  const toggleColor = (color) => {
  const currentColors = searchParams.getAll("color");

  if (currentColors.includes(color)) {
    // REMOVE color
    const updated = currentColors.filter(c => c !== color);
    searchParams.delete("color");
    updated.forEach(c => searchParams.append("color", c));
  } else {
    // ADD color
    searchParams.append("color", color);
  }

  setSearchParams(searchParams);
};


  return (
    <div
      className="h-6 w-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-gray-300"
      style={{ background: color }}
      onClick={() => {
        setSelectedColors((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, isSelected: !item.isSelected } : item
          )
        );
        // setPrms((prev) => {
        //   const newColor = color.trim().toLowerCase();
        //   if (!newColor) return prev;

        //   const exists = prev.color?.includes(newColor);

        //   return {
        //     ...prev,
        //     color: exists
        //       ? prev.color.filter((c) => c !== newColor) // remove
        //       : [...(prev.color || []), newColor], // add
        //   };
        // });
        toggleColor(color);
      }}
    >
      {tick && <Check className={`${color === '#fff' || color === '#ffffff' || color === 'white' ? 'text-black' : 'text-white'}`} size={15} />}
    </div>
  );
};

export default Colors;
