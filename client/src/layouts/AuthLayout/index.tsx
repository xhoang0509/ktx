import React from "react";
import Header from "./AuthLayoutHeader";
import Footer from "./AuthLayoutFooter";
import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Header />
      <div className="grow flex flex-col w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
