import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="px-2 pe-4 py-2 bg-[#e6ded3]">
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo_nav.png" alt="logo" className="h-14" />
        </div>
        {/* middle nav links */}
        <div className="md:flex hidden items-center">
          <Link
            to="/"
            className={`px-4 text-sm cursor-pointer hover:font-semibold w-26 text-center ${
              location.pathname === "/" && "font-semibold"
            }`}
          >
            Home
          </Link>
          <div className="bg-black rounded-full h-3.5 w-[1.2px]"></div>
          <Link
            to="/shop"
            className={`px-4 text-sm cursor-pointer hover:font-semibold w-26 text-center ${
              location.pathname.includes("shop") && "font-semibold"
            }`}
          >
            Shop
          </Link>
          <div className="bg-black rounded-full h-3.5 w-[1.2px]"></div>
          <Link
            to="/about"
            className={`px-4 text-sm cursor-pointer hover:font-semibold w-26 text-center ${
              location.pathname === "/about" && "font-semibold"
            }`}
          >
            About us
          </Link>
          <div className="bg-black rounded-full h-3.5 w-[1.2px]"></div>
          <Link
            to="/contact"
            className={`px-4 text-sm cursor-pointer hover:font-semibold w-26 text-center ${
              location.pathname === "/contact" && "font-semibold"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* side wishlist/cart/my_account */}
        <div className="flex items-center gap-5">
          <div className="relative sm:block hidden cursor-pointer">
            <span className="bg-black text-white rounded-full text-[8px] h-4 w-4 flex items-center justify-center absolute -top-2 -right-2">
              10
            </span>
            <Heart size={16} />
          </div>
          <div
            className="relative sm:block hidden cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <span className="bg-black text-white rounded-full text-[8px] h-4 w-4 flex items-center justify-center absolute -top-2 -right-2">
              10
            </span>
            <ShoppingBag size={16} />
          </div>
          <Link to="/profile" className="sm:block hidden cursor-pointer">
            <User size={16} />
          </Link>
          {/* hamburger for sm screen */}
          <div className="md:hidden block">
            <Menu
              size={20}
              className="cursor-pointer"
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      {/* nav links for smaller screen */}
      <div>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${
            openMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpenMenu(false)} // close when clicking background
        />

        {/* Sliding Panel */}
        <div
          className={`fixed top-0 left-0 w-full overflow-hidden bg-white z-50 transition-all duration-500 shadow-lg ${
            openMenu ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="p-6">
            <div className="relative flex items-center justify-between -top-3">
              <X
                onClick={() => setOpenMenu(false)}
                className="cursor-pointer mb-4 absolute -right-4 top-0.5"
                size={16}
              />
            </div>
            <nav className="flex flex-col gap-4 items-center">
              <div className="sm:hidden flex flex-col gap-4 items-center">
                <Link
                  to="/profile"
                  className="cursor-pointer hover:font-semibold"
                >
                  Profile
                </Link>
                <Link className="cursor-pointer hover:font-semibold">
                  Wishlist
                </Link>
                <Link className="cursor-pointer hover:font-semibold">Cart</Link>
              </div>
              <Link className="cursor-pointer hover:font-semibold">Home</Link>
              <Link className="cursor-pointer hover:font-semibold">
                Elements
              </Link>
              <Link className="cursor-pointer hover:font-semibold">Shop</Link>
              <Link className="cursor-pointer hover:font-semibold">
                About us
              </Link>
              <Link className="cursor-pointer hover:font-semibold">Blog</Link>
              <Link className="cursor-pointer hover:font-semibold">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
