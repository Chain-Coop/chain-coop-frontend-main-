import { useEffect } from "react";
import NavBar from "../../common/NavBar";
import Join from "../../parts/parttwo/Join";
import Card from "../../parts/parttwo/Card";
import Revolution from "../../parts/parttwo/Revolution";
import How from "../../parts/partone/How";
import AppStore from "../../parts/partone/AppStore";
import FooterBox from "../../common/FooterBox";
import Footer from "../../common/Footer";

const Membership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar position="relative" />
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
