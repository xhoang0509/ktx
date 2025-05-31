import { Chip, Input } from "@heroui/react";
import { formatDate, formatDateTime } from "@utils/fomart.util";
import { BookingRequestDetail, BookingRequestStatus } from "../types";

interface BookingRequestInfoProps {
    bookingRequest: BookingRequestDetail;
}

export const getStatusText = (status: BookingRequestStatus) => {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "Chờ duyệt";
        case BookingRequestStatus.ACTIVE:
            return "Đã duyệt";
        case BookingRequestStatus.TERMINATED:
            return "Từ chối";
        case BookingRequestStatus.CANCELLED:
            return "Đã hủy";
        case BookingRequestStatus.EXPIRED:
            return "Đã hết hạn";
        default:
            return "Không xác định";
    }
};
export const getStatusContractColor = (status: BookingRequestStatus) => {
    switch (status) {
        case BookingRequestStatus.PENDING:
            return "warning";
        case BookingRequestStatus.ACTIVE:
            return "success";
        case BookingRequestStatus.TERMINATED:
            return "danger";
        case BookingRequestStatus.CANCELLED:
            return "default";
        case BookingRequestStatus.EXPIRED:
    }
};

const BookingRequestInfo = ({ bookingRequest }: BookingRequestInfoProps) => {
    const { id, createdAt, user, room, start_date, end_date, status } = bookingRequest;

    return (
        <>
            <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Thông tin yêu cầu #{id}</h3>
                    <Chip color={getStatusContractColor(status)}>
                        <span className="">{getStatusText(status)}</span>
                    </Chip>
                </div>

                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                        <h4 className="text-base font-medium mb-3">Thông tin cơ bản</h4>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mb-2">Mã sinh viên</div>
                        <Input value={user.student_id} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mb-2">Tên sinh viên</div>
                        <Input value={user.full_name} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mb-2">Ngày tạo</div>
                        <Input value={formatDateTime(createdAt)} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mb-2">Lớp</div>
                        <Input value={user.class_code} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mb-2">Email</div>
                        <Input value={user.email} readOnly />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
                <h3 className="text-lg font-medium mb-4">Nội dung yêu cầu</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 md:col-span-6">
                        <div className="mb-2">Ngày bắt đầu</div>
                        <Input value={`${formatDate(start_date)}`} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-6">
                        <div className="mb-2">Ngày kết thúc</div>
                        <Input value={`${formatDate(end_date)}`} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-6">
                        <div className="mb-2">Số người tối đa</div>
                        <Input value={`${room.max_capacity}`} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-6">
                        <div className="mb-2">Tòa nhà</div>
                        <Input value={room.building} readOnly />
                    </div>

                    <div className="col-span-6 md:col-span-6">
                        <div className="mb-2">Loại phòng</div>
                        <Input value={`${room.type}`} readOnly />
                    </div>

                    <div className="col-span-12">
                        <div className="mb-2">Ghi chú</div>
                        <Input value={room.note} readOnly />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingRequestInfo;
