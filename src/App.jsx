import { useEffect } from 'react';
import './App.css'
import Layout from './pages/Layout'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
        AOS.init({ once: true });
        const resumeDiv = document.querySelector('.resume');
        if (resumeDiv) {
        resumeDiv.setAttribute('data-aos', 'fade-up');
        AOS.refresh();
        }
        AOS.refresh();
      }, [])

  return (
    <>
      <Layout />
    </>
  )
}

export default App
