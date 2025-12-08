import React, { useEffect, useState } from "react";

const DiscountSection = ({ initialH = 2, initialM = 2, initialS = 10 }) => {
  const [time, setTime] = useState({
    hrs: initialH,
    mins: initialM,
    secs: initialS,
  });

  const [animateKey, setAnimateKey] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hrs, mins, secs } = prev;

        if (hrs === 0 && mins === 0 && secs === 0) {
          clearInterval(interval);
          return prev;
        }

        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
          if (mins < 0) {
            mins = 59;
            hrs--;
          }
        }

        // trigger animation
        setAnimateKey({
          hrs: hrs,
          mins: mins,
          secs: secs,
        });

        return { hrs, mins, secs };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:px-15 relative md:block hidden">
      <video
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[400px] object-cover z-0"
      ></video>
      <div className="absolute top-0 h-[400px] w-[calc(100%-119.5px)] bg-black/70">
        <p className="text-[50px] cursor-pointer text-white text-center playfair mt-50">
          Get Discount!
        </p>
      </div>
      <div className="bg-[#ffecee] rounded-t absolute bottom-0 h-[120px] w-[calc(100%-119.5px)] flex items-center justify-center gap-4">
        <span className="playfair text-[30px]">Avail Before</span>
        <div className="bg-white rounded shadow-md shadow-black/20 flex items-center justify-center gap-2 px-7 py-2">
          <span className="text-[30px] timer-slide" key={animateKey.hrs}>{String(time.hrs).padStart(2, "0")}</span>
          <span className="text">Hrs</span>
        </div>
        <span className="text-[25px]">:</span>
        <div className="bg-white rounded shadow-md shadow-black/20 flex items-center justify-center gap-2 px-7 py-2">
          <span className="text-[30px] timer-slide" key={animateKey.mins}>{String(time.mins).padStart(2, "0")}</span>
          <span className="text">Min</span>
        </div>
        <span className="text-[25px]">:</span>
        <div className="bg-white rounded shadow-md shadow-black/20 flex items-center justify-center gap-2 px-7 py-2">
          <span className="text-[30px] timer-slide" key={animateKey.secs}>{String(time.secs).padStart(2, "0")}</span>
          <span className="text">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
