export const ROUTE_PATHS = {
    DEFAULT: "",
    // user
    LOGIN: "login",
    REGISTER: "register",
    LOGOUT: "logout",
    USER: "user",
    ADD_USER: "user/add",
    EDIT_USER: "user/edit/:id",
    EDIT_USER_BASE: "user/edit",
    VIEW_USER: "user/view/:id",
    VIEW_USER_BASE: "user/view",

    // device
    DEVICE: "device",
    EDIT_DEVICE: "device/edit/:id",
    ADD_DEVICE: "device/add",

    // request: yêu cầu
    REQUEST: "request",
    REQUEST_DETAIL: "request/detail/:id",
    EDIT_REQUEST_BASE: "request/edit",
    EDIT_REQUEST: "request/edit/:id",

    // room: phòng
    ROOM: "room",
    ADD_ROOM: "room/add",
    EDIT_ROOM_BASE: "room/edit",
    EDIT_ROOM: "room/edit/:id",

    // bill: hóa đơn điện nước
    BILL: "bill",
    ADD_BILL: "bill/add",
    EDIT_BILL_BASE: "bill/edit",
    EDIT_BILL: "bill/edit/:id",

    PERMISSION_DENIED: "permission-denied",
};
