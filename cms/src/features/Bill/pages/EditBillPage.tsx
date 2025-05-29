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
import { useNavigate, useParams } from "react-router";
import RoomSelector from "../components/RoomSelector";
import ServiceFeeInput from "../components/ServiceFeeInput";
import TotalAmount from "../components/TotalAmount";
import { addBillSchema } from "../services/schema";
import { BillActions } from "../services/slice";
import { Contract, defaultBillForm } from "../types";

export default function EditBillPage() {
    const { id } = useParams();
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
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const user = useAppSelector(AppSelectors.userInfo);
    const electricityAmount = watch("electricity.amount") || 0;
    const waterAmount = watch("water.amount") || 0;
    const internetAmount = watch("internet");
    const cleaningAmount = watch("cleaning");
    const totalAmount = watch("totalAmount");

    useEffect(() => {
        const roomPrice = selectedContract?.room?.base_price
            ? parseInt(selectedContract.room.base_price.toString())
            : 0;
        const totalAmount =
            roomPrice + electricityAmount + waterAmount + internetAmount + cleaningAmount;
        setValue("totalAmount", totalAmount);
    }, [
        electricityAmount,
        waterAmount,
        internetAmount,
        cleaningAmount,
        selectedContract,
        setValue,
    ]);

    useEffect(() => {
        if (id) {
            dispatch(
                BillActions.getBillDetail({
                    id,
                    onSuccess: (data: any) => {
                        reset(data);
                        setSelectedContract(data.contract);
                        setValue("contractId", data.contract.id);
                    },
                })
            );
        }
    }, []);

    useEffect(() => {
        dispatch(
            BookingRequestActions.getBookingRequests({
                data: { active: true },
                onSuccess: (data: any) => {},
            })
        );
    }, []);

    const handleContractSelect = (contract: Contract | null) => {
        setSelectedContract(contract);
    };

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            userId: user?.id,
        };
        console.log(91, payload);
        dispatch(
            BillActions.editBill({
                id,
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
                    pageTitle="Sửa hóa đơn"
                    rightMenu={
                        <Button color="primary" type="submit">
                            Sửa hóa đơn
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
                                    <RoomSelector
                                        control={control}
                                        onContractSelect={handleContractSelect}
                                        selectedContract={selectedContract}
                                    />
                                    {errors.contractId && (
                                        <div className="text-danger text-xs mt-2">
                                            {errors.contractId?.message as string}
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
                                />

                                <ServiceFeeInput
                                    control={control as any}
                                    watch={watch as any}
                                    setValue={setValue as any}
                                    type="water"
                                    label="Tiền nước"
                                    unitLabel="VNĐ/m³"
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
                                        selectedContract={selectedContract}
                                        totalAmount={totalAmount}
                                        isEdit={true}
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
