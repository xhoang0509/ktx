import React from "react";
import { useNavigate } from "react-router";
import { ShieldExclamationIcon, HomeIcon } from "@heroicons/react/24/solid";

const PermissionDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('handleClick')
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <ShieldExclamationIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Không có quyền truy cập</h2>
          <p className="mt-2 text-sm text-gray-600">
            Bạn không có quyền truy cập vào trang này.
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleClick}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Trở lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionDenied;
