import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ToastContainer />
      <Navbar />
      <div className="min-h-[calc(90vh-200px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
