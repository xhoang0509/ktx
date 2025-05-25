import { AppActions, AppSelectors } from "@app/slice";
import { useAppDispatch } from "@app/store";
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
} from "@heroui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import schoolLogo from "@assets/images/school_logo.jpg";
const MainLayoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname: currentPath } = useLocation();
    const user = useSelector(AppSelectors.userInfo);

    const getFirstLetter = () => {
        if (user.avatar) {
            return `${import.meta.env.VITE_API_BASE}/${user.avatar}`;
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
            maxWidth="xl"
            classNames={{
                base: ["bg-[#d2f5ff]"],
                item: ["data-[active=true]:text-primary"],
            }}
        >
            <NavbarBrand>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <Image src={schoolLogo} width={32} height={32} className="mr-2 rounded-none" />
                    <div className="text-primary font-bold text-2xl cursor-pointer">
                        {SITE_NAME}
                    </div>
                </div>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {SITE_NAVBAR.map((item) => {
                    return (
                        <NavbarItem key={item.to} isActive={currentPath === "/" + item.to}>
                            <Link
                                aria-current="page"
                                to={item.to || "/"}
                                className="text-lg hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                {user.id ? (
                    <>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <div className="flex items-center gap-2">
                                        Xin chào, {user.full_name}
                                        <Avatar
                                            className="cursor-pointer"
                                            name={getFirstLetter() || ""}
                                            src={getFirstLetter()}
                                        />
                                    </div>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="ACME features"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                <DropdownItem
                                    key={1}
                                    onPress={() => {
                                        navigate(`/${ROUTE_PATHS.USER_INFO}`);
                                    }}
                                >
                                    Thông tin tài khoản
                                </DropdownItem>
                                <DropdownItem
                                    key={1}
                                    onPress={() => {
                                        navigate(`/${ROUTE_PATHS.CONTRACT}`);
                                    }}
                                >
                                    Danh sách hợp đồng
                                </DropdownItem>
                                <DropdownItem
                                    key={1}
                                    onPress={() => {
                                        navigate(`/${ROUTE_PATHS.PAYMENT}`);
                                    }}
                                >
                                    Quản lý thanh toán
                                </DropdownItem>
                                <DropdownItem key={1} onPress={handleLogout}>
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link to="/login">Đăng nhập</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" to="/register" variant="flat">
                                Đăng ký
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default MainLayoutHeader;
