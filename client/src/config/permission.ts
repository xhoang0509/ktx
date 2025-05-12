const RolePaths: { [key: string]: string[] } = {
  user: ["/", "/contact"],
  guest: ["/", "/login", "/register", "/dorm-registration", "/contact"],
  onlyGuest: ["/login", "/register", "/dorm-registration", "/contact"],
};

export default RolePaths;
