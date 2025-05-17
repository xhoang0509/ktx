import { FC } from "react";
import { RoomDetail } from "../types";
import { formatMoney } from "@utils/money.util";

interface RoomInfoBoxProps {
    room: RoomDetail;
}

const RoomInfoBox: FC<RoomInfoBoxProps> = ({ room }) => {
    const status = room.current_capacity === room.max_capacity ? "Đã đầy" : "Còn trống";
    const disabled = status === "Đã đầy";
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin chung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Tên phòng:</span>
                        <span>{room.name}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Tòa nhà:</span>
                        <span className="">{room.building}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Loại phòng:</span>
                        <span>{room.type}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium w-32">Số lượng sinh viên:</span>
                        <span className="ml-2">
                            {room.current_capacity} / {room.max_capacity}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Giới tính:</span>
                        <span>{room.gender === "male" ? "Nam" : "Nữ"}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Giá cơ bản:</span>
                        <span className="text-red-500 font-bold">
                            {formatMoney(room.base_price)} / tháng
                        </span>
                    </div>

                    <div className="flex items-center mb-2">
                        <span className="font-medium w-32">Tình trạng:</span>
                        <span
                            className={`font-medium ${
                                disabled ? "text-red-600" : "text-green-600"
                            }`}
                        >
                            {status}
                        </span>
                    </div>
                    {room.note && (
                        <div className="flex items-center mb-2">
                            <span className="font-medium w-32">Ghi chú:</span>
                            <span>{room.note}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomInfoBox;
