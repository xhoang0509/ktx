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

export interface BookingRequestDetail {
  id: string;
  requestCode: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  email: string;
  phone: string;
  requestDate: string;
  requestType: string;
  semester: string;
  buildingName: string;
  roomType: string;
  peopleCount: number;
  notes: string;
  status: BookingRequestStatus;
  attachments: {
    id: string;
    name: string;
    url: string;
  }[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
} 