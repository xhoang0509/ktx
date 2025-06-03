import { Room } from "@features/Room/types";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

interface TotalAmountProps {
    electricityAmount: number;
    waterAmount: number;
    internetAmount: number;
    cleaningAmount: number;
    selectedRoom: Room | null;
    totalAmount?: number;
    isEdit?: boolean;
}

export default function TotalAmount({
    electricityAmount,
    waterAmount,
    internetAmount,
    cleaningAmount,
    selectedRoom,
    totalAmount,
    isEdit,
}: TotalAmountProps) {
    const roomPrice = selectedRoom?.base_price ? parseInt(selectedRoom.base_price.toString()) : 0;

    const calcTotalAmount =
        roomPrice +
        Number(electricityAmount) +
        Number(waterAmount) +
        Number(internetAmount) +
        Number(cleaningAmount);

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-3 gap-2">
                <div className="text-blue-600">
                    <CurrencyDollarIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">Tổng cộng</h3>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Giá phòng:</span>
                    <span className="font-medium">{roomPrice.toLocaleString()} VNĐ</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Tiền điện:</span>
                    <span className="font-medium">{electricityAmount.toLocaleString()} VNĐ</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Tiền nước:</span>
                    <span className="font-medium">{waterAmount.toLocaleString()} VNĐ</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Internet:</span>
                    <span className="font-medium">{internetAmount.toLocaleString()} VNĐ</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Vệ sinh:</span>
                    <span className="font-medium">{cleaningAmount.toLocaleString()} VNĐ</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold">Tổng tiền:</span>
                    <span className="text-xl font-bold text-blue-700">
                        {isEdit ? totalAmount?.toLocaleString() : calcTotalAmount.toLocaleString()}
                        VNĐ
                    </span>
                </div>
            </div>
        </div>
    );
}
