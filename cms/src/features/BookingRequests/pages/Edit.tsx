import AppHeader from "@components/AppHeader";
import { ROUTE_PATHS } from "@constants/route.const";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@services/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EditRequestForm from "../components/EditRequestForm";
import { editRequestSchema } from "../services/schema";
import { BookingRequestActions } from "../services/slice";
import { BookingRequestDetail } from "../types";

const defaultEditRequestForm = {
    start_date: "",
    end_date: "",
    status: "",
};

export default function Edit() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: defaultEditRequestForm,
        resolver: yupResolver(editRequestSchema),
    });
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const [bookingRequest, setBookingRequest] = useState<BookingRequestDetail | null>(null);

    useEffect(() => {
        dispatch(
            BookingRequestActions.getBookingRequestDetail({
                id,
                onSuccess: (data: BookingRequestDetail) => {
                    setBookingRequest(data);
                    setLoading(false);
                    reset(data);
                },
            })
        );
    }, [id]);

    const handleBack = () => {
        navigate("/request");
    };

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
        };
        dispatch(
            BookingRequestActions.editRequest({
                id,
                body: payload,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.REQUEST}`);
                },
            })
        );
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Sửa hợp đồng"
                    rightMenu={
                        <>
                            <Button
                                variant="light"
                                color="primary"
                                className="flex items-center gap-1"
                                onClick={handleBack}
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                                <span>Quay lại</span>
                            </Button>
                            <Button color="primary" type="submit">
                                <span>Lưu thay đổi</span>
                            </Button>
                        </>
                    }
                />

                <div className="p-4 flex-1">
                    <div className="grid grid-cols-1 gap-4">
                        <EditRequestForm control={control} bookingRequest={bookingRequest} />
                    </div>
                </div>
            </form>
        </div>
    );
}
