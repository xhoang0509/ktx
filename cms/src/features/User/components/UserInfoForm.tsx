import UploadImage from "@components/UploadImage";
import { Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@heroui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserDetail, genderOptions } from "../types";
import AppUploadImage from "@components/common/AppUploadImage";

interface UserInfoFormProps {
    userData: Partial<UserDetail>;
    onChange: (data: Partial<UserDetail>) => void;
    control?: any;
}

export default function UserInfoForm({
    userData,
    onChange,
    control: externalControl,
}: UserInfoFormProps) {
    const {
        control: internalControl,
        handleSubmit,
        setValue,
        watch,
    } = useForm<Partial<UserDetail>>({
        defaultValues: userData,
    });

    const control = externalControl || internalControl;

    const watchedValues = watch();

    useEffect(() => {
        if (!externalControl) {
            onChange(watchedValues);
        }
    }, [watchedValues, onChange, externalControl]);

    useEffect(() => {
        if (userData && !externalControl) {
            Object.entries(userData).forEach(([key, value]) => {
                setValue(key as keyof UserDetail, value);
            });
        }
    }, [userData, setValue, externalControl]);

    return (
        <Card className="mb-4">
            <CardHeader className="font-semibold text-lg">Thông tin cá nhân</CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center mb-2 max-w-72">
                        {/* <AppUploadImage control={control} name="avatar" /> */}
                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => {
                                if (field.value) {
                                    return (
                                        <UploadImage
                                            maxItems={1}
                                            imagesValue={field.value ? [field.value] : []}
                                            onChangeImagesValue={(urls) =>
                                                field.onChange(urls[0] || "")
                                            }
                                        />
                                    );
                                }
                                return (
                                    <>
                                        <UploadImage
                                            maxItems={1}
                                            imagesValue={field.value ? [field.value] : []}
                                            onChangeImagesValue={(urls) =>
                                                field.onChange(urls[0] || "")
                                            }
                                        />
                                    </>
                                );
                            }}
                        />
                    </div>

                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Họ và tên"
                                placeholder="Nhập họ và tên"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Email"
                                placeholder="Nhập email"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                disabled={true}
                            />
                        )}
                    />

                    <Controller
                        name="student_id"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Mã số sinh viên"
                                placeholder="Nhập mã số sinh viên"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                disabled={true}
                            />
                        )}
                    />

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label="Giới tính"
                                placeholder="Chọn giới tính"
                                selectedKeys={field.value ? [field.value] : []}
                                onChange={(e) => field.onChange(e.target.value)}
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            >
                                {genderOptions.map((option) => (
                                    <SelectItem key={option.value}>{option.label}</SelectItem>
                                ))}
                            </Select>
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="faculty_name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Tên khoa"
                                placeholder="Nhập tên khoa"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="class_code"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                label="Mã lớp"
                                placeholder="Nhập mã lớp"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
            </CardBody>
        </Card>
    );
}
