const RolePaths: { [key: string]: string[] } = {
  admin: ["/"],
  manager: ["/"],
  student: ["/"],
  guest: ["/", "/login", "/register", "/dorm-registration"],
  onlyGuest: ["/login", "/register", "/dorm-registration"],
};

export default RolePaths;
