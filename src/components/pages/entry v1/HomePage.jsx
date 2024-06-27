import { useEffect } from "react";
import NavBar from "../../common/NavBar";
import HeroSection from "../../parts/partone/HeroSection";
import TrustedPartners from "../../parts/partone/TrustedPartners";
import Become from "../../parts/partone/Become";
import Meet from "../../parts/partone/Meet";
import Explore from "../../parts/partone/Explore";
import How from "../../parts/partone/How";
import AppStore from "../../parts/partone/AppStore";
import FooterBox from "../../common/FooterBox";
import Footer from "../../common/Footer";

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
        <Meet />
        <Explore />
        <How />
        <AppStore />
        <FooterBox />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
