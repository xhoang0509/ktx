import { ROUTE_PATHS } from "@constants/route.const";

export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Ký túc xá Đẳnk Kấp";
export const SITE_DESCRIPTION = "Ký túc xá Đẳnk Kấp - đẳng cấp là mãi mãi!";
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
];
