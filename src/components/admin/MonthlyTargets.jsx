import { IoEllipsisVertical } from "react-icons/io5";
import SemiCircleProgress from "./SemiCircleProgress";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

const MonthlyTargets = () => {
  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold">
            Top Selling Products
          </span>
          <IoEllipsisVertical className="cursor-pointer" />
        </div>
        <span className="text-gray-500 text-sm">
          Target you've set for each month
        </span>
      </div>
      {/* lower content */}
      <div className="mt-4 px-4">
        <SemiCircleProgress value={20} />
        <p className="text-gray-500 text-sm text-center my-5">
          You earn $3267 today, its higher than last month keep up your good
          trends!
        </p>
        <div className="h-[1px] w-full bg-gray-200"></div>
        {/* target/revenue/today */}
        <div className="flex items-center justify-evenly py-4">
          {/* target */}
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Target</span>
            <div className="flex items-center">
              <span>$25k</span>
              <LuArrowDown className="text-red-500" />
            </div>
          </div>
          {/* revenue */}
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Revenue</span>
            <div className="flex items-center">
              <span>$18k</span>
              <LuArrowUp className="text-green-500" />
            </div>
          </div>
          {/* today */}
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Today</span>
            <div className="flex items-center">
              <span>$1.8k</span>
              <LuArrowUp className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTargets;