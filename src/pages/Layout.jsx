import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Home from "./Home";
import About from "./About";
import Shop from "./Shop";
import DisplayProduct from "./DisplayProduct";
import Contact from "./Contact";
import Cart from "./Cart";
import Profile from "./Profile";
import Settings from "../components/profile/Settings";
import OrderHistory from "../components/profile/OrderHistory";
import Checkout from "./Checkout";
import Auth from "./Auth";

const Layout = () => {
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === "/about" && "bg-[#f9f4f1]"} ${
        location.pathname === "/contact" && "bg-[#F9F9F9]"
      }`}
    >
      <div>
        <div
          className={`${(location.pathname.includes("auth") || location.pathname.includes("signup")) && 'hidden'}`}
        >
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />}>
            <Route path="product" element={<DisplayProduct />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="settings" element={<Settings />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
          <Route path="*" element={<About />} />
        </Routes>
      </div>
      <div className={`${location.pathname === "/" && "mt-28"} ${location.pathname.includes("auth") && 'hidden'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
