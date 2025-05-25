import { Room } from "@features/Room/types";
import { UserDetail } from "@features/User";

export enum BookingRequestStatus {
    PENDING = "pending",
    ACTIVE = "active",
    TERMINATED = "terminated",
    EXPIRED = "expired",
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
    user: UserDetail;
    room: Room;
    start_date: string;
    end_date: string;
    duration: number;
    status: BookingRequestStatus;
    requestCode: string;
    adminNotes: string;
    createdAt: string;
    updatedAt: string;
}
