import Footer from "../../common/Footer";
import AppStore from "../../parts/partone/AppStore";
import Become from "../../parts/partone/Become";
import Explore from "../../parts/partone/Explore";
import HeroSection from "../../parts/partone/HeroSection";
import How from "../../parts/partone/How";
import Meet from "../../parts/partone/Meet";
import TrustedPartners from "../../parts/partone/TrustedPartners";
import FooterBox from "../../common/FooterBox";
import { useEffect } from "react";
import NavBar from "../../common/NavBar";

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
