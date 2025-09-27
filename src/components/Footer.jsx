import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#b19882] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Left section */}
        <div className="flex flex-col gap-3">
          <p className="text-sm">© 2021 Unwind Home</p>
          <p className="text-sm">
            Need to get in touch? Just email us at{" "}
            <a
              href="mailto:hello@unwindhome.com"
              className="underline hover:text-gray-200"
            >
              hello@unwindhome.com
            </a>
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="uppercase text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Shop</li>
            <li className="hover:underline cursor-pointer">New In</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Stories</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="uppercase text-sm font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">FAQs + Shipping</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">Terms</li>
            <li className="hover:underline cursor-pointer">Trade</li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex sm:justify-start lg:justify-end items-start gap-4">
          <a href="#" className="hover:opacity-80">
            <Facebook size={18} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:opacity-80">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
