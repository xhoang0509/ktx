import { ROUTE_PATHS } from "@constants/route.const";
import { Room } from "@features/Room/types";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PencilIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
    Avatar,
    Button,
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
import { formatDate, formatVND } from "@utils/fomart.util";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export interface User {
    id: number;
    full_name: string;
    email: string;
    gender: string;
    phone: string;
    student_id: string;
    avatar: string;
    status: string;
    faculty_name: string;
    class_code: string;
    birth_date: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface Bill {
    id: string;
    code: string;
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
    status: string;
    createdAt: string;
    updatedAt: string;
    room: Room;
    billUsers: BillUser[];
}

export interface BillUser {
    id: number;
    billId: number;
    userId: number;
    amount: number;
    status: string;
    user: User;
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
export default function BillTable({ bills=[], pagination, onChangePagination, onDelete }: Props) {
    const navigate = useNavigate();
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const columns = [
        { name: "ID", uid: "id", width: "20px" },
        { name: "Mã hóa đơn", uid: "code" },
        { name: "Phòng", uid: "room" },
        { name: "Thành viên", uid: "members" },
        { name: "Ngày tạo", uid: "createdAt" },
        { name: "Trạng thái", uid: "status" },
        { name: "Tuỳ chọn", uid: "actions", align: "center" },
    ];

    const toggleRowExpansion = (billId: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(billId)) {
            newExpanded.delete(billId);
        } else {
            newExpanded.add(billId);
        }
        setExpandedRows(newExpanded);
    };

    const getUserPaymentStatus = (billUser: BillUser): boolean => {
        return billUser.status === "paid";
    };

    const getPaymentSummary = (billUsers: BillUser[]) => {
        const paidUsers = billUsers.filter((billUser) => getUserPaymentStatus(billUser));
        return {
            paidCount: paidUsers.length,
            totalCount: billUsers.length,
            isPaidAll: paidUsers.length === billUsers.length,
            isPaidPartial: paidUsers.length > 0 && paidUsers.length < billUsers.length,
            isPaidNone: paidUsers.length === 0,
        };
    };

    const renderMembersCell = (item: any) => {
        const billUsers = item?.billUsers || [];
        const isExpanded = expandedRows.has(item.id);
        const paymentSummary = getPaymentSummary(billUsers);

        if (billUsers.length === 0) {
            return <div className="text-gray-500">Không có thành viên</div>;
        }

        return (
            <div className="w-full">
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => toggleRowExpansion(item.id)}
                    className="flex items-center gap-2 p-2"
                >
                    <UserGroupIcon className="size-4" />
                    <span>{billUsers.length} thành viên</span>
                    <Chip
                        size="sm"
                        color={
                            paymentSummary.isPaidAll
                                ? "success"
                                : paymentSummary.isPaidPartial
                                ? "warning"
                                : "default"
                        }
                        variant="flat"
                    >
                        {paymentSummary.paidCount}/{paymentSummary.totalCount}
                    </Chip>
                    {isExpanded ? (
                        <ChevronUpIcon className="size-3" />
                    ) : (
                        <ChevronDownIcon className="size-3" />
                    )}
                </Button>

                {isExpanded && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-700">Danh sách thành viên</h4>
                        </div>
                        <div className="space-y-2">
                            {billUsers.map((billUser: BillUser) => {
                                const isPaid = getUserPaymentStatus(billUser);
                                const user = billUser.user;
                                return (
                                    <div
                                        key={billUser.id}
                                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                            isPaid
                                                ? "bg-green-50 border-green-200"
                                                : "bg-white border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar
                                                    src={`${import.meta.env.VITE_BASE_SERVER}${
                                                        user.avatar
                                                    }`}
                                                    name={user.full_name}
                                                    size="sm"
                                                />
                                                {isPaid && (
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                        <svg
                                                            className="w-2 h-2 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {user.full_name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    MSSV: {user.student_id}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <div className="text-sm font-medium">
                                                    {formatVND(
                                                        Math.floor(
                                                            item.totalAmount / billUsers.length
                                                        )
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Phần chia
                                                </div>
                                            </div>
                                            <Chip
                                                color={isPaid ? "success" : "warning"}
                                                size="sm"
                                                variant="flat"
                                            >
                                                {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                                            </Chip>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">
                                        Tổng tiền hóa đơn:
                                    </span>
                                    <div className="text-lg font-bold text-blue-600">
                                        {formatVND(item.totalAmount)}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">
                                        Tiền mỗi người:
                                    </span>
                                    <div className="text-lg font-bold text-purple-600">
                                        {formatVND(Math.floor(item.totalAmount / billUsers.length))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mt-2 pt-2 border-t border-blue-200">
                                <div>
                                    <span className="text-green-600 font-medium">Đã thu:</span>
                                    <div className="text-lg font-bold text-green-600">
                                        {formatVND(
                                            Math.floor(item.totalAmount / billUsers.length) *
                                                paymentSummary.paidCount
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-orange-600 font-medium">Còn lại:</span>
                                    <div className="text-lg font-bold text-orange-600">
                                        {formatVND(
                                            Math.floor(item.totalAmount / billUsers.length) *
                                                (billUsers.length - paymentSummary.paidCount)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderCell = useCallback(
        (item: any, columnKey: React.Key) => {
            const roomName = item?.room?.name || "Không có";
            const cellValue = item[columnKey as keyof any];

            const getBillStatus = (item: any) => {
                const users = item?.billUsers || [];
                if (users.length === 0) return "Không có thành viên";

                const paymentSummary = getPaymentSummary(users);

                if (paymentSummary.isPaidAll) {
                    return "Đã thanh toán đầy đủ";
                } else if (paymentSummary.isPaidPartial) {
                    return "Thanh toán một phần";
                } else {
                    return "Chưa thanh toán";
                }
            };

            const getBillStatusColor = (item: any) => {
                const users = item?.billUsers || [];
                if (users.length === 0) return "default";

                const paymentSummary = getPaymentSummary(users);

                if (paymentSummary.isPaidAll) {
                    return "success";
                } else if (paymentSummary.isPaidPartial) {
                    return "warning";
                } else {
                    return "danger";
                }
            };

            switch (columnKey) {
                case "createdAt":
                    return <div>{formatDate(cellValue)}</div>;
                case "room":
                    return <div>{roomName}</div>;
                case "members":
                    return renderMembersCell(item);
                case "totalAmount":
                    return <div>{formatVND(cellValue)}</div>;
                case "status":
                    return (
                        <Chip color={getBillStatusColor(item)} size="sm" variant="bordered">
                            {getBillStatus(item)}
                        </Chip>
                    );

                case "actions":
                    return (
                        <div className="relative flex items-center gap-2 justify-center">
                            {getBillStatus(item) === "Chưa thanh toán" && (
                                <Tooltip content="Sửa">
                                    <span
                                        onClick={() =>
                                            navigate(`/${ROUTE_PATHS.BILL}/edit/${item.id}`)
                                        }
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <PencilIcon className="size-4 text-blue-500" />
                                    </span>
                                </Tooltip>
                            )}
                        </div>
                    );
                default:
                    return typeof cellValue === "object" ? "" : cellValue;
            }
        },
        [expandedRows]
    );

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
                        <TableRow key={Math.random()}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }, [bills, columns, renderCell]);

    return <div>{renderTable}</div>;
}
