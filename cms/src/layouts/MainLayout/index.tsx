import React from "react";
import Header from "./MainLayoutHeader";
import Footer from "./MainLayoutFooter";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import AppLoading from "@components/common/AppLoading";
import { useAppSelector } from "@services/store";
import { AppSelectors } from "@app/slice";

const MainLayout: React.FC = () => {
  const isLoading = useAppSelector(AppSelectors.isLoading);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Header />
      <div className="grow flex w-full">
        <SideBar />
        <div className="grow flex flex-col w-full relative">
          <AppLoading isLoading={isLoading} />
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
