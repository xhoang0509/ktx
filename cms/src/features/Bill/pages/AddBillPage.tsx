import { AppSelectors } from "@app/slice";
import AppHeader from "@components/AppHeader";
import AppNumberInput from "@components/common/AppNumberInput";
import { ROUTE_PATHS } from "@constants/route.const";
import { BookingRequestActions } from "@features/BookingRequests/services/slice";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import RoomSelectorAdd from "../components/RoomSelectorAdd";
import ServiceFeeInput from "../components/ServiceFeeInput";
import TotalAmount from "../components/TotalAmount";
import { addBillSchema } from "../services/schema";
import { BillActions } from "../services/slice";
import { Contract, defaultBillForm } from "../types";
import { RoomActions, RoomSelectors } from "@features/Room/services/slice";
import { Room } from "@features/Room/types";

export default function AddBillPage() {
    const {
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: defaultBillForm,
        resolver: yupResolver(addBillSchema),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const user = useAppSelector(AppSelectors.userInfo);
    const electricityAmount = watch("electricity.amount") || 0;
    const waterAmount = watch("water.amount") || 0;
    const internetAmount = watch("internet");
    const cleaningAmount = watch("cleaning");

    useEffect(() => {
        const roomPrice = selectedRoom?.base_price
            ? parseInt(selectedRoom.base_price.toString())
            : 0;
        const totalAmount =
            Number(roomPrice) +
            Number(electricityAmount) +
            Number(waterAmount) +
            Number(internetAmount) +
            Number(cleaningAmount);
        setValue("totalAmount", totalAmount);
    }, [electricityAmount, waterAmount, internetAmount, cleaningAmount, selectedRoom, setValue]);

    useEffect(() => {
        dispatch(
            RoomActions.getRoomsInContract({
                onSuccess: (data: any) => {},
            })
        );
    }, []);

    const handleRoomSelect = (room: Room | null) => {
        setSelectedRoom(room);
    };

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            userId: user?.id,
        };
        
        dispatch(
            BillActions.addBill({
                body: payload,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.BILL}`);
                },
            })
        );
    };

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Thêm hóa đơn mới"
                    rightMenu={
                        <Button color="primary" type="submit">
                            Lưu hóa đơn
                        </Button>
                    }
                />
                <div className="p-4 flex-1 overflow-auto bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2 space-y-4">
                                {/* Room selection */}
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="text-lg font-medium mb-4">Phòng thuê</h3>
                                    <RoomSelectorAdd
                                        control={control}
                                        onRoomSelect={handleRoomSelect}
                                    />
                                    {errors.roomId && (
                                        <div className="text-danger text-xs mt-2">
                                            {errors.roomId?.message as string}
                                        </div>
                                    )}
                                </div>

                                {/* Service fees */}
                                <ServiceFeeInput
                                    control={control as any}
                                    watch={watch as any}
                                    setValue={setValue as any}
                                    type="electricity"
                                    label="Tiền điện"
                                    unitLabel="VNĐ/số"
                                    errors={errors}
                                />

                                <ServiceFeeInput
                                    control={control as any}
                                    watch={watch as any}
                                    setValue={setValue as any}
                                    type="water"
                                    label="Tiền nước"
                                    unitLabel="VNĐ/m³"
                                    errors={errors}
                                />

                                {/* Other services */}
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h3 className="text-lg font-medium mb-4">Dịch vụ khác</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-2 text-sm">Internet (VNĐ)</div>
                                            <Controller
                                                control={control}
                                                name="internet"
                                                render={({ field }) => (
                                                    <AppNumberInput
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        min={0}
                                                    />
                                                )}
                                            />
                                            {errors.internet && (
                                                <div className="text-danger text-xs mt-1">
                                                    {errors.internet?.message as string}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className="mb-2 text-sm">Vệ sinh (VNĐ)</div>
                                            <Controller
                                                control={control}
                                                name="cleaning"
                                                render={({ field }) => (
                                                    <AppNumberInput
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        min={0}
                                                    />
                                                )}
                                            />
                                            {errors.cleaning && (
                                                <div className="text-danger text-xs mt-1">
                                                    {errors.cleaning?.message as string}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-4">
                                    <TotalAmount
                                        electricityAmount={electricityAmount}
                                        waterAmount={waterAmount}
                                        internetAmount={internetAmount}
                                        cleaningAmount={cleaningAmount}
                                        selectedRoom={selectedRoom}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
