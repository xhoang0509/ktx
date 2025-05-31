import AppHeader from "@components/AppHeader";
import AppInput from "@components/common/AppInput";
import AppNumberInput from "@components/common/AppNumberInput";
import AppSelect from "@components/common/AppSelect";
import AppTextarea from "@components/common/AppTextArea";
import AppUploadImage from "@components/common/AppUploadImage";
import { ROUTE_PATHS } from "@constants/route.const";
import { DeviceActions, DeviceSelectors } from "@features/Device/services/slice";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, Select, SelectItem } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addRoomSchema, defaultAddRoomForm, genderOptions, statusOptions } from "../services/const";
import { RoomActions } from "../services/slice";

export default function AddRoom() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultAddRoomForm,
        resolver: yupResolver(addRoomSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "devices",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const devices = useAppSelector(DeviceSelectors.devices);

    useEffect(() => {
        dispatch(DeviceActions.getDevicesActive({ onSuccess: () => {} }));
    }, []);

    const onSubmit = (data: any) => {
        dispatch(
            RoomActions.addRoom({
                body: data,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.ROOM}`);
                },
            })
        );
    };

    const addDevice = () => {
        append({ deviceId: 0, quantity: 1 });
    };

    console.log(devices);

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Thêm mới phòng"
                    rightMenu={
                        <Button color="primary" type="submit">
                            Lưu
                        </Button>
                    }
                />
                <div className="p-4 flex-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4 col-span-4">
                            <div className="col-span-6">
                                <div className="mb-2">Tên phòng</div>
                                <AppInput control={control} name="name" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.name?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Giới tính</div>
                                <AppSelect control={control} name="gender" size="md">
                                    {genderOptions.map((item) => (
                                        <SelectItem key={item.key}>{item.label}</SelectItem>
                                    ))}
                                </AppSelect>
                                <div className="text-danger text-xs mt-1">
                                    {errors.gender?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Sức chứa tối đa</div>
                                <AppNumberInput
                                    control={control}
                                    name="max_capacity"
                                    size="sm"
                                    minValue={1}
                                    maxValue={100}
                                    formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                                />
                                <div className="text-danger text-xs mt-1">
                                    {errors.max_capacity?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Giá cơ bản</div>
                                <AppNumberInput
                                    step={10000}
                                    control={control}
                                    name="base_price"
                                    size="sm"
                                    minValue={0}
                                    maxValue={999999999}
                                    formatOptions={{ style: "currency", currency: "VND" }}
                                />
                                <div className="text-danger text-xs mt-1">
                                    {errors.base_price?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Tầng</div>
                                <AppNumberInput
                                    control={control}
                                    name="floor"
                                    size="sm"
                                    minValue={0}
                                    maxValue={999999999}
                                />
                                <div className="text-danger text-xs mt-1">
                                    {errors.floor?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Tòa nhà</div>
                                <AppInput control={control} name="building" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.building?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Loại phòng</div>
                                <AppInput control={control} name="type" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.type?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="mb-2">Trạng thái</div>
                                <AppSelect control={control} name="status" size="md">
                                    {statusOptions.map((item) => (
                                        <SelectItem key={item.key}>{item.label}</SelectItem>
                                    ))}
                                </AppSelect>
                                <div className="text-danger text-xs mt-1">
                                    {errors.status?.message}
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="mb-2 flex items-center justify-between">
                                    <span>Thiết bị</span>
                                    <Button
                                        type="button"
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                        startContent={<PlusIcon className="w-4 h-4" />}
                                        onClick={addDevice}
                                    >
                                        Thêm thiết bị
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-3 items-start">
                                            <div className="flex-1">
                                                <Controller
                                                    control={control}
                                                    name={`devices.${index}.deviceId`}
                                                    render={({ field }) => {
                                                        return (
                                                            <>
                                                                <Select
                                                                    placeholder="Chọn thiết bị"
                                                                    size="sm"
                                                                    selectedKeys={
                                                                        field.value &&
                                                                        field.value !== 0
                                                                            ? [
                                                                                  field.value.toString(),
                                                                              ]
                                                                            : []
                                                                    }
                                                                    onSelectionChange={(keys) => {
                                                                        const selectedKey =
                                                                            Array.from(keys)[0];
                                                                        field.onChange(
                                                                            selectedKey
                                                                                ? Number(
                                                                                      selectedKey
                                                                                  )
                                                                                : 0
                                                                        );
                                                                    }}
                                                                >
                                                                    {devices.map((device) => (
                                                                        <SelectItem
                                                                            key={device.id.toString()}
                                                                        >
                                                                            {device.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </>
                                                        );
                                                    }}
                                                />
                                            </div>

                                            <div className="w-24">
                                                <AppNumberInput
                                                    control={control}
                                                    name={`devices.${index}.quantity`}
                                                    size="sm"
                                                    minValue={1}
                                                    maxValue={100}
                                                    placeholder="SL"
                                                    formatOptions={{
                                                        style: "decimal",
                                                        maximumFractionDigits: 0,
                                                    }}
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                size="sm"
                                                color="danger"
                                                variant="flat"
                                                isIconOnly
                                                onClick={() => remove(index)}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    {fields.length === 0 && (
                                        <div className="text-gray-500 text-sm text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                                            Chưa có thiết bị nào được chọn
                                        </div>
                                    )}
                                </div>

                                <div className="text-danger text-xs mt-1">
                                    {errors.devices?.message}
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="mb-2">Ghi chú</div>
                                <AppTextarea control={control} name="note" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.note?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl p-4 shadow-md sticky top-[82px] flex flex-col gap-4">
                            <div>
                                <div className="mb-2">Hình ảnh phòng</div>
                                <AppUploadImage control={control} name="images" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.images?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
