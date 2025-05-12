import { AppActions } from "@app/slice";
import { useAppDispatch } from "@app/store";
import AppInput from "@components/common/AppInput";
import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { registerFormDefaultValues } from "@features/Auth/const";
import { registerSchema } from "@features/Auth/schemas/registerSchema";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: registerFormDefaultValues,
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: any) => {
        dispatch(AppActions.register({ body: data }));
    };
    return (
        <AuthWrapper>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-2xl font-semibold mb-4">Đăng ký</div>
                    <div>
                        <div className="mb-2">Tên đăng nhập</div>
                        <AppInput control={control} name="username" type="text" size="lg" />
                        <div className="text-danger text-xs mt-1">{errors.username?.message}</div>
                    </div>
                    <div>
                        <div className="mb-2">Họ và tên</div>
                        <AppInput control={control} name="full_name" type="text" size="lg" />
                        <div className="text-danger text-xs mt-1">{errors.full_name?.message}</div>
                    </div>
                    <div>
                        <div className="mb-2">Mã sinh viên</div>
                        <AppInput control={control} name="student_id" type="text" size="lg" />
                        <div className="text-danger text-xs mt-1">{errors.student_id?.message}</div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2">Mật khẩu</div>
                        <AppInput type="password" control={control} name="password" />
                        <div className="text-danger text-xs mt-1">{errors.password?.message}</div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2">Nhập lại mật khẩu</div>
                        <AppInput type="password" control={control} name="confirm_password" />
                        <div className="text-danger text-xs mt-1">
                            {errors.confirm_password?.message}
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button className="btn w-full" type="submit" color="primary">
                            Đăng nhập
                        </Button>
                    </div>
                    <div className="text-right mt-2">
                        <span
                            className="underline hover:text-secondary text-sm cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Đã có tài khoản?
                        </span>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default Register;
