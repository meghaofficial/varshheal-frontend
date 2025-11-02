import { TbDots } from "react-icons/tb";
import { LuArrowUp } from "react-icons/lu";

const SmallUpperBoxes = () => {
  return (
    <div className="p-4 w-1/4 bg-white rounded shadow shadow-gray-200 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Total Sales</span>
        <TbDots size={25} className="cursor-pointer" />
      </div>
      <span className="text-[25px] mb-1">$34.456.00</span>
      <div className="flex items-center gap-2">
        <div className="bg-green-100/90 text-green-700 rounded p-1 flex items-center justify-center w-fit pe-2">
          <LuArrowUp size={20} />
          <span>14%</span>
        </div>
        <span className="text-gray-400 text-sm">in the last month</span>
      </div>
    </div>
  );
};

export default SmallUpperBoxes;