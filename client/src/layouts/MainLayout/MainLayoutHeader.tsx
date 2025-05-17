import { AppActions, AppSelectors } from "@app/slice";
import { useAppDispatch } from "@app/store";
import { SITE_NAME, SITE_NAVBAR } from "@config/site";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";

const MainLayoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname: currentPath } = useLocation();
    const user = useSelector(AppSelectors.userInfo);

    const getFirstLetter = (name: string | null) => {
        if (!name) return "A";
        return name.charAt(0);
    };

    const handleLogout = () => {
        dispatch(AppActions.logout({}));
    };
    console.log({ user });
    return (
        <Navbar
            maxWidth="xl"
            classNames={{
                base: ["bg-[#e4f9ff]"],
                item: ["data-[active=true]:text-primary"],
            }}
        >
            <NavbarBrand>
                <div
                    className="text-primary font-bold text-2xl cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    {SITE_NAME}
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
                                            name={getFirstLetter(user.full_name) || ""}
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
                                <DropdownItem key={1} onPress={() => {}}>
                                    Thông tin tài khoản
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
