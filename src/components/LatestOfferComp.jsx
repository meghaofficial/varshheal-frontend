import Button from "./Button";

const LatestOfferComp = () => {
  return (
    <div className="sm:mt-30 mt-16 relative flex sm:flex-row flex-col items-center justify-evenly">
      {/* left */}
      <div className="relative w-fit">
        <div className="bg-[#ae9896] h-[400px] w-[280px] rounded-t-full"></div>
        <img
          src="https://www.shoplibas.com/cdn/shop/files/35783_87fdc8c1-e4f0-4a83-9f6f-961e65788a30.jpg?v=1748664133&width=1080"
          alt="dress"
          className="h-[400px] w-[280px] absolute top-5 left-5 rounded-t-full"
        />
        <div className="border border-gray-300 p-2 w-fit absolute -bottom-16 sm:-right-16 -right-10">
          <img
            src="https://cdn.shopify.com/s/files/1/0984/4522/products/panda-women-tshirt-india1.jpg?v=1571500585"
            alt="dress2"
            className="h-[150px] w-[150px]"
          />
        </div>
      </div>
      {/* right */}
      <div className="sm:w-1/2 relative">
        <p className="heading text-[20px] font-bold w-1/2 text-center sm:relative top-0 -left-20 sm:mt-0 mt-12 sm:ms-0 ms-2">Get the Latest Information and Special Offers</p>
        <div className="p-5 sm:shadow-md shadow-gray-300 sm:ms-10 sm:mt-10 mt-4 flex flex-col">
          <p className="text-[#dda268] font-semibold">Join the Shopiku Newsletter</p>
          <p className="sm:text-sm text-gray-500 my-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit, sequi! Modi labore atque excepturi dolor! Eligendi
            necessitatibus, consectetur unde molestiae odit eum perferendis
            harum quibusdam quis reprehenderit saepe ad deserunt nihil officiis
            amet ratione praesentium porro maiores veniam illo est. Ipsum vel
            ipsa sapiente quis quas laborum minus odit tempore.
          </p>
          <input type="text" placeholder="Your email address" className="outline-none border border-gray-300 px-3 py-2 sm:w-1/2 w-[80%] mt-3 mb-4 sm:text-sm" />
          {/* button */}
          <Button classname='text-sm py-1 px-3' name='Subscribe' url='' size={20} />
        </div>
      </div>
    </div>
  );
};

export default LatestOfferComp;
