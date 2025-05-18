import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import { UserService } from "@services/user.service";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import UserAvatar from "./components/UserAvatar";
import UserInfoFields from "./components/UserInfoFields";
import { mockUserData, UserDetail } from "./types";
import defaultAvatar from "@assets/images/default_avatar.jpg";
const UserInfo: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    const [userInfo, setUserInfo] = useState<UserDetail | null>(null);

    useEffect(() => {
        setIsLoading(true);
        UserService.getUserInfo().then((res) => {
            if (res.status === 200) {
                setUserInfo(res.data);
            }
            setIsLoading(false);
        });
    }, []);

    const avatar = useMemo(() => {
        return `${import.meta.env.VITE_API_BASE}/${userInfo?.avatar}` || defaultAvatar;
    }, [userInfo]);

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
                {isLoading && <Spinner />}
                {!isLoading && userInfo && Object.keys(userInfo).length > 0 && (
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                <UserAvatar avatar={avatar} name={userInfo.full_name} />
                            </div>
                            <div className="md:w-2/3">
                                <UserInfoFields user={userInfo} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
