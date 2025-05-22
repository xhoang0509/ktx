import AppHeader from "@components/AppHeader";
import AppInput from "@components/common/AppInput";
import AppNumberInput from "@components/common/AppNumberInput";
import AppSelect from "@components/common/AppSelect";
import AppUploadImage from "@components/common/AppUploadImage";
import { ROUTE_PATHS } from "@constants/route.const";
import { Button, SelectItem } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@services/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { addRoomSchema, defaultAddRoomForm, genderOptions, statusOptions } from "../services/const";
import { RoomActions } from "../services/slice";
import AppTextarea from "@components/common/AppTextArea";

export default function EditRoomPage() {
    const { id } = useParams();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: defaultAddRoomForm,
        resolver: yupResolver(addRoomSchema),
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        dispatch(
            RoomActions.editRoom({
                body: data,
                id,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.ROOM}`);
                },
            })
        );
    };

    useEffect(() => {
        if (id) {
            dispatch(
                RoomActions.getDetailRoom({
                    id,
                    onSuccess: (data: any) => {
                        console.log("data", data);
                        reset(data);
                    },
                })
            );
        }
    }, [dispatch]);

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Sửa phòng"
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
                                    {errors.building?.message}
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

                            <div className="col-span-6">
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
