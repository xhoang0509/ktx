import { SITE_NAME } from "@config/site";
import React from "react";
import HomeInvoices from "./components/HomeInvoices";
import HomeNotification from "./components/HomeNotification";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="my-3 text-lg font-semibold">
                {SITE_NAME} xin chào, chúc bạn môt ngày tốt lành!
            </div>
            <HomeNotification />
            <HomeInvoices />
        </div>
    );
};

export default Home;
