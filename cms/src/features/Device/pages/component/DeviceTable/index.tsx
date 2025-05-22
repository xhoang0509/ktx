import { ROUTE_PATHS } from "@constants/route.const";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

export interface Device {
    _id: string;
    userId: string;
    totalPrice: number;
    createdAt: string;
    status: string;
}

export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export type Props = {
    devices: Device[];
    pagination: Pagination;
    onChangePagination: (page: number) => void;
    onDelete: (id: string) => void;
};
export default function DeviceTable({ devices, pagination, onChangePagination, onDelete }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const columns = [
        { name: "ID", uid: "id", width: "50px" },
        { name: "Tên thiết bị", uid: "name" },
        { name: "Loại thiết bị", uid: "type" },
        { name: "Năm sản xuất", uid: "year_of_manufacture" },
        { name: "Trạng thái", uid: "status", align: "center" },
        { name: "Tuỳ chọn", uid: "actions", align: "center" },
    ];
    const handleDelete = (id: string) => {
        onDelete(id);
    };
    const renderCell = useCallback((item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof any];

        const getDeviceStatus = (status: string) => {
            switch (status) {
                case "good":
                    return "Tốt";
                case "broken":
                    return "Hỏng";
                case "under_maintenance":
                    return "Đang bảo trì";
                case "deleted":
                    return "Đã xóa";
            }
        };
        switch (columnKey) {
            case "status":
                return (
                    <Chip
                        color={
                            item.status == "good"
                                ? "success"
                                : item.status == "broken"
                                ? "danger"
                                : item.status == "under_maintenance"
                                ? "warning"
                                : "danger"
                        }
                        size="sm"
                        variant="bordered"
                    >
                        {getDeviceStatus(item.status)}
                    </Chip>
                );

            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Sửa">
                            <span
                                onClick={() => navigate(`/${ROUTE_PATHS.DEVICE}/edit/${item.id}`)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <PencilIcon className="size-4 text-secondary" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Xóa">
                            <span
                                onClick={() => handleDelete(item.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <TrashIcon className="size-4 text-secondary" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
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
                        devices?.length
                            ? devices?.map((item: any, index: number) => ({
                                  ...item,
                                  indexNumber: index + 1,
                              }))
                            : []
                    }
                >
                    {(item: any) => (
                        <TableRow key={item?._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }, [devices, columns, renderCell]);

    return <div>{renderTable}</div>;
}
