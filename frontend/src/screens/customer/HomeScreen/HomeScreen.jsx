import React from "react";
import "./HomeScreen.css";
import Banner from "../../../components/Banner/Banner";
import Services from "../../../sections/services/Services";
import Parlors from "../../../sections/Parlors/Parlors";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

function HomeScreen() {
  return (
    <div>
      <Header />
      <Banner />
      <Services />
      <Parlors />
      <Footer />
    </div>
  );
}

export default HomeScreen;
