import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@heroui/react";
import { SITE_NAME, SITE_NAVBAR } from "@config/site";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AppSelectors } from "@app/slice";

const MainLayoutHeader: React.FC = () => {
    const navigate = useNavigate();
    const { pathname: currentPath } = useLocation();
    const user = useSelector(AppSelectors.userInfo);
    console.log({ user });
    const getFirstLetter = (name: string | null) => {
        console.log({ name })
        if (!name) return "";
        return name.charAt(0);
    };
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
                    return !item?.children?.length ? (
                        <NavbarItem key={item.to} isActive={currentPath === "/" + item.to}>
                            <Link
                                aria-current="page"
                                to={item.to || "/"}
                                className="text-lg hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ) : (
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        disableRipple
                                        className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg hover:text-primary"
                                        radius="sm"
                                        variant="light"
                                    >
                                        {item.label}
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="ACME features"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                {item.children.map((child) => (
                                    <DropdownItem
                                        key={child.to}
                                        // description="ACME scales apps based on demand and load"
                                        onPress={() => navigate(child.to)}
                                    >
                                        {child.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    );
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                {user.id ? (
                    <>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Avatar name={getFirstLetter(user.full_name) || ""} />
                                    {/* <Button
                                        disableRipple
                                        className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg hover:text-primary"
                                        radius="sm"
                                        variant="light"
                                    >
                                        {`item.label`}
                                    </Button> */}
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="ACME features"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                <DropdownItem key={`child.to`} onPress={() => navigate(`child.to`)}>
                                    {`child.label`}
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
