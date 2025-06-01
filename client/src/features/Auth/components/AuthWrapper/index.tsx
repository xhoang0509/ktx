import loginBackground from "@assets/images/login-background.jpg";
import schoolLogo from "@assets/images/school_logo.jpg";
import { SITE_NAME } from "@config/site";
import { Card, CardBody } from "@heroui/react";
import React, { ReactNode } from "react";

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left side - Form */}
            <div className="flex-1 flex justify-center items-center p-4 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                <Card className="w-full max-w-md shadow-2xl">
                    <CardBody className="p-6 lg:p-8">
                        {/* Logo and Header */}
                        <div className="text-center mb-6 lg:mb-8">
                            <div className="flex justify-center mb-4">
                                <img
                                    src={schoolLogo}
                                    alt="School Logo"
                                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain rounded-full shadow-lg"
                                />
                            </div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                {SITE_NAME}
                            </h1>
                            <p className="text-gray-600 text-xs lg:text-sm">
                                Hệ thống quản lý ký túc xá
                            </p>
                        </div>

                        {children}

                        {/* Footer */}
                        <div className="text-center mt-4 lg:mt-6 text-xs text-gray-500">
                            <p>© 2025 {SITE_NAME}. Tất cả quyền được bảo lưu.</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Right side - Background Image */}
            <div
                className="hidden lg:flex lg:flex-1 bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${loginBackground})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-8 max-w-md">
                        <h2 className="text-3xl font-bold mb-4">Chào mừng bạn đến với</h2>
                        <h3 className="text-2xl font-semibold mb-4 text-yellow-300">{SITE_NAME}</h3>
                        <p className="text-lg opacity-90">
                            Trải nghiệm cuộc sống sinh viên tuyệt vời với chúng tôi.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile background overlay - shown only on mobile */}
            <div
                className="lg:hidden absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: `url(${loginBackground})` }}
            >
                <div className="absolute inset-0 bg-white bg-opacity-90"></div>
            </div>
        </div>
    );
};

export default AuthWrapper;
