import { useAppDispatch } from "@services/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import AppHeader from "@components/AppHeader";
import AppInput from "@components/common/AppInput";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Input } from "@heroui/react";
import SysFetch from "@services/axios";
import { formatDateTimeDetail, formatUserStatus, getColorUserStatus } from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";

const defaultUserForm = {
    id: "",
    username: "",
    full_name: "",
    phone: "",
    gender: "",
    role: "",
    status: "",
    student_id: "",
    createdAt: "",
    updatedAt: "",
};

export default function ViewUserPage() {
    const { register, control, reset, watch, setValue, getFieldState } = useForm({
        defaultValues: defaultUserForm,
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    // Watch the gender field to get its current value
    const genderValue = watch("gender");
    const statusValue = watch("status");
    const createdAtValue = watch("createdAt");
    const updatedAtValue = watch("updatedAt");

    const formattedCreatedAt = formatDateTimeDetail(createdAtValue);
    const formattedUpdatedAt = formatDateTimeDetail(updatedAtValue);

    const fetch = async () => {
        if (id) {
            const rs: { [x: string]: any } = await SysFetch.get(`/user/${id}`);
            if (rs.data) {
                reset(rs.data);
            }
            console.log(rs);
        }
    };

    useEffect(() => {
        fetch();
    }, [id, dispatch]);

    const handleBack = () => {
        navigate("/user");
    };

    return (
        <div className="h-full flex flex-col">
            <form>
                <AppHeader
                    pageTitle="Thông tin sinh viên"
                    rightMenu={
                        <Button
                            variant="light"
                            color="primary"
                            className="flex items-center gap-1"
                            onClick={handleBack}
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                            <span>Quay lại</span>
                        </Button>
                    }
                />
                <div className="p-4 flex-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4 col-span-4">
                            <div className="col-span-6">
                                <div className="mb-2">Username</div>
                                <AppInput control={control} name="username" disabled={true} />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Họ và tên</div>
                                <AppInput control={control} name="full_name" readOnly />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Giới tính</div>
                                <Input value={convertGenderToVietnamese(genderValue)} readOnly />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Số điện thoại</div>
                                <AppInput control={control} name="phone" readOnly />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Mã sinh viên</div>
                                <AppInput control={control} name="student_id" readOnly />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Ngày tạo</div>
                                <Input 
                                    value={formattedCreatedAt} 
                                    readOnly 
                                />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Lần cập nhật cuối cùng</div>
                                <Input 
                                    value={formattedUpdatedAt} 
                                    readOnly 
                                />
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Trạng thái</div>
                                <Chip color={getColorUserStatus(statusValue)}>
                                    <span className="text-white">
                                        {formatUserStatus(statusValue)}
                                    </span>
                                </Chip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
