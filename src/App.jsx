import { useEffect } from "react";
import "./App.css";
import Layout from "./pages/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { checkAuth } from "./utils/checkAuth";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ once: true });
    const resumeDiv = document.querySelector(".resume");
    if (resumeDiv) {
      resumeDiv.setAttribute("data-aos", "fade-up");
      AOS.refresh();
    }
    AOS.refresh();
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Layout />
      <ToastContainer />
    </>
  );
}

export default App;
