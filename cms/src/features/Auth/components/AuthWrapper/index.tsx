import React, { ReactNode } from "react";
import { SITE_NAME } from "@config/site";

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center grow-1 gap-8 px-8 grow">
      <div className="rounded-4xl shadow-2xl h-[500px] w-[600px] border-1 border-gray-100 p-8 rounded-2xl">
        <div className="text-2xl font-semibold mb-4 text-primary text-center">
          {SITE_NAME}
        </div>
        {children}
        <div>
          <form></form>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
