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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div className="flex-1 flex flex-col relative overflow-hidden">
                    <AppLoading isLoading={isLoading} />
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
