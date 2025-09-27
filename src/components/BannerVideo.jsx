import { useNavigate } from "react-router-dom";

const BannerVideo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[540px] overflow-hidden cursor-pointer"
      onClick={() => navigate("/shop")}
    >
      <video
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover z-0"
      ></video>
      <p className="playfair absolute z-9 text-[50px] hover:underline cursor-pointer bottom-10 right-10 select-none">
        Shop Now
      </p>
    </div>
  );
};

export default BannerVideo;
