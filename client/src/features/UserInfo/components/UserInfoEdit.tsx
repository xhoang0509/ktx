import { CheckIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { getGender } from "@utils/gender.util";
import React, { useState } from "react";
import { UserDetail } from "../types";

interface UserInfoEditProps {
    user: UserDetail;
    onUpdate: (updatedData: Partial<UserDetail>) => void;
    isLoading?: boolean;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

const UserInfoEdit: React.FC<UserInfoEditProps> = ({
    user,
    onUpdate,
    isLoading = false,
    isEditing,
    setIsEditing,
}) => {
    const [formData, setFormData] = useState({
        full_name: user.full_name,
        phone: user.phone || "",
        birth_date: user.birth_date || "",
        address: user.address || "",
        faculty_name: user.faculty_name,
        class_code: user.class_code,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            setFormData({
                full_name: user.full_name,
                phone: user.phone || "",
                birth_date: user.birth_date || "",
                address: user.address || "",
                faculty_name: user.faculty_name,
                class_code: user.class_code,
            });
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
                <Button
                    color={isEditing ? "default" : "primary"}
                    variant={isEditing ? "flat" : "light"}
                    onPress={toggleEdit}
                    className="flex items-center space-x-1"
                    disabled={isLoading}
                >
                    {isEditing ? (
                        <>
                            <span>Hủy</span>
                        </>
                    ) : (
                        <>
                            <PencilIcon className="w-4 h-4" />
                            <span>Chỉnh sửa</span>
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Họ và tên</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.full_name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Email</label>
                    <p className="text-base font-medium">{user.email}</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Ngày sinh</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.birth_date}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Hộ khẩu thường trú</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.address}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Mã sinh viên</label>
                    <p className="text-base font-medium">{user.student_id}</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Giới tính</label>
                    <p className="text-base font-medium">{getGender(user.gender)}</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Số điện thoại</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.phone || "Chưa có thông tin"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Khoa</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="faculty_name"
                            value={formData.faculty_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.faculty_name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Lớp</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="class_code"
                            value={formData.class_code}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-base font-medium">{user.class_code}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500">Trạng thái</label>
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end mt-4">
                    <Button
                        color="primary"
                        onPress={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center space-x-1"
                    >
                        <CheckIcon className="w-4 h-4" />
                        <span>Lưu thay đổi</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UserInfoEdit;
