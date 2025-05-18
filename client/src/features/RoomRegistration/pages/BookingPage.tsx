import { AppSelectors } from "@app/slice";
import { ROUTE_PATHS } from "@constants/route.const";
import { Spinner } from "@heroui/react";
import { ContractService } from "@services/contract.service";
import { RoomService } from "@services/room.service";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BookingForm from "../components/BookingForm";
import RoomImages from "../components/RoomImages";
import RoomInfoBox from "../components/RoomInfoBox";
import RoomMembers from "../components/RoomMembers";
import { BookingPayload, RoomDetail } from "../types";

const Booking: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [room, setRoom] = useState<RoomDetail | null>(null);
    const user = useSelector(AppSelectors.userInfo);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const res = await RoomService.getRoomById(id);
                if (res.id) {
                    setRoom(res);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleBookingSubmit = async (data: BookingPayload) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                startDate: data.startDate.toString(),
                endDate: data.endDate.toString(),
                userId: user.id,
            };
            const res = await ContractService.createContract(payload);
            if (res.status === 200) {
                toast.success("Đặt phòng thành công");
                setTimeout(() => {
                    navigate(`/${ROUTE_PATHS.CONTRACT}`);
                }, 1500);
            } else {
                toast.error("Đặt phòng thất bại");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(`/${ROUTE_PATHS.ROOM_REGISTRATION}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Spinner />
            </div>
        );
    }

    if (!room) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-medium text-gray-700">
                    Không tìm thấy thông tin phòng
                </h2>
                <button
                    onClick={handleBack}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="flex py-6 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-1/2">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Đặt phòng nội trú</h1>
                </div>

                <div className="space-y-6">
                    <RoomInfoBox room={room} />
                    <RoomMembers students={room.students} />
                    <BookingForm
                        room={room}
                        roomId={room.id}
                        onSubmit={handleBookingSubmit}
                        isDisabled={room.status === "inactive"}
                    />
                </div>
            </div>
            <div className="w-1/2 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900"></h1>
                    <button
                        onClick={handleBack}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Quay lại
                    </button>
                </div>
                <RoomImages images={room.images} />
            </div>
        </div>
    );
};

export default Booking;
