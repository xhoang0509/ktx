export enum BookingRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export interface BookingRequest {
  id: string;
  studentName: string;
  requestDate: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: string;
  status: BookingRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequestPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
} 