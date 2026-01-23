import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/customer/HomeScreen/HomeScreen";
import ParlorDetailsScreen from "./screens/customer/ParlorDetailsScreen/ParlorDetailsScreen";
import SelectSlotScreen from "./screens/customer/SelectSlotScreen/SelectSlotScreen";
import BookingSummaryScreen from "./screens/customer/BookingSummaryScreen/BookingSummaryScreen";
import Footer from "./components/Footer/Footer";
import Dashboard from "./screens/experts/Dashboard/Dashboard";
import GoogleSignIn from "./components/GoogleSignIn";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<GoogleSignIn />} />
          <Route path="/parlour" element={<ParlorDetailsScreen />} />
          <Route path="/parlour/service" element={<SelectSlotScreen />} />
          <Route path="/summary" element={<BookingSummaryScreen />} />
          <Route path="/shop/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
