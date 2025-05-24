import AppSelect from "@components/common/AppSelect";
import { BookingRequestSelectors } from "@features/BookingRequests/services/slice";
import { BookingRequest } from "@features/BookingRequests/types";
import { SelectItem } from "@heroui/react";
import { useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Contract } from "../types";
import { formatVND } from "@utils/fomart.util";

interface RoomSelectorProps {
    control: Control<any>;
    onContractSelect: (contract: Contract | null) => void;
}

export default function RoomSelector({ control, onContractSelect }: RoomSelectorProps) {
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const bookingRequests = useAppSelector(BookingRequestSelectors.bookingRequests);

    useEffect(() => {
        onContractSelect(selectedContract);
    }, [selectedContract, onContractSelect]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
                <div className="mb-2">Phòng thuê (Hợp đồng)</div>
                <Controller
                    control={control}
                    name="contractId"
                    render={({ field }) => (
                        <AppSelect
                            selectedKeys={field.value ? [field.value] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0]?.toString() || "";
                                field.onChange(selectedKey);
                                const contract = bookingRequests.find(
                                    (c: BookingRequest) => c.id === parseInt(selectedKey)
                                );
                                setSelectedContract(contract || null);
                            }}
                        >
                            {bookingRequests.map((contract: BookingRequest) => (
                                <SelectItem key={contract.id}>
                                    Hợp đồng số: {contract.id} - Phòng: {contract.room.name}
                                </SelectItem>
                            ))}
                        </AppSelect>
                    )}
                />
            </div>

            {selectedContract && (
                <div className="md:col-span-6 bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-700 mb-2 font-bold">
                        Hợp đồng số: {selectedContract.id}
                    </div>

                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Thông tin phòng</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-500">Tên phòng:</span>
                            <span className="ml-2 font-medium">{selectedContract.room.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Tòa nhà:</span>
                            <span className="ml-2 font-medium">
                                {selectedContract.room.building}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Loại phòng:</span>
                            <span className="ml-2 font-medium">{selectedContract.room.type}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Giá phòng:</span>
                            <span className="ml-2 font-medium">
                                {formatVND(selectedContract.room.base_price)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
