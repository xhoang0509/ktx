const RolePaths: { [key: string]: string[] } = {
    user: [
        "/",
        "user-info",
        "/contact",
        "/room-registration",
        "/room-registration/:id",
        "/contract",
    ],
    guest: ["/login", "/register", "/contact"],
};

export default RolePaths;
