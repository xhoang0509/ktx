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
  getColorUserStatus,
} from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";
import React, { useCallback, useMemo } from "react";
import { BookingRequest, BookingRequestPagination, BookingRequestStatus } from "../types";
import { useNavigate } from "react-router";

interface BookingRequestListProps {
    bookingRequests: BookingRequest[];
    pagination?: BookingRequestPagination;
    onChangePagination?: (page: number) => void;
}
export const formatStatus = (status: BookingRequestStatus) => {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "Đang chờ";
        case BookingRequestStatus.APPROVED:
            return "Đã duyệt";
        case BookingRequestStatus.REJECTED:
            return "Từ chối";
        case BookingRequestStatus.CANCELLED:
            return "Đã hủy";
        default:
            return "Không xác định";
    }
};

export function getColorStatus(status: BookingRequestStatus) {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "warning";
        case BookingRequestStatus.APPROVED:
            return "success";
        case BookingRequestStatus.REJECTED:
            return "danger";
        case BookingRequestStatus.CANCELLED:
            return "danger";
        default:
            return "default";
    }
}

export default function BookingRequestList({
    bookingRequests,
    pagination,
    onChangePagination,
}: BookingRequestListProps) {
    const navigate = useNavigate();
    const columns = [
        { name: "STT", uid: "indexNumber", align: "center", width: "60px" },
        { name: "Tên sinh viên", uid: "studentName" },
        { name: "Ngày yêu cầu", uid: "createdAt" },
        { name: "Ngày bắt đầu", uid: "start_date" },
        { name: "Ngày kết thúc", uid: "end_date" },
        { name: "Phòng", uid: "room_name" },
        { name: "Trạng thái", uid: "status", align: "center" },
        { name: "Hành động", uid: "actions", align: "center" },
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
        console.log(item)
        const cellValue = item[columnKey as keyof any];

        switch (columnKey) {
            case "gender":
                return <div className="line-clamp-2">{convertGenderToVietnamese(item.gender)}</div>;
            case "studentName":
                return <div className="line-clamp-2">{item?.user?.full_name}</div>;
            case "room_name":
                return <div className="line-clamp-2">{item?.room?.name}</div>;
            case "requestDate":
                return <div className="line-clamp-2">{formatDateTimeDetail(item.requestDate)}</div>;
            case "start_date":
                return <div className="line-clamp-2">{formatDateTimeDetail(item.start_date)}</div>;
            case "end_date":
                return (
                    <div className="line-clamp-2">{formatDateTimeDetail(item.end_date)}</div>
                );
            case "status":
                return (
                    <Chip color={getColorStatus(item.status)} size="sm" variant="bordered">
                        <div className="line-clamp-2">{formatStatus(item.status)}</div>
                    </Chip>
                );
            case "updatedAt":
                return <div className="line-clamp-2">{formatDateTime(item.updatedAt)}</div>;

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
                                <EyeIcon className="size-4 text-success" onClick={() => {
                                    navigate(`/request/detail/${item.id}`);
                                }}/>
                            </span>
                        </Tooltip>
                        <Tooltip content="Sửa">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon className="size-4 text-success" />
                            </span>
                        </Tooltip>
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
            aria-label="booking requests table"
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
                items={bookingRequests.map((item: any, index: number) => ({
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
