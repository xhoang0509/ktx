import { RoomDetail } from "@features/RoomRegistration/types";

export type ContractStatus = "pending" | "active" | "terminated" | "expired" | "cancelled";

export interface Contract {
    id: string;
    createdAt: string;
    start_date: string;
    end_date: string;
    duration: number; // in months
    status: ContractStatus;
    roomId: string;
    room: RoomDetail;
}
