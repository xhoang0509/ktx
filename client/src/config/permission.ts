const RolePaths: { [key: string]: string[] } = {
    user: [
        "/",
        "user-info",
        "/contact",
        "/room-registration",
        "/room-registration/:id",
        "/blog/:id",
        "/blog",
        "/contract",
        "/payment",
    ],
    guest: ["/login", "/register", "/contact"],
};

export default RolePaths;
