import {
    BanknotesIcon,
    ClipboardDocumentListIcon,
    CubeIcon,
    HomeIcon,
    ReceiptPercentIcon,
    UserIcon,
} from "@heroicons/react/24/solid";

export const SITE_NAME = import.meta.env.VITE_APP_SITE_NAME || "{empty-site-name}";

export const SITE_DESCRIPTION = "Room Tracking";

export const SITE_CONTACT = {
    ADDRESS: "Đường 123 - Hà Nội",
    PHONE: "0123456789",
    EMAIL: "roomtracking@gmail.com",
};

export const SITE_MENU = [
    {
        label: "Thống kê",
        path: "/",
        icon: HomeIcon,
    },
    {
        label: "Sinh viên",
        path: "/user",
        icon: UserIcon,
    },
    {
        label: "Thiết bị",
        path: "/device",
        icon: ClipboardDocumentListIcon,
    },
    {
        label: "Phòng",
        path: "/room",
        icon: CubeIcon,
    },
    {
        label: "Hợp đồng thuê phòng",
        path: "/request",
        icon: ReceiptPercentIcon,
    },
    {
        label: "Hóa đơn điện nước",
        path: "/bill",
        icon: BanknotesIcon,
    },
];
