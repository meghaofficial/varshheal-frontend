import React from "react";

const Banner = () => {
  const videos = [
    "/videos/vd1.mp4",
    "/videos/vd2.mp4",
    "/videos/vd3.mp4",
    "/videos/vd4.mp4",
    "/videos/vd5.mp4",
  ];

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* VIDEOS ROW */}
      <div className="absolute inset-0 flex">
        {videos.map((src, idx) => (
          <video
            key={idx}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="
              h-full 
              object-cover 
              w-[20%] 
              min-w-[15%] 
              opacity-80
              transition-all duration-500
            "
          />
        ))}
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h1>

        <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-200">
          Secure, modern, stylish — trusted by thousands of homeowners.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="#shop"
            className="px-6 py-3 bg-white/20 hover:bg-white/30 font-semibold"
          >
            Shop Now
          </a>

          {/* <a
            href="#learn"
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold backdrop-blur-md"
          >
            Learn More
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
