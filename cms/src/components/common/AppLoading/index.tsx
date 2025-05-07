import { Spinner } from "@heroui/react";
import { FC } from "react";

const AppLoading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return isLoading ? (
    <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-5 z-50">
      <Spinner size="lg" variant="gradient" />
    </div>
  ) : null;
};

export default AppLoading;
