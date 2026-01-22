import React from "react";
import "./HomeScreen.css";
import Banner from "../../../components/Banner/Banner";
import Services from "../../../sections/services/Services";
import Parlors from "../../../sections/Parlors/Parlors";

function HomeScreen() {
  return (
    <div>
      <Banner />
      <Services />
      <Parlors />
    </div>
  );
}

export default HomeScreen;
