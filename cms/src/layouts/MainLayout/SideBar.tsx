import { SITE_MENU } from "@config/site";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Image, Divider, Tooltip } from "@heroui/react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import MenuItem from "./MenuItem";
import schoolLogo from "@assets/images/school_logo.jpg";

const SideBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`
            ${isCollapsed ? "min-w-[80px]" : "min-w-[280px]"} 
            transition-all duration-300 ease-in-out
            p-4 bg-gradient-to-b from-white to-gray-50 
            border-r border-gray-200 
            max-h-[calc(100vh-60px)] overflow-y-auto 
            flex flex-col sticky top-0 
            shadow-sm
        `}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="mb-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors self-start"
            >
                <div
                    className={`w-4 h-0.5 bg-gray-600 transition-transform ${
                        isCollapsed ? "rotate-45" : ""
                    }`}
                ></div>
                <div
                    className={`w-4 h-0.5 bg-gray-600 my-1 transition-opacity ${
                        isCollapsed ? "opacity-0" : "opacity-100"
                    }`}
                ></div>
                <div
                    className={`w-4 h-0.5 bg-gray-600 transition-transform ${
                        isCollapsed ? "-rotate-45 -mt-1.5" : ""
                    }`}
                ></div>
            </button>

            <div className="flex-1 space-y-1">
                <div
                    className={`${
                        isCollapsed ? "hidden" : "block"
                    } text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4`}
                >
                    Chức năng chính
                </div>

                {SITE_MENU.map((item, index) => (
                    <div key={`${index}`}>
                        {isCollapsed ? (
                            <Tooltip content={item.label} placement="right" delay={500}>
                                <div>
                                    <MenuItem item={item} isCollapsed={isCollapsed} />
                                </div>
                            </Tooltip>
                        ) : (
                            <MenuItem item={item} isCollapsed={isCollapsed} />
                        )}
                    </div>
                ))}
            </div>

            <Divider className="my-4" />

            <div className="space-y-2">
                {isCollapsed ? (
                    <Tooltip content="Đăng xuất" placement="right">
                        <button
                            className="w-full flex justify-center items-center p-3 rounded-lg hover:bg-red-50 hover:scale-105 transition-all transform group"
                            onClick={() => navigate("/logout")}
                        >
                            <PowerIcon className="text-red-500 size-5 group-hover:text-red-600" />
                        </button>
                    </Tooltip>
                ) : (
                    <button
                        className="w-full flex gap-3 items-center p-3 rounded-lg hover:bg-red-50 hover:scale-105 transition-all transform group"
                        onClick={() => navigate("/logout")}
                    >
                        <PowerIcon className="text-red-500 size-5 group-hover:text-red-600" />
                        <div className="font-medium text-left text-sm flex-1 text-red-500 group-hover:text-red-600">
                            Đăng xuất
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SideBar;
