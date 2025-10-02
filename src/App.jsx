import { useEffect } from "react";
import "./App.css";
import Layout from "./pages/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { checkAuth } from "./utils/checkAuth";

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
    </>
  );
}

export default App;
