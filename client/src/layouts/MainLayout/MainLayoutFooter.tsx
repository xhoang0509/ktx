import { SITE_NAME } from "@config/site";
import React from "react";

const MainLayoutFooter: React.FC = () => {
    return (
        <div className="text-center text-sm text-gray-500 py-2 w-full bg-gray-300">
            Bản quyền thuộc về {SITE_NAME} 2025
        </div>
    );
};

export default MainLayoutFooter;
