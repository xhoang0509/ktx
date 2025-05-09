import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
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
import {
  formatDateTime,
  formatDateTimeDetail,
  formatUserStatus,
  formatVND,
  getColorUserStatus,
} from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";
import { useCallback, useMemo } from "react";
import { Room, RoomPagination } from "../types";

interface RoomTableProps {
    rooms: Room[];
    pagination?: RoomPagination;
    onChangePagination?: (page: number) => void;
}

export default function RoomTable({ rooms, pagination, onChangePagination }: RoomTableProps) {
    const columns = [
        { name: "STT", uid: "indexNumber", align: "center", width: "60px" },
        { name: "Tên phòng", uid: "name" },
        { name: "Giới tính", uid: "gender" },
        { name: "Sức chứa", uid: "capacity", align: "center" },
        { name: "Giá cơ bản", uid: "price", align: "right" },
        { name: "Cập nhật lần cuối", uid: "updatedAt" },
        { name: "Thao tác", uid: "actions", align: "center" },
    ];

    const renderPagination = useMemo(() => {
        return (
            pagination &&
            pagination?.totalPages > 1 && (
                <div className="flex w-full justify-center mt-4">
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

    const renderCell = useCallback((item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof any];
        const capacityColor =
            item.current_capacity >= item.max_capacity
                ? "text-red-500"
                : item.current_capacity >= item.max_capacity * 0.75
                ? "text-orange-400"
                : "text-green-500";

        switch (columnKey) {
            case "gender":
                return <div className="line-clamp-2">{convertGenderToVietnamese(item.gender)}</div>;
            case "capacity":
                return (
                    <div className={capacityColor}>
                        {item.current_capacity}/{item.max_capacity}
                    </div>
                );
            case "price":
                return <div className="line-clamp-2">{formatVND(item.base_price)}</div>;
            case "createdAt":
                return <div className="line-clamp-2">{formatDateTime(item.createdAt)}</div>;
            case "updatedAt":
                return <div className="line-clamp-2">{formatDateTimeDetail(item.updatedAt)}</div>;

            case "isActive":
                return (
                    <Chip color={getColorUserStatus(item.status)} size="sm" variant="bordered">
                        {formatUserStatus(item.status)}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Xem hồ sơ">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon className="size-4 text-success" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Sửa">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon className="size-4 text-success" />
                            </span>
                        </Tooltip>
                        {/* <Tooltip content="Xoá">
                          <span
                              onClick={() => deleteProduct(item.id)}
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          >
                              <TrashIcon className="size-4 text-danger" />
                          </span>
                      </Tooltip> */}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            classNames={{
                wrapper: "shadow-none",
            }}
            isStriped
            aria-label="room table"
            bottomContent={renderPagination}
        >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.align as any}
                        width={column.width as any}
                    >
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody
                items={rooms.map((item: any, index: number) => ({
                    ...item,
                    indexNumber: index + 1,
                }))}
            >
                {(item: any) => (
                    <TableRow key={item?._id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
