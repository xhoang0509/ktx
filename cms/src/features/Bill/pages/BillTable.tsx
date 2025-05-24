import { ROUTE_PATHS } from "@constants/route.const";
import { Room } from "@features/Room/types";
import { DocumentIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    Chip,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@heroui/react";
import { useAppDispatch } from "@services/store";
import { formatVND } from "@utils/fomart.util";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { Contract } from "../types";

export interface Bill {
    id: string;
    electricity: {
        usage: number;
        amount: number;
        unitPrice: number;
        endReading: number;
        startReading: number;
    };
    water: {
        usage: number;
        amount: number;
        unitPrice: number;
        endReading: number;
        startReading: number;
    };
    internet: number;
    cleaning: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    contract: Contract;
    room: Room;
}

export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export type Props = {
    bills: Bill[] | any;
    pagination: Pagination;
    onChangePagination: (page: number) => void;
    onDelete: (id: string) => void;
};
export default function BillTable({ bills, pagination, onChangePagination, onDelete }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const columns = [
        { name: "ID", uid: "id", width: "20px" },
        { name: "Mã hóa đơn", uid: "code" },
        { name: "Phòng", uid: "room" },
        { name: "Họ tên", uid: "full_name" },
        { name: "Email", uid: "email" },
        { name: "Mã sinh viên", uid: "student_id" },
        { name: "Tổng số tiền", uid: "totalAmount" },
        { name: "Trạng thái", uid: "status", align: "center" },
        { name: "Tuỳ chọn", uid: "actions", align: "center" },
    ];
    const handleDelete = (id: string) => {
        onDelete(id);
    };
    const renderCell = useCallback((item: any, columnKey: React.Key) => {
        const roomName = item?.room?.name || "Không có";
        const fullName = item?.user?.full_name || "Không có";
        const email = item?.user?.email || "Không có";
        const studentId = item?.user?.student_id || "Không có";
        const cellValue = item[columnKey as keyof any];

        const getBillStatus = (status: string) => {
            switch (status) {
                case "pending":
                    return "Chưa thanh toán";
                case "paid":
                    return "Đã thanh toán";
                case "overdue":
                    return "Quá hạn";
                default:
                    return "Chưa thanh toán";
            }
        };
        switch (columnKey) {
            case "room":
                return <div>{roomName}</div>;
            case "full_name":
                return <div>{fullName}</div>;
            case "email":
                return <div>{email}</div>;
            case "student_id":
                return <div>{studentId}</div>;
            case "totalAmount":
                return <div>{formatVND(cellValue)}</div>;
            case "status":
                return (
                    <Chip
                        color={
                            item.status == "pending"
                                ? "warning"
                                : item.status == "paid"
                                ? "success"
                                : item.status == "overdue"
                                ? "danger"
                                : "danger"
                        }
                        size="sm"
                        variant="bordered"
                    >
                        {getBillStatus(item.status)}
                    </Chip>
                );

            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Xuất hóa đơn">
                            <span
                                onClick={() => navigate(`/${ROUTE_PATHS.BILL}/contract/${item.id}`)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <DocumentIcon className="size-4 text-yellow-700" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Sửa">
                            <span
                                onClick={() => navigate(`/${ROUTE_PATHS.BILL}/edit/${item.id}`)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <PencilIcon className="size-4 text-blue-500" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Xóa">
                            <span
                                onClick={() => handleDelete(item.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <TrashIcon className="size-4 text-red-500" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return typeof cellValue === "object" ? "" : cellValue;
        }
    }, []);

    const renderPagination = useMemo(() => {
        return (
            pagination?.totalPages > 1 && (
                <div className="flex w-full justify-center">
                    <Pagination
                        isDisabled={!onChangePagination}
                        showControls={!!onChangePagination}
                        page={pagination?.page}
                        total={pagination?.totalPages}
                        onChange={(page) => onChangePagination?.(page)}
                    />
                </div>
            )
        );
    }, [pagination, onChangePagination]);

    const renderTable = useMemo(() => {
        return (
            <Table
                classNames={{
                    wrapper: "shadow-none",
                }}
                isStriped
                aria-label="category table"
                bottomContent={renderPagination}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.align as any}
                            width={column.width as any}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={
                        bills?.length
                            ? bills?.map((item: any, index: number) => ({
                                  ...item,
                                  indexNumber: index + 1,
                              }))
                            : []
                    }
                >
                    {(item: any) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }, [bills, columns, renderCell]);

    return <div>{renderTable}</div>;
}
