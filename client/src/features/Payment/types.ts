export interface User {
    id: string;
    full_name: string;
    student_id: string;
    email: string;
}

export interface Room {
    id: number;
    name: string;
    gender: string;
    max_capacity: number;
    current_capacity: number;
    base_price: string;
    images: string[];
    status: string;
    building: string;
    floor: number;
    type: string;
    note: string;
    devices: any;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceUsage {
    usage: number;
    amount: number;
    unitPrice: number;
    endReading: number;
    startReading: number;
}

export interface Bill {
    id: number;
    code: string;
    electricity: ServiceUsage;
    water: ServiceUsage;
    internet: number;
    cleaning: number;
    totalAmount: number;
    status: "pending" | "paid" | "overdue";
    createdAt: string;
    updatedAt: string;
    room: Room;
}

export interface BillsState {
    bills: Bill[];
    loading: boolean;
    error: string | null;
}
