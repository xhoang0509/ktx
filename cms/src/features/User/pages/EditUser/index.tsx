import AppHeader from "@components/AppHeader";
import { ROUTE_PATHS } from "@constants/route.const";
import UserInfoForm from "@features/User/components/UserInfoForm";
import UserStatusSection from "@features/User/components/UserStatusSection";
import { UserActions } from "@features/User/services/slice";
import { editUserSchema } from "@features/User/services/validation";
import { UserDetail, UserStatus } from "@features/User/types";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface EditUserFormData {
    id?: string;
    full_name: string;
    email: string;
    gender: "male" | "female" | "other";
    phone: string;
    student_id: string;
    avatar?: string;
    faculty_name: string;
    class_code: string;
    birth_date: string;
    address: string;
    status: UserStatus;
    createdAt?: string;
    updatedAt?: string;
}

const defaultEditUserForm: EditUserFormData = {
    email: "",
    full_name: "",
    phone: "",
    gender: "other",
    status: "active",
    student_id: "",
    faculty_name: "",
    class_code: "",
    birth_date: "",
    address: "",
    createdAt: "",
    updatedAt: "",
};

export default function EditUserPage() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EditUserFormData>({
        defaultValues: defaultEditUserForm,
        resolver: yupResolver(editUserSchema),
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<UserDetail | null>(null);
    const [editedData, setEditedData] = useState<Partial<UserDetail>>({});
    const [saveLoading, setSaveLoading] = useState(false);

    const onSubmit = (data: any) => {
        delete data.id
        dispatch(
            UserActions.editUser({
                id: id,
                data: data,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.USER}`);
                },
            })
        );
    };

    useEffect(() => {
        if (id) {
            dispatch(
                UserActions.getDetailUser({
                    id: id,
                    onSuccess: (data: any) => {
                        reset(data), setUserData(data);
                    },
                })
            );
        }
    }, [dispatch]);

    const handleUserInfoChange = (data: Partial<UserDetail>) => {
        setEditedData((prev) => ({ ...prev, ...data }));
    };

    const handleStatusChange = (status: UserStatus) => {
        setEditedData((prev) => ({ ...prev, status }));
        setValue("status", status);
    };

    const handleSave = () => {
        handleSubmit(onSubmit)();
    };

    const handleCancel = () => {
        navigate("/user");
    };

    // Get user status label for the header
    const getUserStatusLabel = () => {
        const status = editedData.status || userData?.status;
        switch (status) {
            case "active":
                return <span className="text-green-500">Đang hoạt động</span>;
            case "inactive":
                return <span className="text-red-500">Đã khóa</span>;
            case "graduated":
                return <span className="text-blue-500">Đã tốt nghiệp</span>;
            case "deleted":
                return <span className="text-gray-500">Đã xóa</span>;
            default:
                return null;
        }
    };

    if (!userData) {
        return <div className="p-4">Không tìm thấy người dùng</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Chỉnh sửa người dùng"
                    rightMenu={
                        <div className="flex gap-2">
                            <Button color="default" variant="light" onClick={handleCancel}>
                                Quay lại
                            </Button>
                            <Button color="primary" type="submit" onClick={handleSave} isLoading={saveLoading}>
                                Lưu thay đổi
                            </Button>
                        </div>
                    }
                />

                <div className="p-4 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{userData.full_name}</h2>
                            <div className="text-sm">Trạng thái: {getUserStatusLabel()}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-8">
                            <UserInfoForm
                                userData={userData}
                                onChange={handleUserInfoChange}
                                control={control}
                            />
                        </div>
                        <div className="lg:col-span-4">
                            <UserStatusSection
                                status={editedData.status || userData.status}
                                onChange={handleStatusChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
