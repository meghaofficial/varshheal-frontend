import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Home from "./Home";
import About from "./About";
import Shop from "./Shop";
import DisplayProduct from "./DisplayProduct";
import Contact from "./Contact";
import Cart from "./Cart";
import Profile from "./Profile";
import Checkout from "./Checkout";
import Auth from "./Auth";
import { useSelector } from "react-redux";
import Addresses from "../components/profile/Addresses";
import MyOrders from "../components/profile/MyOrders";
import OrderDetails from "./OrderDetails";
import MyOrdersSm from "./MyOrdersSm";

const PrivateRoute = ({ isAuthenticated, loading }) => {
  if (loading) {
    return (
      <div className="min-h-[450px] flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

const PublicRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const Layout = () => {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div
      className={`${location.pathname === "/about" && "bg-[#f9f4f1]"} ${
        location.pathname === "/contact" && "bg-[#F9F9F9]"
      }`}
    >
      <div>
        <div
          className={`${
            (
              location.pathname.includes("auth") ||
              location.pathname.includes("rv")
            ) &&
            "hidden"
          }`}
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
          {/* private routes */}
          <Route
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                loading={loading}
              />
            }
          >
            <Route path="/account" element={<Profile />}>
              <Route path="addresses" element={<Addresses />} />
              <Route path="orders/search?sq?" element={<MyOrders />} />
            </Route>
            <Route path="/rv/orders" element={<MyOrdersSm/>} />
            <Route path="/order_details" element={<OrderDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          {/* public routes */}
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          {/* <Route path="*" element={<About />} /> */}
        </Routes>
      </div>
      <div
        className={`${location.pathname === "/" && "mt-28"} ${
          (
            location.pathname.includes("auth") ||
            location.pathname.includes("rv")
          ) && "hidden"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
