import React from "react";
import { useLocation, useNavigate } from "react-router";

export interface IMenuItem {
    label: string;
    icon: any;
    path: string;
}

interface MenuItemProps {
    item: IMenuItem;
    isCollapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isCollapsed = false }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = location.pathname === item.path;

    const Icon = item.icon;

    const handleClick = () => {
        navigate(item.path);
    };

    if (isCollapsed) {
        return (
            <button
                className={`
                    w-full flex justify-center items-center p-3 mb-2 rounded-lg 
                    transition-all duration-200 transform hover:scale-105 group
                    ${
                        isActive
                            ? "bg-primary-100 text-primary-600 shadow-sm scale-105"
                            : "hover:bg-gray-100 text-gray-600 hover:text-primary-600"
                    }
                `}
                onClick={handleClick}
            >
                <Icon className="size-5" />
            </button>
        );
    }

    return (
        <button
            className={`
                w-full flex gap-3 items-center p-3 mb-2 rounded-lg 
                transition-all duration-200 transform hover:scale-105 group
                ${
                    isActive
                        ? "bg-primary-100 text-primary-600 shadow-sm scale-105 border-l-4 border-primary-500"
                        : "hover:bg-gray-100 text-gray-600 hover:text-primary-600"
                }
            `}
            onClick={handleClick}
        >
            <Icon className="size-5 flex-shrink-0" />
            <div className="font-medium text-left text-sm flex-1 truncate">
                {item.label}
            </div>
            {isActive && (
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            )}
        </button>
    );
};

export default MenuItem;
