const RolePaths: { [key: string]: string[] } = {
    user: ["/", "/contact", "/room-registration", "/room-registration/:id"],
    guest: ["/login", "/register", "/contact"],
};

export default RolePaths;
