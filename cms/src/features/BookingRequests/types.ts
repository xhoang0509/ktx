import { Room } from "@features/Room/types";
import { UserDetail } from "@features/User";

export enum BookingRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled",
}

export interface BookingRequest {
    user: UserDetail;
    room: Room;
    id: number;
    start_date: string;
    end_date: string;
    duration: number;
    status: BookingRequestStatus;
    createdAt: string;
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
