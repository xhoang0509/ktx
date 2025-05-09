import { BookingRequestDetail, BookingRequestStatus } from "../types";
import { formatDateTimeDetail } from "@utils/fomart.util";
import { Chip, Input } from "@heroui/react";

interface BookingRequestInfoProps {
  bookingRequest: BookingRequestDetail;
}

const getStatusColor = (status: BookingRequestStatus) => {
  switch (status) {
    case BookingRequestStatus.PENDING:
      return "warning";
    case BookingRequestStatus.APPROVED:
      return "success";
    case BookingRequestStatus.REJECTED:
      return "danger";
    default:
      return "default";
  }
};

const getStatusText = (status: BookingRequestStatus) => {
  switch (status) {
    case BookingRequestStatus.PENDING:
      return "Chờ duyệt";
    case BookingRequestStatus.APPROVED:
      return "Đã duyệt";
    case BookingRequestStatus.REJECTED:
      return "Từ chối";
    default:
      return "Không xác định";
  }
};

const BookingRequestInfo = ({ bookingRequest }: BookingRequestInfoProps) => {
  const {
    requestCode,
    requestDate,
    requestType,
    studentId,
    studentName,
    studentClass,
    email,
    phone,
    semester,
    buildingName,
    roomType,
    peopleCount,
    notes,
    status,
    attachments,
  } = bookingRequest;

  const formattedRequestDate = formatDateTimeDetail(requestDate);

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Thông tin yêu cầu #{requestCode}</h3>
          <Chip color={getStatusColor(status)}>
            <span className="text-white">
              {getStatusText(status)}
            </span>
          </Chip>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-base font-medium mb-3">Thông tin cơ bản</h4>
          </div>
          
          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Mã yêu cầu</div>
            <Input value={requestCode} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Ngày tạo</div>
            <Input value={formattedRequestDate} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Loại yêu cầu</div>
            <Input value={requestType} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Mã sinh viên</div>
            <Input value={studentId} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Tên sinh viên</div>
            <Input value={studentName} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Lớp</div>
            <Input value={studentClass} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Email</div>
            <Input value={email} readOnly />
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-2">Số điện thoại</div>
            <Input value={phone} readOnly />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
        <h3 className="text-lg font-medium mb-4">Nội dung yêu cầu</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-4">
            <div className="mb-2">Thời gian đăng ký</div>
            <Input value={semester} readOnly />
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="mb-2">Tòa nhà</div>
            <Input value={buildingName} readOnly />
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="mb-2">Loại phòng</div>
            <Input value={`${peopleCount} người`} readOnly />
          </div>

          <div className="col-span-12">
            <div className="mb-2">Ghi chú</div>
            <Input value={notes} readOnly />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
        <h3 className="text-lg font-medium mb-4">Tài liệu đính kèm</h3>
        <div className="flex flex-wrap gap-3">
          {attachments.length > 0 ? (
            attachments.map((file) => (
              <a 
                key={file.id}
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {file.name}
              </a>
            ))
          ) : (
            <p className="text-gray-500">Không có tài liệu đính kèm</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingRequestInfo; 