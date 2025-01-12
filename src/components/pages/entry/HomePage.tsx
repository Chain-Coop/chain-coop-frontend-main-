import React from "react";
import Footer from "../../common/Footer";
import AppStore from "../../parts/home/AppStore";
import Become from "../../parts/home/Become";
import Explore from "../../parts/home/explore/Explore";
import HeroSection from "../../parts/home/HeroSection";
import How from "../../parts/home/How";
import Meet from "../../parts/home/Meet";
import TrustedPartners from "../../parts/home/TrustedPartners";
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
        {/* <AppStore /> */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
