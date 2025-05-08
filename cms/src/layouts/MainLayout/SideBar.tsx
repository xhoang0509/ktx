import { SITE_MENU } from "@config/site";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Image } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router";
import MenuItem from "./MenuItem";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-w-[260px] p-4 bg-white border-r-1 max-h-[calc(100vh-24px)] overflow-y-auto flex flex-col sticky top-0">
      <div className="text-primary font-bold text-2xl cursor-pointer flex gap-4 items-center">
        <Image src="/logo.jfif" className="w-[50px]" /> ADMIN
      </div>

      <div className="px-2 mt-8 flex-1">
        {SITE_MENU.map((item, index) => (
          <MenuItem item={item} key={`${index}`} />
        ))}
      </div>
      <div className="">
        <button
          className="w-full flex gap-2 items-center p-1 hover:scale-105 transition-transform transform"
          onClick={() => navigate("/logout")}
        >
          <div>
            <PowerIcon className="text-danger size-6" />
          </div>
          <div className={`font-medium text-left text-md flex-1 text-danger`}>
            Đăng xuất
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
