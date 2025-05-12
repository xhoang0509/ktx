import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import AppHeader from "@components/AppHeader";
import BookingRequestInfo from "../components/BookingRequestInfo";
import AdminDecisionBox from "../components/AdminDecisionBox";
import { BookingRequestDetail, BookingRequestStatus } from "../types";

const mockBookingRequestDetail: BookingRequestDetail = {
  id: "1",
  requestCode: "YC001",
  studentId: "SV1234",
  studentName: "Nguyễn Văn A",
  studentClass: "K66-CNTT",
  email: "nguyenvana@example.com",
  phone: "0912345678",
  requestDate: "2025-05-05T10:30:00",
  requestType: "Tham gia nội trú",
  semester: "Học kỳ 1 năm học 2025-2026",
  buildingName: "KTX A",
  roomType: "4 người",
  peopleCount: 4,
  notes: "Sinh viên có nguyện vọng ở cùng bạn học cùng lớp",
  status: BookingRequestStatus.PENDING,
  attachments: [
    {
      id: "1",
      name: "don_dang_ky.pdf",
      url: "#",
    },
    {
      id: "2",
      name: "xac_nhan_sv.pdf",
      url: "#",
    },
  ],
  adminNotes: "",
  createdAt: "2025-05-05T10:30:00",
  updatedAt: "2025-05-05T10:30:00",
};

const BookingRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingRequest, setBookingRequest] = useState<BookingRequestDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setBookingRequest(mockBookingRequestDetail);
      setLoading(false);
    }, 500);
    
    // In a real app, you would fetch the data from API
    // const fetchBookingRequest = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await api.get(`/booking-requests/${id}`);
    //     setBookingRequest(response.data);
    //   } catch (error) {
    //     console.error("Error fetching booking request:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchBookingRequest();
  }, [id]);

  const handleBack = () => {
    navigate("/request");
  };

  const handleApprove = async (notes: string) => {
    // Update the local state
    if (bookingRequest) {
      setBookingRequest({
        ...bookingRequest,
        status: BookingRequestStatus.APPROVED,
        adminNotes: notes,
      });
    }
  };

  const handleReject = async (notes: string) => {
    // In a real app, you would call an API
    
    // Update the local state
    if (bookingRequest) {
      setBookingRequest({
        ...bookingRequest,
        status: BookingRequestStatus.REJECTED,
        adminNotes: notes,
      });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Đang tải...</div>;
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
          
          {bookingRequest.status === BookingRequestStatus.PENDING && (
            <AdminDecisionBox 
              onApprove={handleApprove}
              onReject={handleReject}
              initialNotes={bookingRequest.adminNotes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRequestDetailPage; 