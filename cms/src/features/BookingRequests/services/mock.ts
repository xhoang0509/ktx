import { BookingRequest, BookingRequestStatus } from "../types";

export const mockBookingRequests: BookingRequest[] = [
  {
    id: "1",
    studentName: "Nguyễn Văn A",
    requestDate: "2024-10-01T08:00:00Z",
    checkInDate: "2024-10-15T00:00:00Z",
    checkOutDate: "2025-05-15T00:00:00Z",
    roomNumber: "A101",
    status: BookingRequestStatus.PENDING,
    createdAt: "2024-10-01T08:00:00Z",
    updatedAt: "2024-10-01T08:00:00Z"
  },
  {
    id: "2",
    studentName: "Trần Thị B",
    requestDate: "2024-10-02T10:30:00Z",
    checkInDate: "2024-10-20T00:00:00Z",
    checkOutDate: "2025-05-20T00:00:00Z",
    roomNumber: "B205",
    status: BookingRequestStatus.PENDING,
    createdAt: "2024-10-02T10:30:00Z",
    updatedAt: "2024-10-02T10:30:00Z"
  },
  {
    id: "3",
    studentName: "Lê Văn C",
    requestDate: "2024-10-03T09:15:00Z",
    checkInDate: "2024-10-25T00:00:00Z",
    checkOutDate: "2025-05-25T00:00:00Z",
    roomNumber: "C310",
    status: BookingRequestStatus.APPROVED,
    createdAt: "2024-10-03T09:15:00Z",
    updatedAt: "2024-10-04T14:20:00Z"
  },
  {
    id: "4",
    studentName: "Phạm Thị D",
    requestDate: "2024-10-04T11:45:00Z",
    checkInDate: "2024-11-01T00:00:00Z",
    checkOutDate: "2025-06-01T00:00:00Z",
    roomNumber: "A105",
    status: BookingRequestStatus.REJECTED,
    createdAt: "2024-10-04T11:45:00Z",
    updatedAt: "2024-10-05T16:30:00Z"
  },
  {
    id: "5",
    studentName: "Hoàng Văn E",
    requestDate: "2024-10-05T14:00:00Z",
    checkInDate: "2024-11-05T00:00:00Z",
    checkOutDate: "2025-06-05T00:00:00Z",
    roomNumber: "B210",
    status: BookingRequestStatus.PENDING,
    createdAt: "2024-10-05T14:00:00Z",
    updatedAt: "2024-10-05T14:00:00Z"
  }
]; 