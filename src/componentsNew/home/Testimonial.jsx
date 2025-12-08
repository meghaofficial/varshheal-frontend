import { useEffect, useState } from "react";
import {
  TiStarOutline,
  TiStarHalfOutline,
  TiStarFullOutline,
} from "react-icons/ti";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([
    {
      profile:
        "https://hips.hearstapps.com/hmg-prod/images/single-women-happier-than-men-675ac891b545d.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=640:*",
      name: "Merry Anderson",
      rating: 4,
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    },
    {
      profile:
        "https://hips.hearstapps.com/hmg-prod/images/single-women-happier-than-men-675ac891b545d.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=640:*",
      name: "John Doe",
      rating: 4,
      message:
        "ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum  ",
    },
    {
      profile:
        "https://hips.hearstapps.com/hmg-prod/images/single-women-happier-than-men-675ac891b545d.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=640:*",
      name: "David Cruise",
      rating: 4,
      message:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    },
  ]);
  const [index, setIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  const SLIDE_TIME = 5000;

  useEffect(() => {
    let raf;
    let start = Date.now();

    const animate = () => {
      const pct = ((Date.now() - start) / SLIDE_TIME) * 100;
      setProgress(pct);

      if (pct >= 100) {
        setIndex((prev) => (prev + 1) % testimonials.length);
        start = Date.now();
        setProgress(0);
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  return (
    <div className="md:px-25 flex items-center justify-center relative">
      <p className="playfair text-[40px] absolute top-3 px-8 md:block hidden">What customers say?</p>
      <img
        src="/images/testimonialBag.jpg"
        alt="testimonial"
        className="h-[300px] relative left-10 mt-10 md:block hidden"
      />
      <div className="bg-[#feeaea] md:px-25 rounded-r-md md:h-[450px] md:py-0 py-10 pb-20 w-full flex px-8 justify-center flex-col">
        <p className="playfair text-[25px]/9">
          You can help us to improve our productivity
        </p>

        <p className="text-[#c2c2c2] text-[12px] mt-4">
          {testimonials?.[index]?.message}
        </p>
        <div className="mt-8 flex items-center">
          <img
            src={testimonials?.[index]?.profile}
            alt="profile1"
            className="rounded-full h-10 w-10"
          />
          <div className="flex flex-col ms-4">
            <span className="font-bold text-[12px]">{testimonials?.[index]?.name}</span>
            <div className="flex items-center mt-1">
              <TiStarFullOutline className="text-[#ffc833]" />
              <TiStarFullOutline className="text-[#ffc833]" />
              <TiStarFullOutline className="text-[#ffc833]" />
              <TiStarHalfOutline className="text-[#ffc833]" />
              <TiStarOutline className="text-[#ffc833]" />
            </div>
          </div>
        </div>

        {/* indicators */}
        <div className="flex gap-3 absolute bottom-10 right-35">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className="w-12 h-[2px] bg-white overflow-hidden rounded"
            >
              <div
                className="h-full bg-[#c27964] transition-all duration-200 ease-linear"
                style={{ width: i === index ? `${progress}%` : "0%" }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
