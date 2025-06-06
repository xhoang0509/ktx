import AppSelect from "@components/common/AppSelect";
import { BookingRequest } from "@features/BookingRequests/types";
import { RoomSelectors } from "@features/Room/services/slice";
import { Room } from "@features/Room/types";
import { SelectItem } from "@heroui/react";
import { useAppSelector } from "@services/store";
import { formatVND } from "@utils/fomart.util";
import { Control, Controller } from "react-hook-form";

interface RoomSelectorProps {
    control: Control<any>;
    onRoomSelect: (room: Room | null) => void;
    selectedRoom: Room | null;
    disabled?: boolean;
}

export default function RoomSelector({
    control,
    onRoomSelect,
    selectedRoom,
    disabled,
}: RoomSelectorProps) {
    const roomsInContract = useAppSelector(RoomSelectors.roomsInContract);
    // useEffect(() => {
    //     onRoomSelect(selectedRoom);
    // }, [selectedRoom, onRoomSelect]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
                <div className="mb-2">Phòng thuê</div>
                <Controller
                    control={control}
                    name="contractId"
                    render={({ field }) => (
                        <AppSelect
                            selectedKeys={field.value ? [field.value] : []}
                            onSelectionChange={(keys) => {
                                if (disabled) return;
                                const selectedKey = Array.from(keys)[0]?.toString() || "";
                                field.onChange(selectedKey);
                                const room = roomsInContract.find(
                                    (c: BookingRequest) => c.id === parseInt(selectedKey)
                                );
                                onRoomSelect(room || null);
                            }}
                        >
                            {roomsInContract.map((room: Room) => (
                                <SelectItem key={room.id}>Phòng: {room.name}</SelectItem>
                            ))}
                        </AppSelect>
                    )}
                />
            </div>

            {selectedRoom && (
                <div className="md:col-span-6 bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-700 mb-2 font-bold">
                        Phòng: {selectedRoom.name}
                    </div>

                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Thông tin phòng</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-500">Tên phòng:</span>
                            <span className="ml-2 font-medium">{selectedRoom.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Tòa nhà:</span>
                            <span className="ml-2 font-medium">{selectedRoom.building}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Loại phòng:</span>
                            <span className="ml-2 font-medium">{selectedRoom.type}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Tầng:</span>
                            <span className="ml-2 font-medium">{selectedRoom.floor}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Giá phòng:</span>
                            <span className="ml-2 font-medium">
                                {formatVND(selectedRoom.base_price)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
