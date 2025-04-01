import { useEffect } from "react";
import NavBar from "../../components/common/NavBar";
import HeroSection from "../../components/parts/home/HeroSection";
import TrustedPartners from "../../components/parts/home/TrustedPartners";
import Become from "../../components/parts/home/Become";
import Explore from "../../components/parts/home/explore/Explore";
import How from "../../components/parts/home/How";
import Footer from "../../components/common/Footer";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div>
        <NavBar />
        <HeroSection />
        <TrustedPartners />
        <Become />
        <Explore />
        <How />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
