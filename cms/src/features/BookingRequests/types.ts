import { Room } from "@features/Room/types";
import { UserDetail } from "@features/User";

export enum BookingRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

// example of data
/*

            "id": 6,
            "start_date": "2025-05-17",
            "end_date": "2025-11-17",
            "duration": 184,
            "status": "cancelled",
            "createdAt": "2025-05-17T07:45:25.000Z",
            "updatedAt": "2025-05-17T07:45:25.000Z",
            "user": {
                "id": 1,
                "full_name": "Nguyễn Văn A",
                "username": "nguyenvana",
                "gender": "male",
                "password": "",
                "phone": "0912345678",
                "student_id": "SV0001",
                "avatar": "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg",
                "status": "active",
                "faculty_name": "",
                "class_code": "",
                "createdAt": "2025-05-09T08:02:52.000Z",
                "updatedAt": "2025-05-09T08:02:52.000Z"
            },
            "room": {
                "id": 22,
                "name": "KTX B2-405",
                "gender": "other",
                "max_capacity": 40,
                "current_capacity": 8,
                "base_price": "518393.10",
                "images": [
                    "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg",
                    "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg",
                    "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg",
                    "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg",
                    "/images/rooms/7f583fcb-6993-46ef-b9f7-25b08251f730.jpeg"
                ],
                "status": "active",
                "building": "Tòa nhà A1",
                "type": null,
                "note": null,
                "createdAt": "2025-05-09T05:21:04.000Z",
                "updatedAt": "2025-05-09T05:21:04.000Z"
            }
        },
        */

export interface BookingRequest {
    user: UserDetail
    room: Room
    id: string;
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
