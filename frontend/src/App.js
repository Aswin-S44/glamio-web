import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/customer/HomeScreen/HomeScreen";
import ParlorDetailsScreen from "./screens/customer/ParlorDetailsScreen/ParlorDetailsScreen";
import SelectSlotScreen from "./screens/customer/SelectSlotScreen/SelectSlotScreen";
import BookingSummaryScreen from "./screens/customer/BookingSummaryScreen/BookingSummaryScreen";
import Footer from "./components/Footer/Footer";
import Dashboard from "./screens/experts/Dashboard/Dashboard";
import SignIn from "./screens/login/signIn/SignIn";
import SignUp from "./screens/login/signUp/SignUp";
import MyProfileScreen from "./screens/MyProfileScreen/MyProfileScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/parlour/:id" element={<ParlorDetailsScreen />} />
        <Route path="/parlour/service" element={<SelectSlotScreen />} />
        <Route path="/summary" element={<BookingSummaryScreen />} />
        <Route path="/shop/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
