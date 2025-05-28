import { AppActions } from "@app/slice";
import { useAppDispatch } from "@app/store";
import AppInput from "@components/common/AppInput";
import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { loginFormDefaultValues } from "@features/Auth/const";
import { loginSchema } from "@features/Auth/schemas/loginSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Divider, Link } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeUserInfo } from "@utils/token.util";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        setIsLoading(true);
        dispatch(
            AppActions.login({
                body: { ...data, rememberMe },
                onSuccess: (data: any) => {
                    storeUserInfo(data);
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            })
        );
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <AuthWrapper>
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
                    <div className="text-center mb-4 lg:mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                            Đăng nhập
                        </h2>
                        <p className="text-gray-600 text-xs lg:text-sm">
                            Vui lòng đăng nhập để tiếp tục
                        </p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                        <div>
                            <AppInput
                                control={control}
                                name="email"
                                type="email"
                                size="lg"
                                label="Email"
                                placeholder="Nhập email của bạn"
                                variant="bordered"
                                radius="lg"
                                className="text-sm lg:text-base"
                            />
                            {errors.email && (
                                <div className="text-danger text-xs mt-1 ml-1">
                                    {errors.email?.message}
                                </div>
                            )}
                        </div>

                        <div>
                            <AppInput
                                type={isPasswordVisible ? "text" : "password"}
                                control={control}
                                name="password"
                                size="lg"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                variant="bordered"
                                radius="lg"
                                className="text-sm lg:text-base"
                                endContent={
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {isPasswordVisible ? (
                                            <EyeSlashIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                        ) : (
                                            <EyeIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.password && (
                                <div className="text-danger text-xs mt-1 ml-1">
                                    {errors.password?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <Checkbox
                            isSelected={rememberMe}
                            onValueChange={setRememberMe}
                            size="sm"
                            color="primary"
                            isDisabled={true}
                        >
                            <span className="text-xs lg:text-sm text-gray-600">
                                Ghi nhớ đăng nhập
                            </span>
                        </Checkbox>

                        <Link
                            href="#"
                            className="text-xs lg:text-sm text-primary hover:text-primary-600"
                            isDisabled={true}
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        radius="lg"
                        isLoading={isLoading}
                        className="w-full font-semibold text-sm lg:text-base"
                        variant="solid"
                    >
                        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>

                    <Divider className="my-4 lg:my-6" />

                    <div className="text-center">
                        <span className="text-xs lg:text-sm text-gray-600">
                            Chưa có tài khoản?{" "}
                            <Link
                                onPress={() => navigate("/register")}
                                className="text-primary hover:text-primary-600 font-semibold cursor-pointer"
                            >
                                Đăng ký ngay
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}
