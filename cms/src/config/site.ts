import {
  ClipboardDocumentListIcon,
  CubeIcon,
  CubeTransparentIcon,
  HomeIcon,
  Square3Stack3DIcon,
  UserIcon,
  NewspaperIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid";

export const SITE_NAME =
  import.meta.env.VITE_APP_SITE_NAME || "{empty-site-name}";

export const SITE_DESCRIPTION = "Nội thất Kadi House - đẳng cấp là mãi mãi!";

export const SITE_CONTACT = {
  ADDRESS: "Đường 123 - Hà Nội",
  PHONE: "0123456789",
  EMAIL: "dankkap@gmail.com",
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
    label: "Danh mục phòng",
    path: "/category",
    icon: Square3Stack3DIcon,
  },
  {
    label: "Phòng",
    path: "/room",
    icon: CubeIcon,
  },
  {
    label: "Yêu cầu",
    path: "/request",
    icon: ReceiptPercentIcon,
  },
  {
    label: "Thông báo",
    path: "/blog",
    icon: NewspaperIcon,
  },
  // {
  //   label: "Banner",
  //   path: "/banner",
  //   icon: NewspaperIcon,
  // },
];
