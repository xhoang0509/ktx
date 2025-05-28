import { ROUTE_PATHS } from "@constants/route.const";

export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Room Tracking";
export const SITE_DESCRIPTION = "Room Tracking";
export const SITE_NAVBAR = [
  {
    label: "Trang chủ",
    to: ROUTE_PATHS.DEFAULT,
  },
  {
    label: "Đăng ký phòng",
    to: ROUTE_PATHS.ROOM_REGISTRATION,
  },
  {
    label: "Liên hệ",
    to: ROUTE_PATHS.CONTACT,
  },
  {
    label: "Bài viết",
    to: ROUTE_PATHS.BLOG,
  },
];
