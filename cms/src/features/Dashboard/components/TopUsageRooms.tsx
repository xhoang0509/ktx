import { Room } from "@features/Room/types";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export interface TopUsageRoom {
    id: number;
    room: Room;
    electricity: {
        amount: number;
    };
    water: {
        amount: number;
    };
    totalAmount: number;
    createdAt: string;
}
interface TopUsageRoomsProps {
    data: TopUsageRoom[];
}

const TopUsageRooms = ({ data }: TopUsageRoomsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount);
    };

    return (
        <div className="h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Top 10 phòng sử dụng điện nước nhiều nhất
            </h3>
            <div className="overflow-auto max-h-80">
                <Table aria-label="Top usage rooms table" className="min-w-full">
                    <TableHeader>
                        <TableColumn>Thứ hạng</TableColumn>
                        <TableColumn>Phòng</TableColumn>
                        <TableColumn>Ngày tạo</TableColumn>
                        <TableColumn>Tiền điện</TableColumn>
                        <TableColumn>Tiền nước</TableColumn>
                        <TableColumn>Tổng cộng</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 10).map((bill, index) => (
                            <TableRow key={bill.id}>
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
                                <TableCell className="font-medium">{bill.room.name}</TableCell>
                                <TableCell className="font-medium">{new Date(bill.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-yellow-600">
                                    {formatCurrency(bill.electricity.amount)}
                                </TableCell>
                                <TableCell className="text-cyan-600">
                                    {formatCurrency(bill.water.amount)}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-800">
                                    {formatCurrency(bill.electricity.amount + bill.water.amount)}
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
