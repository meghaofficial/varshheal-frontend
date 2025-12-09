import { FaInstagram } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();

  return (
    <footer className={`bg-[#0c0c0c] text-white flex md:flex-row flex-col ${location.pathname.includes("collections") ? 'md:mt-20' : 'md:mt-30'}`}>
      {/* left */}
      <div className="md:border-r border-[#181818] md:w-[60%] w-full">
        {/* top */}
        <div className="border-b border-[#181818] md:p-10 p-6">
          <p className="playfair text-[30px]">Need Help?</p>
          <p className="mt-2" style={{ fontWeight: 100 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            pariatur neque fugiat consequuntur nam aut, impedit doloremque optio
            id alias veritatis, ratione dolores temporibus vero aspernatur in
            iusto similique numquam.
          </p>
        </div>
        {/* bottom */}
        <div className="md:p-10 p-6 flex md:flex-row flex-col md:gap-0 gap-4 justify-between">
          <div>
            <p>QUICK LINKS</p>
            <div className="flex flex-col gap-1">
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                Home
              </span>
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                Collections
              </span>
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                About
              </span>
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                Contact
              </span>
            </div>
          </div>
          <div>
            <p>QUICK LINKS</p>
            <div className="flex flex-col gap-1">
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                Help
              </span>
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                Cart
              </span>
              <span
                className="cursor-pointer hover:underline text-[14px]"
                style={{ fontWeight: 100 }}
              >
                My Orders
              </span>
            </div>
          </div>
          <div>
            <p className="mb-1">FOLLOW US</p>
            <FaInstagram className="cursor-pointer" size={20} />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="md:w-[40%] flex flex-col md:items-center md:px-0 px-6 md:mb-0 mb-6 justify-center">
        <div>
          <p className="text-[20px]">CONTACT US</p>
          <div className="bg-white relative rounded-full w-[250px] mt-3">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="h-full w-full outline-none p-4 text-[13px] rounded-full text-black"
            />
            <button className="bg-[#f89d8e] rounded-full absolute right-1 h-10 w-10 top-1 flex items-center justify-center cursor-pointer">
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        <img src="/images/vector.png" alt="vector" className="h-[220px] text-center relative md:block hidden -bottom-10" />
      </div>
    </footer>
    // <footer className="bg-[#b19882] text-white py-10 px-6">
    //   <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
    //     {/* Left section */}
    //     <div className="flex flex-col gap-3">
    //       <p className="text-sm">© 2021 Unwind Home</p>
    //       <p className="text-sm">
    //         Need to get in touch? Just email us at{" "}
    //         <a
    //           href="mailto:hello@unwindhome.com"
    //           className="underline hover:text-gray-200"
    //         >
    //           hello@unwindhome.com
    //         </a>
    //       </p>
    //     </div>

    //     {/* Explore */}
    //     <div>
    //       <h4 className="uppercase text-sm font-semibold mb-3">Explore</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li className="hover:underline cursor-pointer">Shop</li>
    //         <li className="hover:underline cursor-pointer">New In</li>
    //         <li className="hover:underline cursor-pointer">About Us</li>
    //         <li className="hover:underline cursor-pointer">Stories</li>
    //       </ul>
    //     </div>

    //     {/* Help */}
    //     <div>
    //       <h4 className="uppercase text-sm font-semibold mb-3">Help</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li className="hover:underline cursor-pointer">FAQs + Shipping</li>
    //         <li className="hover:underline cursor-pointer">Contact</li>
    //         <li className="hover:underline cursor-pointer">Terms</li>
    //         <li className="hover:underline cursor-pointer">Trade</li>
    //       </ul>
    //     </div>

    //     {/* Socials */}
    //     <div className="flex sm:justify-start lg:justify-end items-start gap-4">
    //       <a href="#" className="hover:opacity-80">
    //         <Facebook size={18} />
    //       </a>
    //       <a href="#" className="hover:opacity-80">
    //         <Instagram size={18} />
    //       </a>
    //       <a href="#" className="hover:opacity-80">
    //         <Twitter size={18} />
    //       </a>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;
