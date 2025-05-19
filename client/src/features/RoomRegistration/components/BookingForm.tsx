import { Button } from "@heroui/button";
import { DateRangePicker, Textarea } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { addMonths } from "@utils/date.util";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BookingPayload, RoomDetail } from "../types";

interface BookingFormProps {
    room: RoomDetail;
    roomId: string;
    onSubmit: (data: BookingPayload) => void;
    isDisabled?: boolean;
}

const BookingForm: FC<BookingFormProps> = ({ room, roomId, onSubmit, isDisabled = false }) => {
    const disabled = room.current_capacity === room.max_capacity;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<BookingPayload>({
        defaultValues: {
            roomId,
            startDate: today(getLocalTimeZone()),
            endDate: addMonths(today(getLocalTimeZone()), 6),
            note: "",
        },
    });

    const handleFormSubmit = async (data: BookingPayload) => {
        if (isDisabled || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(data);
        } finally {
            setIsSubmitting(false);
        }
    };

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Gửi yêu cầu đặt phòng</h2>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <label
                        htmlFor="semesterId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Thời gian đăng ký
                    </label>
                    <DateRangePicker
                        defaultValue={{
                            start: today(getLocalTimeZone()),
                            end: addMonths(today(getLocalTimeZone()), 6),
                        }}
                        minValue={today(getLocalTimeZone())}
                        maxValue={addMonths(today(getLocalTimeZone()), 6)}
                        className="max-w-xs"
                        label="Thời gian đăng ký phòng"
                        errorMessage={(error) => {
                            const errorMessage = error.validationErrors.map((error) => {
                                if (error.includes("or later.")) {
                                    return "Ngày bắt đầu phải là ngày trước ngày hiện tại.";
                                }
                                if (error.includes("before end date.")) {
                                    return "Ngày bắt đầu phải trước ngày kết thúc.";
                                }
                            });
                            return errorMessage.join(" ");
                        }}
                        value={{
                            start: startDate,
                            end: endDate,
                        }}
                    />
                </div>

                <div>
                    <Textarea
                        className="w-full"
                        label="Ghi chú của sinh viên"
                        placeholder="Mong muốn ở cùng bạn, nhu cầu đặc biệt..."
                        disabled={isDisabled || isSubmitting}
                        {...register("note")}
                    />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        disabled={disabled || isSubmitting}
                    >
                        {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
