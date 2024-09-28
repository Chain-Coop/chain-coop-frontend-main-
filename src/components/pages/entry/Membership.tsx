import React from "react";
import Card from "../../parts/parttwo/Card";
import NavBar from "../../common/NavBar";
import Join from "../../parts/parttwo/Join";
import How from "../../parts/parttwo/How";
import AppStore from "../../parts/partone/AppStore";
import Footer from "../../common/Footer";
import Revolution from "../../parts/parttwo/Revolution";
import { useEffect } from "react";
const Membership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <div className="sm:mt-[1em] lg:w-[86%] lg:mt-[6em] flex-col flex mx-auto">
      <Join />
      <Card />
      <Revolution />
      <How />
      <AppStore />
     </div>
      <Footer />
    </>
  );
};

export default Membership;
