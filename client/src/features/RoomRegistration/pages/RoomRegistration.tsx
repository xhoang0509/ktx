import demoRoomImage from "@assets/images/demo_room.png";
import { PAGINATION } from "@constants/pagination.const";
import { ROUTE_PATHS } from "@constants/route.const";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
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
    Link,
    Spinner,
} from "@heroui/react";
import { useDebounceSearch } from "@hooks/useDebounceSearch";
import { RoomService } from "@services/room.service";
import { getGender } from "@utils/gender.util";
import { formatMoney } from "@utils/money.util";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Room {
    id: number;
    name: string;
    gender: string;
    max_capacity: number;
    current_capacity: number;
    images: string[];
    base_price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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

    const handleLinkClick = (id: number) => {
        navigate(`/${ROUTE_PATHS.ROOM_REGISTRATION}/${id}`);
    };
    const handleSearch = () => {
        console.log("search", valueInput);
    };

    return (
        <div className="mt-4">
            <div className="mb-5 flex gap-3 border-2 border-gray-300 rounded-md p-2">
                <Input
                    placeholder="Tìm kiếm phòng"
                    value={valueInput}
                    onChange={(e) => onChangeInput(e.target.value)}
                />
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {rooms?.length &&
                        rooms.map((room) => (
                            <Card key={room.id} className="max-w-[400px]">
                                <CardHeader className="flex gap-3">
                                    <Image
                                        alt="heroui logo"
                                        height={40}
                                        radius="sm"
                                        src={demoRoomImage}
                                        width={40}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-md">{room.name}</p>
                                        <p className="text-small text-default-500">
                                            Giới tính: {getGender(room.gender)}
                                        </p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <Chip
                                        color={getChipColor(
                                            room.current_capacity,
                                            room.max_capacity
                                        )}
                                        className="text-white"
                                    >
                                        Số lượng: {room.current_capacity}/{room.max_capacity}
                                    </Chip>
                                    <div className="mt-5 text-sm">
                                        Hình ảnh phòng:
                                        <div className="flex justify-start flex-wrap gap-3">
                                            {room?.images?.length &&
                                                room.images.map((image, index) => {
                                                    return (
                                                        <Image
                                                            key={index}
                                                            src={`${
                                                                import.meta.env.VITE_API_BASE
                                                            }${image}`}
                                                            alt="room"
                                                            className="object-cover"
                                                            height={100}
                                                            width={100}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <p className="text-small mt-5 text-default-500">
                                        Giá: {formatMoney(room.base_price)} / tháng
                                    </p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <Link
                                        className="cursor-pointer"
                                        showAnchorIcon
                                        onClick={() => handleLinkClick(room.id)}
                                    >
                                        Đặt phòng
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                </div>
            )}
        </div>
    );
}
