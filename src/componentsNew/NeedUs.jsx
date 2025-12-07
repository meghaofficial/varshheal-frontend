const NeedUs = () => {
  return (
    <div className="md:px-30 md:pe-60 relative flex items-center">
      <div className="md:block hidden">
        <img
          src="/images/bag5.jpg"
          alt="bag"
          className="h-[450px] w-[400px] object-cover md:block hidden"
        />
        <div className="rounded-full shadow-lg p-2 absolute flex items-center gap-3 top-25 left-75 bg-white">
          <img
            src="/images/funky1.jpeg"
            alt="funky1"
            className="h-6 w-6 rounded-full object-cover"
          />
          <span>Is the quality of the bag good❓</span>
        </div>
        <div className="rounded-full shadow-lg p-2 absolute flex items-center gap-3 top-50 left-85 bg-white">
          <img
            src="/images/funky2.webp"
            alt="funky2"
            className="h-6 w-6 rounded-full object-cover"
          />
          <span>Excited for the new arrival❕</span>
        </div>
        <div className="rounded-full shadow-lg p-2 absolute flex items-center gap-3 -bottom-4 left-96 bg-white">
          <img
            src="/images/funky2.webp"
            alt="funky2"
            className="h-6 w-6 rounded-full object-cover"
          />
          <span>More details on discount❕</span>
        </div>
      </div>
      <div className="md:absolute left-1/2 md:pr-55 md:pl-10 px-10">
        <div className="flex items-center gap-2">
          <div className="w-[80px] h-[1px] bg-[#a5a5a5]"></div>
          <span className="text-[#a5a5a5]">NEED US?</span>
        </div>
        <p className="playfair text-[40px]/12">We are here to support you</p>
        <p className="text-[#c2c2c2] text-[13px] mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ea
          saepe deleniti, aliquam molestiae nisi. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Repellat, nesciunt.
        </p>
        {/* for input */}
        <input
          type="text"
          placeholder="Enter your Email"
          className="outline-none p-3 text-[12px] rounded-md border border-[#464646] mt-5 w-60"
        />
        <button className="rounded-md bg-black text-white cursor-pointer px-9 py-2 text-[14px] mt-4">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default NeedUs;
