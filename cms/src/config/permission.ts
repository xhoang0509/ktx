const RolePaths: { [key: string]: string[] } = {
  admin: [
    "/",
    "/product",
    "/order",
    "/order/edit/:id",
    "/user",
    "/banner",
    "/category",
    "/category/add",
    "/category/edit/:id",
    "/product",
    "/product/add",
    "/product/edit/:id",
    "/voucher",
    "/voucher/add",
    "/voucher/edit/:id",
    "/blog",
    "/blog/add",
    "/blog/edit/:id",
    "/logout",
  ],
  manager: [],
  guest: ["/login", "/register"],
  onlyGuest: ["/login", "/register"],
};

export default RolePaths;
