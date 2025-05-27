import { AppActions, AppSelectors } from "@app/slice";
import { useAppDispatch } from "@app/store";
import schoolLogo from "@assets/images/school_logo.jpg";
import { SITE_NAME, SITE_NAVBAR } from "@config/site";
import { ROUTE_PATHS } from "@constants/route.const";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarMenuItem,
    Badge,
} from "@heroui/react";
import {
    HomeIcon,
    BuildingOfficeIcon,
    PhoneIcon,
    DocumentTextIcon,
    UserIcon,
    DocumentIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon,
    BellIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    BuildingOfficeIcon as BuildingOfficeIconSolid,
    PhoneIcon as PhoneIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import "./MainLayout.css";

const MainLayoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname: currentPath } = useLocation();
    const user = useSelector(AppSelectors.userInfo);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getNavIcon = (path: string, isActive: boolean) => {
        const iconClass = "w-5 h-5";
        switch (path) {
            case ROUTE_PATHS.DEFAULT:
                return isActive ? 
                    <HomeIconSolid className={iconClass} /> : 
                    <HomeIcon className={iconClass} />;
            case ROUTE_PATHS.ROOM_REGISTRATION:
                return isActive ? 
                    <BuildingOfficeIconSolid className={iconClass} /> : 
                    <BuildingOfficeIcon className={iconClass} />;
            case ROUTE_PATHS.CONTACT:
                return isActive ? 
                    <PhoneIconSolid className={iconClass} /> : 
                    <PhoneIcon className={iconClass} />;
            case ROUTE_PATHS.BLOG:
                return isActive ? 
                    <DocumentTextIconSolid className={iconClass} /> : 
                    <DocumentTextIcon className={iconClass} />;
            default:
                return null;
        }
    };

    const getFirstLetter = () => {
        if (user.avatar) {
            return user.avatar;
        }
        if (user.full_name) {
            return user.full_name.charAt(0);
        }
        return "A";
    };

    const handleLogout = () => {
        dispatch(AppActions.logout({}));
    };

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="xl"
            classNames={{
                base: ["bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200/50 shadow-sm"],
                item: ["data-[active=true]:text-primary", "data-[active=true]:font-semibold"],
                wrapper: ["px-4 sm:px-6"],
            }}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => navigate("/")}
                    >
                        <div className="relative">
                            <Image 
                                src={schoolLogo} 
                                width={40} 
                                height={40} 
                                className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200" 
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-primary font-bold text-xl group-hover:text-primary-600 transition-colors">
                                {SITE_NAME}
                            </div>
                            <div className="text-xs text-gray-500 hidden sm:block">
                                Nơi an cư lý tưởng cho sinh viên
                            </div>
                        </div>
                    </div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {SITE_NAVBAR.map((item) => {
                    const isActive = currentPath === "/" + item.to || (item.to === ROUTE_PATHS.DEFAULT && currentPath === "/");
                    return (
                        <NavbarItem key={item.to} isActive={isActive}>
                            <Link
                                to={item.to || "/"}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${
                                    isActive 
                                        ? "text-primary font-semibold bg-primary/5" 
                                        : "text-gray-700 hover:text-primary"
                                }`}
                            >
                                {getNavIcon(item.to, isActive)}
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                {user.id ? (
                    <div className="flex items-center gap-3">
                        <Button
                            isIconOnly
                            variant="light"
                            className="relative"
                            size="sm"
                        >
                            <BellIcon className="w-5 h-5" />
                            <Badge color="danger" size="sm" className="absolute -top-1 -right-1 notification-badge">
                                3
                            </Badge>
                        </Button>
                        
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors">
                                    <div className="hidden sm:flex flex-col items-end">
                                        <span className="text-sm font-medium text-gray-700">
                                            {user.full_name}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <AcademicCapIcon className="w-3 h-3" />
                                            Sinh viên
                                        </span>
                                    </div>
                                    <div className="p-0.5 rounded-full user-avatar-gradient">
                                        <Avatar
                                            className="cursor-pointer bg-white"
                                            name={getFirstLetter() || ""}
                                            src={getFirstLetter()}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="User menu"
                                className="w-64"
                                itemClasses={{
                                    base: "gap-4 py-2",
                                }}
                            >
                                <DropdownItem
                                    key="profile"
                                    startContent={<UserIcon className="w-4 h-4" />}
                                    onPress={() => navigate(`/${ROUTE_PATHS.USER_INFO}`)}
                                    className="text-default-500"
                                >
                                    <div className="flex flex-col">
                                        <span>Thông tin tài khoản</span>
                                        <span className="text-xs text-default-400">Cập nhật thông tin cá nhân</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    key="contract"
                                    startContent={<DocumentIcon className="w-4 h-4" />}
                                    onPress={() => navigate(`/${ROUTE_PATHS.CONTRACT}`)}
                                    className="text-default-500"
                                >
                                    <div className="flex flex-col">
                                        <span>Hợp đồng thuê phòng</span>
                                        <span className="text-xs text-default-400">Xem danh sách hợp đồng</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    key="payment"
                                    startContent={<CreditCardIcon className="w-4 h-4" />}
                                    onPress={() => navigate(`/${ROUTE_PATHS.PAYMENT}`)}
                                    className="text-default-500"
                                >
                                    <div className="flex flex-col">
                                        <span>Thanh toán</span>
                                        <span className="text-xs text-default-400">Quản lý hóa đơn và thanh toán</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                                    onPress={handleLogout}
                                >
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                as={Link}
                                to="/login"
                                variant="ghost"
                                startContent={<UserIcon className="w-4 h-4" />}
                                className="text-gray-700 hover:text-primary"
                            >
                                Đăng nhập
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button 
                                as={Link} 
                                color="primary" 
                                to="/register" 
                                variant="solid"
                                startContent={<AcademicCapIcon className="w-4 h-4" />}
                                className="font-medium shadow-md hover:shadow-lg transition-shadow"
                            >
                                Đăng ký ngay
                            </Button>
                        </NavbarItem>
                    </div>
                )}
            </NavbarContent>

            <NavbarMenu className="bg-white/95 backdrop-blur-sm">
                <div className="flex flex-col gap-2 pt-6">
                    {SITE_NAVBAR.map((item, index) => {
                        const isActive = currentPath === "/" + item.to || (item.to === ROUTE_PATHS.DEFAULT && currentPath === "/");
                        return (
                            <NavbarMenuItem key={`${item.to}-${index}`} className="mobile-menu-item">
                                <Link
                                    to={item.to || "/"}
                                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                                        isActive 
                                            ? "text-primary font-semibold bg-primary/10" 
                                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {getNavIcon(item.to, isActive)}
                                    <span>{item.label}</span>
                                </Link>
                            </NavbarMenuItem>
                        );
                    })}
                    
                    {!user.id && (
                        <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 mobile-menu-item">
                            <Button
                                as={Link}
                                to="/login"
                                variant="bordered"
                                startContent={<UserIcon className="w-4 h-4" />}
                                className="justify-start"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                as={Link}
                                to="/register"
                                color="primary"
                                startContent={<AcademicCapIcon className="w-4 h-4" />}
                                className="justify-start"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đăng ký ngay
                            </Button>
                        </div>
                    )}
                </div>
            </NavbarMenu>
        </Navbar>
    );
};

export default MainLayoutHeader;
