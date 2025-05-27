import AppHeader from "@components/AppHeader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BookingRequestInfo from "../components/BookingRequestInfo";
import { BookingRequestActions } from "../services/slice";
import { BookingRequestDetail, BookingRequestStatus } from "../types";

const BookingRequestDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bookingRequest, setBookingRequest] = useState<BookingRequestDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(
            BookingRequestActions.getBookingRequestDetail({
                id,
                onSuccess: (data: BookingRequestDetail) => {
                    setBookingRequest(data);
                    setLoading(false);
                },
            })
        );
    }, [id]);

    const handleBack = () => {
        navigate("/request");
    };

    const handleApprove = async (notes: string) => {
        if (bookingRequest) {
            setBookingRequest({
                ...bookingRequest,
                status: BookingRequestStatus.ACTIVE,
            });
        }
    };

    const handleReject = async (notes: string) => {
        if (bookingRequest) {
            setBookingRequest({
                ...bookingRequest,
                status: BookingRequestStatus.CANCELLED,
            });
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center p-8 text-center">
                <Spinner />
            </div>
        );
    }

    if (!bookingRequest) {
        return <div className="p-8 text-center">Không tìm thấy yêu cầu đặt phòng</div>;
    }

    return (
        <div className="h-full flex flex-col">
            <AppHeader
                pageTitle="Chi tiết Yêu cầu"
                rightMenu={
                    <Button
                        variant="light"
                        color="primary"
                        className="flex items-center gap-1"
                        onClick={handleBack}
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Quay lại</span>
                    </Button>
                }
            />

            <div className="p-4 flex-1">
                <div className="grid grid-cols-1 gap-4">
                    <BookingRequestInfo bookingRequest={bookingRequest} />
                </div>
            </div>
        </div>
    );
};

export default BookingRequestDetailPage;
