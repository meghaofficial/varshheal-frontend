import MonthlyTargets from "../components/admin/MonthlyTargets";
import SmallUpperBoxes from "../components/admin/SmallUpperBoxes";
import { LineChart } from "@mui/x-charts";
import TopSellingProducts from "../components/admin/TopSellingProducts";

const Reports = () => {
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  return (
    <div className="p-4">
      {/* small details */}
      <div className="flex items-center justify-between gap-3">
        <SmallUpperBoxes />
        <SmallUpperBoxes />
        <SmallUpperBoxes />
        <SmallUpperBoxes />
      </div>
      {/* revenue, sales by loc, total sales */}
      <div className="flex items-center justify-between gap-3 mt-3">
        {/* revenue */}
        <div className="w-[50%] bg-white rounded min-h-[300px] shadow shadow-gray-200">
          {/* <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          /> */}
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          />
        </div>
        {/* sales by loc */}
        <div className="w-[25%] bg-white rounded min-h-[300px] shadow shadow-gray-200"></div>
        {/* total sales */}
        <div className="w-[25%] bg-white rounded min-h-[300px] shadow shadow-gray-200"></div>
      </div>
      {/* top selling products, monthly target */}
      <div className="flex justify-between gap-3 mt-3">
        {/* top selling products */}
        <div className="w-[70%] bg-white rounded min-h-[300px] shadow shadow-gray-200 border border-gray-200">
          <TopSellingProducts />
        </div>
        {/* monthly target */}
        <div className="w-[30%] bg-white rounded min-h-[300px] shadow shadow-gray-200">
          <MonthlyTargets />
        </div>
      </div>
    </div>
  );
};

export default Reports;
