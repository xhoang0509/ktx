import { AppSelectors } from "@app/slice";
import defaultAvatar from "@assets/images/default_avatar.jpg";
import schoolLogo from "@assets/images/school_logo.jpg";
import {
    ArrowRightOnRectangleIcon,
    BellIcon,
    Cog6ToothIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Navbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const MainLayoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const admin = useSelector(AppSelectors.userInfo);

    const getBreadcrumb = () => {
        const pathMap: Record<string, string> = {
            "/": "Trang chủ",
            "/user": "Quản lý sinh viên",
            "/device": "Quản lý thiết bị",
            "/room": "Quản lý phòng",
            "/request": "Hợp đồng thuê phòng",
            "/bill": "Hóa đơn điện nước",
        };
        return pathMap[location.pathname] || "Dashboard";
    };

    return (
        <Navbar
            maxWidth="full"
            className="border-b border-gray-200 bg-white/90 backdrop-blur-md"
            height="60px"
        >
            <NavbarContent justify="start">
                <div className="flex flex-row gap-4">
                    <Image src={schoolLogo} className="w-[40px] h-[40px] rounded-lg shadow-sm" />
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{getBreadcrumb()}</h1>
                        <p className="text-xs text-gray-500">Hệ thống quản lý ký túc xá</p>
                    </div>
                </div>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Badge content="3" color="danger" size="sm">
                        <Button isIconOnly variant="light" className="text-gray-600">
                            <BellIcon className="w-5 h-5" />
                        </Button>
                    </Badge>
                </NavbarItem>

                <NavbarItem>
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-gray-200"
                        onPress={() => navigate("/settings")}
                        disabled={true}
                    >
                        <Cog6ToothIcon className="w-5 h-5" />
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform hover:scale-105"
                                color="primary"
                                name="Admin"
                                size="sm"
                                src={defaultAvatar}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <span className="font-semibold">Đăng nhập với</span>
                                <span className="font-semibold"> {admin?.username || "admin"}</span>
                            </DropdownItem>
                            <DropdownItem
                                key="settings"
                                startContent={<UserIcon className="w-4 h-4" />}
                                className="text-gray-300"
                            >
                                <span className="text-gray-300">Hồ sơ cá nhân</span>
                            </DropdownItem>
                            <DropdownItem
                                key="configurations"
                                startContent={<Cog6ToothIcon className="w-4 h-4" />}
                                className="text-gray-300"
                            >
                                Cài đặt
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                                onPress={() => navigate("/logout")}
                            >
                                Đăng xuất
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default MainLayoutHeader;
