import { ROUTE_PATHS } from "@constants/route.const";
import { ProductActions } from "@features/Product/services/slice";
import { IUser } from "@features/User/services/slice";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import { useAppDispatch } from "@services/store";
import { formatDateTime, formatUserStatus, getColorUserStatus } from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

interface IProps {
    users: IUser[]
    pagination?: {
        page: number;
        totalPages: number;
    };
    onChangePagination?: (page: number) => void;
}
export default function UserTable({
    users,
    pagination,
    onChangePagination, }: IProps) {
        
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navigateEditUser = (id: string) => {
        navigate(`/${ROUTE_PATHS.EDIT_USER_BASE}/${id}`);
    };

    const deleteProduct = (id: string) => {
        dispatch(ProductActions.deleteProduct({ id }));
    };

    const columns = [
        { name: "Số thứ tự", uid: "indexNumber", align: "center", with: "80px" },
        { name: "Username", uid: "username" },
        { name: "Họ và tên", uid: "full_name" },
        { name: "Số điện thoại", uid: "phone" },
        { name: "Giới tính", uid: "gender" },
        { name: "Ngày tạo", uid: "createdAt" },
        { name: "Ngày cập nhật", uid: "updatedAt" },
        { name: "Trạng thái", uid: "isActive", align: "center" },
        { name: "Hành động", uid: "actions", align: "center" },
    ];

    const renderCell = useCallback((item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof any];

        switch (columnKey) {
            case "gender":
                return (
                    <div className="line-clamp-2">{convertGenderToVietnamese(item.gender)}</div>
                );
            case "createdAt":
                return (
                    <div className="line-clamp-2">{formatDateTime(item.createdAt)}</div>
                );
            case "updatedAt":
                return (
                    <div className="line-clamp-2">{formatDateTime(item.updatedAt)}</div>
                );

            case "isActive":
                return (
                    <Chip
                        color={getColorUserStatus(item.status)}
                        size="sm"
                        variant="bordered"
                    >
                        {formatUserStatus(item.status)}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Xem hồ sơ">
                            <span
                                onClick={() => {
                                    navigate(`/${ROUTE_PATHS.VIEW_USER_BASE}/${item.id}`);
                                }}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EyeIcon className="size-4 text-success" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Sửa">
                            <span
                                onClick={() => navigateEditUser(item.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
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

    const renderPagination = useMemo(() => {
        return (
            pagination && pagination?.totalPages > 1 && (
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
                aria-label="user table"
                bottomContent={renderPagination}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.align as any}
                            width={column.with as any}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={users.map((item: any, index: number) => ({
                        ...item,
                        indexNumber: index + 1,
                    }))}
                >
                    {(item: any) => (
                        <TableRow
                            key={item?._id}
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        )
    }, [users, columns, renderCell])

    return <div>{renderTable}</div>
};

