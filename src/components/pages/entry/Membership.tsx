import React from "react";
import Card from "../../parts/parttwo/Card";
import NavBar from "../../common/NavBar";
import Join from "../../parts/parttwo/Join";
import How from "../../parts/partone/How";
import AppStore from "../../parts/partone/AppStore";
import Footer from "../../common/Footer";
import FooterBox from "../../common/FooterBox";
import Revolution from "../../parts/parttwo/Revolution";
import { useEffect } from "react";
const Membership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <Join />
      <Card />
      <Revolution />
      <How />
      <AppStore />
      <FooterBox />
      <Footer />
    </>
  );
};

export default Membership;
