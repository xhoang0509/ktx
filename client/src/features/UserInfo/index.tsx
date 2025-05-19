import { AppActions } from "@app/slice";
import { useAppDispatch } from "@app/store";
import defaultAvatar from "@assets/images/default_avatar.jpg";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import { UserService } from "@services/user.service";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AvatarUpload from "./components/AvatarUpload";
import UserInfoEdit from "./components/UserInfoEdit";
import { UserDetail } from "./types";
const UserInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isAvatarUploading, setIsAvatarUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    const [userInfo, setUserInfo] = useState<UserDetail | null>(null);

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const res = await UserService.getUserInfo();
            if (res.status === 200) {
                setUserInfo(res.data);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            toast.error("Không thể tải thông tin người dùng");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const avatar = useMemo(() => {
        return userInfo?.avatar
            ? `${import.meta.env.VITE_API_BASE}/${userInfo?.avatar}`
            : defaultAvatar;
    }, [userInfo]);

    const handleUpdateUserInfo = async (updatedData: Partial<UserDetail>) => {
        setIsUpdating(true);
        try {
            const res = await UserService.updateUserInfo(updatedData);
            if (res.status === 200) {
                toast.success("Cập nhật thông tin thành công");
                fetchUserInfo();
                dispatch(
                    AppActions.getUserInfo({
                        onSuccess: (data: any) => dispatch(AppActions.setUserInfo(data)),
                    })
                );
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            toast.error("Không thể cập nhật thông tin");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Thông tin sinh viên</h1>
                <Button color="primary" variant="light" onClick={handleGoBack}>
                    <ArrowLeftIcon className="size-4" />
                    Quay lại
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {isLoading && (
                    <div className="flex justify-center p-6">
                        <Spinner />
                    </div>
                )}
                {!isLoading && userInfo && Object.keys(userInfo).length > 0 && (
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                <AvatarUpload
                                    currentAvatar={avatar}
                                    onUpdate={handleUpdateUserInfo}
                                    isLoading={isAvatarUploading}
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                            <div className="md:w-2/3">
                                <UserInfoEdit
                                    user={userInfo}
                                    onUpdate={handleUpdateUserInfo}
                                    isLoading={isUpdating}
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
