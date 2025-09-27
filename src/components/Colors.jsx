import { Check } from "lucide-react";

const Colors = ({ color, tick, setSelectedColors, index }) => {
  return (
    <div
      className="h-6 w-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-gray-300"
      style={{ background: color }}
      onClick={() =>
        setSelectedColors((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, isSelected: !item.isSelected } : item
          )
        )
      }
    >
      {tick && <Check className="text-white" size={15} />}
    </div>
  )
}

export default Colors
