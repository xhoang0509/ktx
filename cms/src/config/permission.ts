const RolePaths: { [key: string]: string[] } = {
    admin: [
        "/",
        "/device",
        "/device/add",
        "/device/edit/:id",
        "/user",
        "/user/add",
        "/user/edit/:id",
        "/user/view/:id",
        "/room",
        "/room/add",
        "/room/edit/:id",
        "/logout",
        "/request",
        "/request/edit/:id",
        "/request/detail/:id",
    ],
    manager: [],
    guest: ["/login", "/register"],
    onlyGuest: ["/login", "/register"],
};

export default RolePaths;
