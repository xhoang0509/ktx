import AppNumberInput from "@components/common/AppNumberInput";
import { BeakerIcon, BoltIcon } from "@heroicons/react/24/outline";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { BillForm } from "../types";

interface ServiceFeeInputProps {
    control: Control<BillForm>;
    watch: UseFormWatch<BillForm>;
    setValue: UseFormSetValue<BillForm>;
    type: "electricity" | "water";
    icon?: React.ReactNode;
    label: string;
    unitLabel: string;
}

export default function ServiceFeeInput({
    control,
    watch,
    setValue,
    type,
    icon,
    label,
    unitLabel,
}: ServiceFeeInputProps) {
    const startReading = watch(`${type}.startReading`);
    const endReading = watch(`${type}.endReading`);
    const unitPrice = watch(`${type}.unitPrice`);

    const calculateValues = (
        newStartReading?: number,
        newEndReading?: number,
        newUnitPrice?: number
    ) => {
        const startReadingValue = newStartReading !== undefined 
            ? newStartReading 
            : (startReading || 0);
        
        const endReadingValue = newEndReading !== undefined 
            ? newEndReading 
            : (endReading || 0);
        
        const unitPriceValue = newUnitPrice !== undefined 
            ? newUnitPrice 
            : (unitPrice || 0);
        
        const usage = Math.max(0, endReadingValue - startReadingValue);
        const amount = usage * unitPriceValue;

        setValue(`${type}.usage`, usage);
        setValue(`${type}.amount`, amount);
    };

    const getIcon = () => {
        if (icon) return icon;
        return type === "electricity" ? (
            <BoltIcon className="h-5 w-5" />
        ) : (
            <BeakerIcon className="h-5 w-5" />
        );
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3 gap-2">
                <div className="text-blue-500">{getIcon()}</div>
                <h3 className="text-lg font-medium">{label}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="mb-2 text-sm">Chỉ số đầu</div>
                    <Controller
                        control={control}
                        name={`${type}.startReading`}
                        render={({ field }) => (
                            <AppNumberInput
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    calculateValues(Number(value), undefined, undefined);
                                }}
                                min={0}
                            />
                        )}
                    />
                </div>

                <div>
                    <div className="mb-2 text-sm">Chỉ số cuối</div>
                    <Controller
                        control={control}
                        name={`${type}.endReading`}
                        render={({ field }) => (
                            <AppNumberInput
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    calculateValues(undefined, Number(value), undefined);
                                }}
                                min={0}
                            />
                        )}
                    />
                </div>

                <div>
                    <div className="mb-2 text-sm">Số lượng tiêu thụ</div>
                    <Controller
                        control={control}
                        name={`${type}.usage`}
                        render={({ field }) => <AppNumberInput value={field.value} readOnly />}
                    />
                </div>

                <div>
                    <div className="mb-2 text-sm">Đơn giá ({unitLabel})</div>
                    <Controller
                        control={control}
                        name={`${type}.unitPrice`}
                        render={({ field }) => (
                            <AppNumberInput
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    calculateValues(undefined, undefined, Number(value));
                                }}
                                min={0}
                            />
                        )}
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="mb-2 text-sm">Thành tiền</div>
                    <Controller
                        control={control}
                        name={`${type}.amount`}
                        render={({ field }) => (
                            <AppNumberInput
                                value={field.value}
                                readOnly
                                className="font-medium text-lg"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
