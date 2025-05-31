import demoRoomImage from "@assets/images/demo_room.png";
import { PAGINATION } from "@constants/pagination.const";
import { ROUTE_PATHS } from "@constants/route.const";
import { ArrowRightIcon, BuildingOfficeIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
    Input,
    Spinner,
    Tooltip,
} from "@heroui/react";
import { useDebounceSearch } from "@hooks/useDebounceSearch";
import { RoomService } from "@services/room.service";
import { getGender } from "@utils/gender.util";
import { formatMoney } from "@utils/money.util";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Device {
    id: number;
    name: string;
    type: string;
    status: string;
    deviceId: number;
    quantity: number;
    year_of_manufacture: number;
    createdAt: string;
    updatedAt: string;
}

interface Room {
    id: number;
    name: string;
    gender: string;
    max_capacity: number;
    current_capacity: number;
    images: string[];
    base_price: number | string;
    status: string;
    building: string;
    floor: number;
    type: string;
    note: string;
    devices: Device[];
    createdAt: Date | string;
    updatedAt: Date | string;
}

export default function RoomRegistration() {
    const navigate = useNavigate();
    const [valueInput, setValueInput] = useState("");
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const search = useDebounceSearch(valueInput, 800);

    const fetchRooms = async (search: string) => {
        setLoading(true);
        const data = {
            ...PAGINATION,
            search,
        };
        const response = await RoomService.getRooms(data);
        if (response.rooms.length) {
            setRooms(response.rooms as Room[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRooms(search);
    }, [search]);

    const onChangeInput = (value: string) => {
        setValueInput(value);
    };

    const getChipColor = (current_capacity: number, max_capacity: number) => {
        if (current_capacity <= Math.floor(max_capacity / 2)) return "success";
        if (current_capacity === max_capacity) return "danger";
        if (current_capacity >= max_capacity) return "warning";
        return "secondary";
    };

    const getDeviceStatusColor = (status: string) => {
        switch (status) {
            case "good":
                return "success";
            case "damaged":
                return "warning";
            case "deleted":
                return "danger";
            default:
                return "default";
        }
    };

    const getDeviceStatusText = (status: string) => {
        switch (status) {
            case "good":
                return "Tốt";
            case "damaged":
                return "Hỏng";
            case "deleted":
                return "Đã xóa";
            default:
                return status;
        }
    };

    const handleLinkClick = (id: number) => {
        navigate(`/${ROUTE_PATHS.ROOM_REGISTRATION}/${id}`);
    };

    const getActiveDevices = (devices: Device[]) => {
        return devices.filter((device) => device.status !== "deleted");
    };

    const getRoomStatusChip = (status: string) => {
        const color = status === "active" ? "success" : "danger";
        const text = status === "active" ? "Hoạt động" : "Không hoạt động";
        return (
            <Chip color={color} size="sm" variant="flat">
                {text}
            </Chip>
        );
    };

    return (
        <div className="mt-4 mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Đăng Ký Phòng Ký Túc Xá</h1>
                <div className="flex gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <Input
                        placeholder="Tìm kiếm theo tên phòng, tòa nhà..."
                        value={valueInput}
                        onChange={(e) => onChangeInput(e.target.value)}
                        className="flex-1"
                        size="lg"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <Spinner size="lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms?.length > 0 ? (
                        rooms.map((room) => {
                            const imageUrl = room?.images?.[0]?.startsWith("http")
                                ? room.images[0]
                                : room?.images?.[0]
                                ? `${import.meta.env.VITE_API_BASE}${room.images[0]}`
                                : demoRoomImage;

                            const activeDevices = getActiveDevices(room.devices || []);
                            const priceValue =
                                typeof room.base_price === "string"
                                    ? parseFloat(room.base_price)
                                    : room.base_price;

                            return (
                                <Card
                                    key={room.id}
                                    className="w-full w-[300px] hover:shadow-lg transition-shadow duration-300"
                                >
                                    <CardHeader className="pb-0">
                                        <div className="flex justify-between items-start w-full">
                                            <div className="flex gap-3 items-center">
                                                <div className="relative">
                                                    <Image
                                                        alt={room.name}
                                                        height={50}
                                                        radius="md"
                                                        src={imageUrl}
                                                        width={50}
                                                        className="object-cover mt-6"
                                                    />
                                                    {room.status && (
                                                        <div className="absolute -top-2 left-0">
                                                            {getRoomStatusChip(room.status)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-semibold">
                                                        {room.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <BuildingOfficeIcon className="h-4 w-4" />
                                                        <span>
                                                            Tòa {room.building} - Tầng {room.floor}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardBody className="pt-3">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Loại phòng:
                                                </span>
                                                <Chip size="sm" variant="flat" color="primary">
                                                    {room.type}
                                                </Chip>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Giới tính:
                                                </span>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color={
                                                        room.gender === "male"
                                                            ? "primary"
                                                            : "secondary"
                                                    }
                                                >
                                                    {getGender(room.gender)}
                                                </Chip>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Sức chứa:
                                                </span>
                                                <Chip
                                                    color={getChipColor(
                                                        room.current_capacity,
                                                        room.max_capacity
                                                    )}
                                                    size="sm"
                                                    variant="flat"
                                                >
                                                    {room.current_capacity}/{room.max_capacity}{" "}
                                                    người
                                                </Chip>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Giá thuê:
                                                </span>
                                                <span className="font-semibold text-green-600">
                                                    {formatMoney(priceValue)}/tháng
                                                </span>
                                            </div>

                                            {activeDevices.length > 0 && (
                                                <div>
                                                    <span className="text-sm text-gray-600 block mb-2">
                                                        Thiết bị:
                                                    </span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {activeDevices
                                                            .slice(0, 3)
                                                            .map((device, index) => (
                                                                <Tooltip
                                                                    key={index}
                                                                    content={`${device.name} - ${
                                                                        device.type
                                                                    } (${
                                                                        device.quantity
                                                                    } cái) - ${getDeviceStatusText(
                                                                        device.status
                                                                    )}`}
                                                                >
                                                                    <Chip
                                                                        size="sm"
                                                                        variant="bordered"
                                                                        color={getDeviceStatusColor(
                                                                            device.status
                                                                        )}
                                                                        className="text-xs"
                                                                    >
                                                                        {device.name} (
                                                                        {device.quantity})
                                                                    </Chip>
                                                                </Tooltip>
                                                            ))}
                                                        {activeDevices.length > 3 && (
                                                            <Chip
                                                                size="sm"
                                                                variant="flat"
                                                                color="default"
                                                                className="text-xs"
                                                            >
                                                                +{activeDevices.length - 3} khác
                                                            </Chip>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {room.images && room.images.length > 1 && (
                                                <div>
                                                    <span className="text-sm text-gray-600 block mb-2">
                                                        Hình ảnh:
                                                    </span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {room.images
                                                            .slice(1, 4)
                                                            .map((image, index) => {
                                                                const displayImage =
                                                                    image.startsWith("http")
                                                                        ? image
                                                                        : `${
                                                                              import.meta.env
                                                                                  .VITE_API_BASE
                                                                          }${image}`;
                                                                return (
                                                                    <Image
                                                                        key={index}
                                                                        src={displayImage}
                                                                        alt={`Room ${room.name} ${
                                                                            index + 1
                                                                        }`}
                                                                        className="object-cover rounded-md"
                                                                        height={60}
                                                                        width="100%"
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            )}

                                            {room.note && (
                                                <div className="bg-gray-50 p-2 rounded-md">
                                                    <span className="text-xs text-gray-500">
                                                        Ghi chú: {room.note}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </CardBody>

                                    <Divider />

                                    <CardFooter className="pt-3">
                                        <Button
                                            color="primary"
                                            variant="solid"
                                            endContent={<ArrowRightIcon className="h-4 w-4" />}
                                            onClick={() => handleLinkClick(room.id)}
                                            className={`w-full font-medium ${
                                                room.current_capacity >= room.max_capacity ||
                                                room.status !== "active"
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={
                                                room.current_capacity >= room.max_capacity ||
                                                room.status !== "active"
                                            }
                                        >
                                            {room.current_capacity >= room.max_capacity
                                                ? "Phòng đã đầy"
                                                : room.status !== "active"
                                                ? "Phòng không khả dụng"
                                                : "Đăng ký phòng"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-500">
                                <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">Không tìm thấy phòng nào</p>
                                <p className="text-sm">Thử thay đổi từ khóa tìm kiếm</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
