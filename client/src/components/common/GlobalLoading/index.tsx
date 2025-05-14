import { Spinner } from "@heroui/react";
import { FC } from "react";

const GlobalLoading: FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner size="lg" variant="gradient" />
    </div>
  );
};

export default GlobalLoading;
