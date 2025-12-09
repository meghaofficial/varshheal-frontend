import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { PiShoppingCartSimple, PiUserLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import SearchPanel from "../componentsNew/SearchPanel";
import CartSection from "../componentsNew/CartSection";

const Navbar = ({ openSearch, setOpenSearch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [openCart, setOpenCart] = useState(false);
  const [activeComp, setActiveComp] = useState(null);

  useEffect(() => {
    if (openMenu) {
      setActiveComp({
        open: openMenu,
        setOpen: setOpenMenu,
        comp: (
          <div className="flex flex-col items-center justify-evenly h-full playfair">
            <p className={`text-left w-full ps-10`}>Profile</p>
            <p
              className={`text-left w-full ps-10 ${
                location.pathname.includes("collections") && "font-semibold"
              }`}
              onClick={() => {
                navigate("/collections");
                setOpenMenu(false);
              }}
            >
              Collections
            </p>
            <p
              className={`text-left w-full ps-10 ${
                location.pathname.includes("about") && "font-semibold"
              }`}
              onClick={() => {
                navigate("/about");
                setOpenMenu(false);
              }}
            >
              About
            </p>
            <p className={`text-left w-full ps-10`}>Contact</p>
            <p
              className={`text-left w-full ps-10 ${
                location.pathname.includes("cart") && "font-semibold"
              }`}
              onClick={() => {
                navigate("/cart");
                setOpenMenu(false);
              }}
            >
              Cart
            </p>
          </div>
        ),
        left: true,
      });
      return;
    } else if (openSearch) {
      setActiveComp({
        open: openSearch,
        setOpen: setOpenSearch,
        comp: <SearchPanel setOpenSearch={setOpenSearch} />,
        left: false,
      });
      return;
    } else if (openCart) {
      setActiveComp({
        open: openCart,
        setOpen: setOpenCart,
        comp: <CartSection setOpenCart={setOpenCart} />,
        left: false,
      });
      return;
    } else {
      setActiveComp(null);
      return;
    }
  }, [openSearch, openMenu, openCart]);

  return (
    <div
      className="flex items-center justify-between md:ps-10 md:pe-15 px-8 pt-6 pb-5"
      style={{ fontFamily: "Helvetica" }}
    >
      {/* logo */}
      <img
        src="/images/logo.png"
        alt="logo"
        className="h-[50px] cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* nav links md */}
      <div className="text-[13px] w-[400px] md:flex hidden">
        <span
          className={`hover:font-bold cursor-pointer px-3 min-w-[100px] text-center ${
            location.pathname === "/" && "font-semibold"
          }`}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        <span
          className={`hover:font-bold cursor-pointer px-3 min-w-[100px] text-center ${
            location.pathname.includes("collections") && "font-semibold"
          }`}
          onClick={() => {
            navigate("/collections");
          }}
        >
          Collections
        </span>
        <span
          className={`hover:font-bold cursor-pointer px-3 min-w-[100px] text-center ${
            location.pathname.includes("about") && "font-semibold"
          }`}
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </span>
        <span
          className={`hover:font-bold cursor-pointer px-3 min-w-[100px] text-center`}
        >
          Contact
        </span>
      </div>

      {/* search & cart */}
      <div className="flex items-center gap-3">
        {/* search */}
        <CiSearch
          className="cursor-pointer"
          size={20}
          onClick={() => setOpenSearch(true)}
        />

        {/* cart for lg */}
        <div
          className="relative cursor-pointer md:block hidden me-1"
          onClick={() => setOpenCart(true)}
        >
          <PiShoppingCartSimple />
          <span
            className={`bg-black text-white rounded-full absolute -top-[9px] -right-[9px] text-[8px] flex items-center justify-center min-w-3 min-h-3`}
          >
            2
          </span>
        </div>
        {/* profile for lg */}
        <PiUserLight
          className="relative cursor-pointer md:block hidden"
          strokeWidth={2}
        />
        {/* for sm */}
        <div className="md:hidden relative">
          <Menu
            size={20}
            className="cursor-pointer"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
      </div>

      <SideBar
        open={activeComp?.open}
        setOpen={activeComp?.setOpen}
        comp={activeComp?.comp}
        left={activeComp?.left}
      />
    </div>
  );
};

function SideBar({ open, setOpen, comp, left }) {
  return (
    <>
      {/* Dark Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`fixed top-0 ${
              left ? "left-0 w-[60%]" : "right-0 w-[40%]"
            } h-full bg-white z-50 flex flex-col`}
            initial={{ x: left ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: left ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            {comp}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
