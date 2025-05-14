import demoRoomImage from "@assets/images/demo_room.png";
import { ROUTE_PATHS } from "@constants/route.const";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
    Link,
} from "@heroui/react";
import { getGender } from "@utils/gender.util";
import { formatMoney } from "@utils/money.util";
import { useNavigate } from "react-router";
const mockData = [
    {
        id: 1,
        name: "Phòng 1",
        gender: "male",
        max_capacity: 4,
        current_capacity: 2,
        base_price: 1000000,
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "Phòng 2",
        gender: "female",
        max_capacity: 4,
        current_capacity: 2,
        base_price: 1000000,
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "Phòng 3",
        gender: "other",
        max_capacity: 4,
        current_capacity: 3,
        base_price: 1000000,
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "Phòng 3",
        gender: "other",
        max_capacity: 4,
        current_capacity: 4,
        base_price: 1000000,
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "Phòng 3",
        gender: "other",
        max_capacity: 4,
        current_capacity: 1,
        base_price: 1000000,
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function RoomRegistration() {
    const navigate = useNavigate();
    const getChipColor = (current_capacity: number, max_capacity: number) => {
        if (current_capacity <= Math.floor(max_capacity / 2)) return "success";
        if (current_capacity === max_capacity) return "danger";
        if (current_capacity >= max_capacity) return "warning";
        return "secondary";
    };

    const handleLinkClick = (id: number) => {
        navigate(`/${ROUTE_PATHS.ROOM_REGISTRATION}/${id}`);
    };
    return (
        <div className="mt-4">
            {/* give me grid 4 col with tailwindcss */}
            <div className="grid grid-cols-4 gap-4">
                {mockData.map((room) => (
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
                                color={getChipColor(room.current_capacity, room.max_capacity)}
                                className="text-white"
                            >
                                Số lượng: {room.current_capacity}/{room.max_capacity}
                            </Chip>
                            <p className="text-small mt-5 text-default-500">
                                Giá: {formatMoney(room.base_price)} / tháng
                            </p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link className="cursor-pointer" showAnchorIcon onClick={() => handleLinkClick(room.id)}>
                                Đặt phòng
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
