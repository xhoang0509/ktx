import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { formatVND } from "@utils/fomart.util";
import { Room } from "../types";

interface RoomStatusTableProps {
    data: Room[];
}

const RoomStatusTable = ({ data }: RoomStatusTableProps) => {
    const getOccupancyStatus = (current_capacity: number, max_capacity: number) => {
        const percentage = (current_capacity / max_capacity) * 100;
        if (percentage === 0) return { color: "default" as const, text: "Trống" };
        if (percentage < 50) return { color: "success" as const, text: "Còn chỗ" };
        if (percentage < 100) return { color: "warning" as const, text: "Gần đầy" };
        return { color: "danger" as const, text: "Đầy" };
    };

    return (
        <div className="h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Tình trạng phòng ở</h3>
            <div className="overflow-auto max-h-80">
                <Table aria-label="Room status table" className="min-w-full">
                    <TableHeader>
                        <TableColumn>Phòng</TableColumn>
                        <TableColumn>Giá</TableColumn>
                        <TableColumn>Sức chứa</TableColumn>
                        <TableColumn>Đang ở</TableColumn>
                        <TableColumn>Tình trạng</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data.map((room) => {
                            const status = getOccupancyStatus(
                                room.current_capacity,
                                room.max_capacity
                            );
                            return (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">{room.name}</TableCell>
                                    <TableCell>{formatVND(room.base_price)} / tháng</TableCell>
                                    <TableCell>{room.max_capacity}</TableCell>
                                    <TableCell>{room.current_capacity}</TableCell>
                                    <TableCell>
                                        <Chip color={status.color} size="sm" variant="flat">
                                            {status.text}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RoomStatusTable;
