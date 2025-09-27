import { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Trendy Collections",
    description: "Shop the latest fashion trends now!",
    image: "https://picsum.photos/1600/600?random=1",
    link: "/shop",
  },
  {
    id: 2,
    title: "Big Discounts",
    description: "Grab your favorite products at amazing prices.",
    image: "https://picsum.photos/1600/600?random=2",
    link: "/deals",
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Discover fresh arrivals and bestsellers.",
    image: "https://picsum.photos/1600/600?random=3",
    link: "/new",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full h-[520px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 joliet">
              {slide.title}
            </h2>
            <p className="text-lg text-gray-200 mb-6 poppins">{slide.description}</p>
            <a
              href={slide.link}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Shop Now <FaArrowRight />
            </a>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronRight />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
