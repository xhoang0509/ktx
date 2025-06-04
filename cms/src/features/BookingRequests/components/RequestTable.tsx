import { ROUTE_PATHS } from "@constants/route.const";
import {
    CheckIcon,
    ExclamationCircleIcon,
    EyeIcon,
    NoSymbolIcon,
    PencilIcon,
    PrinterIcon,
} from "@heroicons/react/24/solid";
import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
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
import {
    formatDateTime,
    formatDateTimeDetail,
    formatUserStatus,
    getColorUserStatus,
} from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BookingRequestActions } from "../services/slice";
import { BookingRequest, BookingRequestPagination, BookingRequestStatus } from "../types";

interface BookingRequestListProps {
    bookingRequests: BookingRequest[];
    pagination?: BookingRequestPagination;
    onChangePagination?: (page: number) => void;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export const formatStatus = (status: BookingRequestStatus) => {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "Đang chờ";
        case BookingRequestStatus.ACTIVE:
            return "Đã duyệt";
        case BookingRequestStatus.TERMINATED:
            return "Đã chấm dứt";
        case BookingRequestStatus.CANCELLED:
            return "Đã hủy";
        case BookingRequestStatus.EXPIRED:
            return "Hết hạn";
        default:
            return "Không xác định";
    }
};

export function getColorStatus(status: BookingRequestStatus) {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "warning";
        case BookingRequestStatus.ACTIVE:
            return "success";
        case BookingRequestStatus.TERMINATED:
            return "danger";
        case BookingRequestStatus.CANCELLED:
            return "danger";
        case BookingRequestStatus.EXPIRED:
            return "danger";
        default:
            return "default";
    }
}

export default function RequestTable({
    bookingRequests,
    pagination,
    onChangePagination,
    setRefresh,
}: BookingRequestListProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReject, setIsOpenReject] = useState(false);
    const [isOpenTerminate, setIsOpenTerminate] = useState(false);
    const [selectedId, setSelectedId] = useState<any>(null);
    const [selectedIdReject, setSelectedIdReject] = useState<any>(null);
    const [selectedIdTerminate, setSelectedIdTerminate] = useState<any>(null);

    const handleApprove = (id: any) => {
        setIsOpen(true);
        setSelectedId(id);
    };
    const handleReject = (id: any) => {
        setIsOpenReject(true);
        setSelectedIdReject(id);
    };
    const handleTerminate = (id: any) => {
        setIsOpenTerminate(true);
        setSelectedIdTerminate(id);
    };

    const handleApproveContract = () => {
        if (!selectedId) return;
        dispatch(
            BookingRequestActions.approveBookingRequest({
                id: selectedId,
                active: true,
                onSuccess: () => {
                    setRefresh((prev) => !prev);
                },
            })
        );
        setIsOpen(false);
    };

    const handleRejectContract = () => {
        if (!selectedIdReject) return;
        dispatch(
            BookingRequestActions.rejectBookingRequest({
                id: selectedIdReject,
                active: false,
                onSuccess: () => {
                    setRefresh((prev) => !prev);
                },
            })
        );
        setIsOpenReject(false);
    };

    const handleTerminateContract = () => {
        if (!selectedIdTerminate) return;
        dispatch(
            BookingRequestActions.terminateBookingRequest({
                id: selectedIdTerminate,
                onSuccess: () => {
                    setRefresh((prev) => !prev);
                },
            })
        );
        setIsOpenTerminate(false);
    };

    const columns = [
        { name: "Mã hợp đồng", uid: "id", align: "center", width: "60px" },
        { name: "Tên sinh viên", uid: "studentName" },
        { name: "Ngày yêu cầu", uid: "createdAt" },
        { name: "Ngày bắt đầu", uid: "start_date" },
        { name: "Ngày kết thúc", uid: "end_date" },
        { name: "Phòng", uid: "room_name" },
        { name: "Trạng thái", uid: "status", align: "center" },
        { name: "Hành động", uid: "actions", align: "center" },
        { name: "Xem hợp đồng", uid: "view", align: "center" },
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
                return <div className="line-clamp-2">{formatDateTimeDetail(item.end_date)}</div>;
            case "createdAt":
                return <div className="line-clamp-2">{formatDateTimeDetail(item.createdAt)}</div>;
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
                        {[BookingRequestStatus.PENDING].includes(item.status) && (
                            <Tooltip content="Duyệt hợp đồng">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <CheckIcon
                                        className="size-4 text-success"
                                        onClick={() => {
                                            handleApprove(item.id);
                                        }}
                                    />
                                </span>
                            </Tooltip>
                        )}
                        {[BookingRequestStatus.PENDING].includes(item.status) && (
                            <Tooltip content="Từ chối hợp đồng">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <NoSymbolIcon
                                        className="size-4 text-danger"
                                        onClick={() => {
                                            handleReject(item.id);
                                        }}
                                    />
                                </span>
                            </Tooltip>
                        )}
                        <Tooltip content="Xem chi tiết">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon
                                    className="size-4 text-success"
                                    onClick={() => {
                                        navigate(`/request/detail/${item.id}`);
                                    }}
                                />
                            </span>
                        </Tooltip>
                        {[BookingRequestStatus.PENDING, BookingRequestStatus.ACTIVE].includes(
                            item.status
                        ) && (
                            <Tooltip content="Sửa">
                                <span
                                    onClick={() =>
                                        navigate(`/${ROUTE_PATHS.EDIT_REQUEST_BASE}/${item.id}`)
                                    }
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <PencilIcon className="size-4 text-red-500" />
                                </span>
                            </Tooltip>
                        )}
                        {[BookingRequestStatus.ACTIVE].includes(item.status) && (
                            <Tooltip content="Chấm dứt hợp đồng">
                                <span
                                    onClick={() => {
                                        handleTerminate(item.id);
                                    }}
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <ExclamationCircleIcon className="size-4 text-purple-500" />
                                </span>
                            </Tooltip>
                        )}
                    </div>
                );
            case "view":
                return (
                    <Button
                        onClick={() => {
                            navigate(`/request/print/${item.id}`);
                        }}

                    >
                        <PrinterIcon className="size-4 text-default-400" />
                        In hợp đồng
                    </Button>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
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
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Duyệt hợp đồng
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <strong>Hành động này không thể hoàn tác!</strong> Bạn có chắc
                                    chắn muốn duyệt hợp đồng này không?
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button color="primary" onPress={handleApproveContract}>
                                    Xác nhận
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenReject} onOpenChange={setIsOpenReject}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Từ chối hợp đồng
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <strong>Hành động này không thể hoàn tác!</strong> Bạn có chắc
                                    chắn muốn từ chối hợp đồng này không?
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button color="primary" onPress={handleRejectContract}>
                                    Xác nhận
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenTerminate} onOpenChange={setIsOpenTerminate}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Chấm dứt hợp đồng
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <strong>Hành động này không thể hoàn tác!</strong> Bạn có chắc
                                    chắn muốn chấm dứt hợp đồng này không?
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button color="primary" onPress={handleTerminateContract}>
                                    Xác nhận
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
