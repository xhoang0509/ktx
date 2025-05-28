import { AppActions } from "@app/slice";
import { useAppDispatch } from "@app/store";
import AppInput from "@components/common/AppInput";
import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { registerFormDefaultValues } from "@features/Auth/const";
import { registerSchema } from "@features/Auth/schemas/registerSchema";
import { Button, Divider, Link, Checkbox } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    
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
        if (!acceptTerms) {
            alert("Vui lòng đồng ý với điều khoản sử dụng");
            return;
        }
        
        setIsLoading(true);
        dispatch(
            AppActions.register({ 
                body: data,
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                }
            })
        );
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <AuthWrapper>
            <div className="w-full max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:space-y-4">
                    <div className="text-center mb-4 lg:mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Đăng ký</h2>
                        <p className="text-gray-600 text-xs lg:text-sm">Tạo tài khoản mới để sử dụng dịch vụ</p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                        <div>
                            <AppInput 
                                control={control} 
                                name="email" 
                                type="email" 
                                size="md"
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
                                control={control} 
                                name="full_name" 
                                type="text" 
                                size="md"
                                label="Họ và tên"
                                placeholder="Nhập họ và tên đầy đủ"
                                variant="bordered"
                                radius="lg"
                                className="text-sm lg:text-base"
                            />
                            {errors.full_name && (
                                <div className="text-danger text-xs mt-1 ml-1">
                                    {errors.full_name?.message}
                                </div>
                            )}
                        </div>

                        <div>
                            <AppInput 
                                control={control} 
                                name="student_id" 
                                type="text" 
                                size="md"
                                label="Mã sinh viên"
                                placeholder="Nhập mã sinh viên"
                                variant="bordered"
                                radius="lg"
                                className="text-sm lg:text-base"
                            />
                            {errors.student_id && (
                                <div className="text-danger text-xs mt-1 ml-1">
                                    {errors.student_id?.message}
                                </div>
                            )}
                        </div>

                        <div>
                            <AppInput 
                                type={isPasswordVisible ? "text" : "password"} 
                                control={control} 
                                name="password"
                                size="md"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
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

                        <div>
                            <AppInput 
                                type={isConfirmPasswordVisible ? "text" : "password"} 
                                control={control} 
                                name="confirm_password"
                                size="md"
                                label="Nhập lại mật khẩu"
                                placeholder="Nhập lại mật khẩu"
                                variant="bordered"
                                radius="lg"
                                className="text-sm lg:text-base"
                                endContent={
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {isConfirmPasswordVisible ? (
                                            <EyeSlashIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                        ) : (
                                            <EyeIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.confirm_password && (
                                <div className="text-danger text-xs mt-1 ml-1">
                                    {errors.confirm_password?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                        <Checkbox
                            isSelected={acceptTerms}
                            onValueChange={setAcceptTerms}
                            size="sm"
                            color="primary"
                            className="mt-1"
                        />
                        <span className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                            Tôi đồng ý với{" "}
                            <Link href="#" className="text-primary hover:text-primary-600">
                                điều khoản sử dụng
                            </Link>
                            {" "}và{" "}
                            <Link href="#" className="text-primary hover:text-primary-600">
                                chính sách bảo mật
                            </Link>
                        </span>
                    </div>

                    <Button 
                        type="submit" 
                        color="primary"
                        size="lg"
                        radius="lg"
                        isLoading={isLoading}
                        isDisabled={!acceptTerms}
                        className="w-full font-semibold text-sm lg:text-base"
                        variant="solid"
                    >
                        {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
                    </Button>

                    <Divider className="my-3 lg:my-4" />

                    <div className="text-center">
                        <span className="text-xs lg:text-sm text-gray-600">
                            Đã có tài khoản?{" "}
                            <Link 
                                onPress={() => navigate("/login")}
                                className="text-primary hover:text-primary-600 font-semibold cursor-pointer"
                            >
                                Đăng nhập ngay
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default Register;
