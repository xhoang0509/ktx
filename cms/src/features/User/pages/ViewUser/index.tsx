import { useAppDispatch } from "@services/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import AppHeader from "@components/AppHeader";
import AppInput from "@components/common/AppInput";
import { UserActions } from "@features/User/services/slice";
import SysFetch from "@services/axios";
import { convertGenderToVietnamese } from "@utils/gender.util";
import { form } from "@heroui/react";

const defaultUserForm = {
    id: "",
    username: "",
    full_name: "",
    phone: "",
    gender: "",
    role: "",
    status: "",
    student_id: "",
};

export default function ViewUserPage() {
    const {
        register,
        control,
        reset,
        watch,
        setValue,
        getFieldState
    } = useForm({
        defaultValues: defaultUserForm,
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
console.log(getFieldState("gender"));

    const fetch = async () => {
        if (id) {
            const rs: { [x: string]: any } = await SysFetch.get(`/user/${id}`);
            if (rs.data) {
                reset(rs.data)
            }
            console.log(rs);
        }
    }

    useEffect(() => {
        fetch()
    }, [id, dispatch]);


    return (
        <div className="h-full flex flex-col">
            <form >
                <AppHeader
                    pageTitle="Thông tin sinh viên"
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
                                <AppInput control={control} name="full_name"  readOnly/>

                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Giới tính</div>
                                {convertGenderToVietnamese("")}
                                <AppInput control={control} name="gender" readOnly />

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
                                <div className="mb-2">Trạng thái</div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
