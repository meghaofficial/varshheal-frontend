import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

   // Motion variants for the sliding panel
  const panelVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "100vh", opacity: 1 },
  };

  // Motion variants for the overlay
  const overlayVariants = {
    hidden: { opacity: 0, pointerEvents: "none" },
    visible: { opacity: 0.5, pointerEvents: "auto" },
  };

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
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenMenu(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              className="fixed top-0 left-0 w-full bg-white z-50 shadow-lg overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="p-6">
                <div className="relative flex items-center justify-end">
                  <X
                    onClick={() => setOpenMenu(false)}
                    className="cursor-pointer"
                    size={24}
                  />
                </div>
                <nav className="flex flex-col gap-4 items-center mt-4">
                  <div className="sm:hidden flex flex-col gap-4 items-center">
                    <Link
                      to="/profile"
                      className="cursor-pointer hover:font-semibold"
                      onClick={() => setOpenMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link to="/wishlist" className="cursor-pointer hover:font-semibold" onClick={() => setOpenMenu(false)}>
                      Wishlist
                    </Link>
                    <Link
                      to="/cart"
                      className="cursor-pointer hover:font-semibold"
                      onClick={() => setOpenMenu(false)}
                    >
                      Cart
                    </Link>
                  </div>
                  <Link to="/" className="cursor-pointer hover:font-semibold" onClick={() => setOpenMenu(false)}>Home</Link>
                  <Link to="/shop" className="cursor-pointer hover:font-semibold" onClick={() => setOpenMenu(false)}>Shop</Link>
                  <Link
                    to="/about"
                    className="cursor-pointer hover:font-semibold"
                    onClick={() => setOpenMenu(false)}
                  >
                    About us
                  </Link>
                  <Link to="/contact" className="cursor-pointer hover:font-semibold" onClick={() => setOpenMenu(false)}>Contact</Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default Navbar;
