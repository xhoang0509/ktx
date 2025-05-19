import AppUploadImage from "@components/common/AppUpdateImage";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserDetail } from "../types";

interface AvatarUploadProps {
    currentAvatar: string;
    onUpdate: (updatedData: Partial<UserDetail>) => void;
    isLoading?: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
    currentAvatar,
    onUpdate,
    isLoading = false,
    setIsEditing,
}) => {
    const { control, watch } = useForm();

    const avatar = watch("avatar");

    useEffect(() => {
        if (avatar && avatar.length === 1) {
            onUpdate({ avatar: avatar[0] });
            // setIsEditing(true);
        }
    }, [avatar]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <img
                    src={currentAvatar}
                    alt="User avatar"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
                {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
            </div>

            <form className="p-10">
                <AppUploadImage control={control} name="avatar" maxItems={1} />
            </form>
        </div>
    );
};

export default AvatarUpload;
