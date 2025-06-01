import DeleteConfirmationModal from "@components/DeleteConfirmationModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    Chip,
    Image,
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
    getRoomStatus,
} from "@utils/fomart.util";
import { convertGenderToVietnamese } from "@utils/gender.util";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RoomActions } from "../services/slice";
import { Room, RoomPagination } from "../types";

interface RoomTableProps {
    rooms: Room[];
    pagination?: RoomPagination;
    onChangePagination?: (page: number) => void;
}

export default function RoomTable({ rooms, pagination, onChangePagination }: RoomTableProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

    const columns = [
        { name: "STT", uid: "indexNumber", align: "center", width: "60px" },
        { name: "Tên phòng", uid: "name" },
        { name: "Giới tính", uid: "gender" },
        { name: "Sức chứa", uid: "capacity", align: "center" },
        { name: "Sinh viên", uid: "students", align: "center" },
        { name: "Giá cơ bản", uid: "price", align: "right" },
        { name: "Tầng", uid: "floor", align: "center" },
        { name: "Tòa nhà", uid: "building" },
        { name: "Loại phòng", uid: "type" },
        { name: "Hình ảnh", uid: "images", align: "center" },
        // { name: "Cập nhật lần cuối", uid: "updatedAt" },
        { name: "Trạng thái", uid: "status", align: "center" },
        { name: "Thao tác", uid: "actions", align: "center" },
    ];

    const handleDeleteRoom = (id: string) => {
        setRoomToDelete(id);
    };

    const confirmDelete = () => {
        if (roomToDelete) {
            dispatch(
                RoomActions.deleteRoom({
                    id: roomToDelete,
                    onSuccess: () => {
                        setRoomToDelete(null);
                    },
                })
            );
        }
    };

    const cancelDelete = () => {
        setRoomToDelete(null);
    };
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

    const renderCell = useCallback(
        (item: any, columnKey: React.Key) => {
            const cellValue = item[columnKey as keyof any];
            const capacityColor =
                item.current_capacity >= item.max_capacity
                    ? "text-red-500"
                    : item.current_capacity >= item.max_capacity * 0.75
                    ? "text-orange-400"
                    : "text-green-500";

            switch (columnKey) {
                case "gender":
                    return (
                        <div className="line-clamp-2">{convertGenderToVietnamese(item.gender)}</div>
                    );
                case "capacity":
                    return (
                        <div className={capacityColor}>
                            {item.current_capacity}/{item.max_capacity}
                        </div>
                    );
                case "students":
                    return (
                        <div className="flex flex-col gap-1 max-w-[120px]">
                            {item.students && item.students.length > 0 ? (
                                <>
                                    {item.students
                                        .slice(0, 2)
                                        .map((student: any, index: number) => (
                                            <Tooltip
                                                key={index}
                                                content={`${
                                                    student.full_name || `SV ${student.id}`
                                                }`}
                                            >
                                                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-center truncate cursor-help">
                                                    {student.full_name || `SV ${student.id}`}
                                                </div>
                                            </Tooltip>
                                        ))}
                                    {item.students.length > 2 && (
                                        <Tooltip
                                            content={`Tổng cộng ${
                                                item.students.length
                                            } sinh viên: ${item.students
                                                .map(
                                                    (s: any) => s.full_name || `SV ${s.id}`
                                                )
                                                .join(", ")}`}
                                        >
                                            <div className="text-xs text-gray-500 text-center cursor-help">
                                                +{item.students.length - 2} khác
                                            </div>
                                        </Tooltip>
                                    )}
                                </>
                            ) : item.current_capacity > 0 ? (
                                <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-center">
                                    {item.current_capacity} sinh viên
                                </div>
                            ) : (
                                <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full text-center">
                                    Trống
                                </div>
                            )}
                        </div>
                    );
                case "price":
                    return <div className="line-clamp-2">{formatVND(Number(item.base_price))}</div>;
                case "floor":
                    return <div className="line-clamp-2">{item.floor}</div>;
                case "building":
                    return <div className="line-clamp-2">{item.building}</div>;
                case "type":
                    return <div className="line-clamp-2">{item.type}</div>;
                case "status":
                    return <div className="line-clamp-2">{getRoomStatus(item.status)}</div>;
                case "images":
                    return (
                        <div className="flex gap-1 justify-center">
                            {item.images && item.images.length > 0 ? (
                                item.images.slice(0, 3).map((image: string, index: number) => {
                                    const imageUrl = image.startsWith("http")
                                        ? image
                                        : `${import.meta.env.VITE_BASE_SERVER}/${image}`;
                                    return (
                                        <Image
                                            key={index}
                                            src={imageUrl}
                                            alt={`${item.name}-${index}`}
                                            className="object-cover rounded-md"
                                            width={40}
                                            height={40}
                                        />
                                    );
                                })
                            ) : (
                                <span className="text-gray-400">Không có ảnh</span>
                            )}
                            {item.images && item.images.length > 3 && (
                                <div className="flex items-center justify-center">
                                    <span className="text-xs">+{item.images.length - 3}</span>
                                </div>
                            )}
                        </div>
                    );
                case "createdAt":
                    return <div className="line-clamp-2">{formatDateTime(item.createdAt)}</div>;
                case "updatedAt":
                    return (
                        <div className="line-clamp-2">{formatDateTimeDetail(item.updatedAt)}</div>
                    );

                case "isActive":
                    return (
                        <Chip color={getColorUserStatus(item.status)} size="sm" variant="bordered">
                            {formatUserStatus(item.status)}
                        </Chip>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center gap-2 justify-center">
                            <Tooltip content="Sửa">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <PencilIcon
                                        className="size-4 text-success"
                                        onClick={() => {
                                            navigate(`/room/edit/${item.id}`);
                                        }}
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip content="Xoá">
                                <span
                                    onClick={() => handleDeleteRoom(item.id)}
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <TrashIcon className="size-4 text-danger" />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [navigate]
    );

    return (
        <>
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
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <DeleteConfirmationModal
                isOpen={!!roomToDelete}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Xác nhận xoá phòng"
                message="Bạn có chắc chắn muốn xoá phòng này? Hành động này không thể hoàn tác."
            />
        </>
    );
}
