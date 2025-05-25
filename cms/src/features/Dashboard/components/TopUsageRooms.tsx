import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { TopUsageRoom } from "../types";

interface TopUsageRoomsProps {
    data: TopUsageRoom[];
}

const TopUsageRooms = ({ data }: TopUsageRoomsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    return (
        <div className="h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Top 10 phòng sử dụng điện nước nhiều nhất</h3>
            <div className="overflow-auto max-h-80">
                <Table aria-label="Top usage rooms table" className="min-w-full">
                    <TableHeader>
                        <TableColumn>Thứ hạng</TableColumn>
                        <TableColumn>Phòng</TableColumn>
                        <TableColumn>Tiền điện</TableColumn>
                        <TableColumn>Tiền nước</TableColumn>
                        <TableColumn>Tổng cộng</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 10).map((room, index) => (
                            <TableRow key={room.roomName}>
                                <TableCell>
                                    <div className="flex items-center">
                                        {index < 3 && (
                                            <span className="mr-2">
                                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                                            </span>
                                        )}
                                        <span className="font-medium">#{index + 1}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{room.roomName}</TableCell>
                                <TableCell className="text-yellow-600">
                                    {formatCurrency(room.electricityBill)}
                                </TableCell>
                                <TableCell className="text-cyan-600">
                                    {formatCurrency(room.waterBill)}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-800">
                                    {formatCurrency(room.totalBill)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TopUsageRooms; 