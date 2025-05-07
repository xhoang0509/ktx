import React from "react";
import Header from "./MainLayoutHeader";
import Footer from "./MainLayoutFooter";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Header />
      <div className="grow flex flex-col w-full max-w-[1280px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
