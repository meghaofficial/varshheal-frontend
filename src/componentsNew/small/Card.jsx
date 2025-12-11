import { FaArrowRightLong } from "react-icons/fa6";

const Card = () => {
  return (
    <div className="bg-[#de6f5e] flex flex-col justify-between relative rounded-[20px] w-[200px] h-[200px]">
    
    <div className="flex items-center justify-between h-full px-4 font-[300]">
      <p className="text-white ">Handbag</p>
      <div className="bg-[#f79e90] rounded-full border border-white h-7 w-7 flex items-center justify-center cursor-pointer">
            <FaArrowRightLong className="text-white" size={12} />
      </div>
    </div>
      <img
        src="/images/withbg.jpg"
        alt="bag"
        className="w-full h-[150px] object-cover rounded-b-[20px]"
      />
    </div>
  );
};


export default Card
