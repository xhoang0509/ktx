import {
  ChevronDownIcon,
  ChevronRightIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router";

function MenuItem({ item }: any) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const Icon = item.icon;
  return (
    <div className="mb-4">
      <button
        className="w-full flex gap-2 items-center p-1 hover:scale-105 transition-transform transform"
        onClick={() => navigate(item.path)}
      >
        <div>
          <Icon className="text-primary size-6" />
        </div>
        <div
          className={`font-medium text-left text-md flex-1 ${
            pathname.split("/").indexOf(item?.path.replace("/", "")) > 0 ||
            pathname === item?.path
              ? "text-primary"
              : "text-[#00000099]"
          }`}
        >
          {item?.label}
        </div>
        {item?.children !== undefined ? (
          <div className="transition-transform transform">
            {(item?.children || []).length > 0 ? (
              <div>
                <ChevronDownIcon className="size-4 text-primary" />
              </div>
            ) : (
              <div>
                <ChevronRightIcon className="size-4 text-primary" />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </button>
      {(item?.children || []).map((x: any, index: any) => {
        return (
          <button
            key={`${index}`}
            className="ml-2 w-full flex items-center p-1 hover:scale-105 transition-transform transform"
            onClick={() => navigate(item.path)}
          >
            <div className="mr-4">
              <MinusIcon className="size-4 text-primary" />
            </div>
            <span
              className={`text-sm ${
                pathname === x?.path
                  ? "text-primary font-medium"
                  : "text-[#00000099]"
              }`}
            >
              {x?.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MenuItem;
