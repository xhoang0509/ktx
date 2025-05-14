import { AppActions } from "@app/slice";
import { useAppDispatch } from "@app/store";
import AppInput from "@components/common/AppInput";
import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { loginFormDefaultValues } from "@features/Auth/const";
import { loginSchema } from "@features/Auth/schemas/loginSchema";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeUserInfo } from "@utils/token.util";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: loginFormDefaultValues,
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        dispatch(
            AppActions.login({
                body: data,
                onSuccess: (data: any) => {
                    storeUserInfo(data);
                },
            })
        );
    };

    return (
        <AuthWrapper>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-2xl font-semibold mb-4">Đăng nhập</div>
                    <div>
                        <div className="mb-2">Tên đăng nhập</div>
                        <AppInput control={control} name="username" type="text" size="lg" />
                        <div className="text-danger text-xs mt-1">{errors.username?.message}</div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2">Mật khẩu</div>
                        <AppInput type="password" control={control} name="password" />
                        <div className="text-danger text-xs mt-1">{errors.password?.message}</div>
                    </div>
                    <div className="mt-6">
                        <Button className="btn w-full" type="submit" color="primary">
                            Đăng nhập
                        </Button>
                    </div>
                    <div className="text-right mt-2">
                        <span
                            className="underline hover:text-secondary text-sm cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Chưa có tài khoản?
                        </span>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}
