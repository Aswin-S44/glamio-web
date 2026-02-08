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
import CustomerSignUp from "./screens/login/signUp/CustomerSignUp";
import { Provider } from "react-redux";
import store from "./store/Store";
import OnboardScreen from "./screens/OnboardScreen/OnboardScreen";
import MyProfileScreen from "./screens/MyProfileScreen/MyProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/parlour" element={<ParlorDetailsScreen />} />
            <Route path="/parlour/service" element={<SelectSlotScreen />} />
            <Route path="/summary" element={<BookingSummaryScreen />} />
            <Route path="/shop/dashboard" element={<Dashboard />} />
            <Route path="/signup/type=customer" element={<CustomerSignUp />} />
            <Route path="/shop/onboard" element={<OnboardScreen />} />
            <Route path="/shop/edit-profile" element={<EditProfileScreen />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
