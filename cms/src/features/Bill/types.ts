import { Room } from "@features/Room/types";

export interface Contract {
    id: string;
    contractId: string;
    status: "active" | "pending" | "expired" | "terminated";
    room: Room;
    price: number;
}

export interface ServiceFee {
    startReading: number;
    endReading: number;
    usage: number;
    unitPrice: number;
    amount: number;
}

export interface BillFormData {
    roomId: number;
    electricity: {
        startReading: number;
        endReading: number;
        usage: number;
        unitPrice: number;
        amount: number;
    };
    water: {
        startReading: number;
        endReading: number;
        usage: number;
        unitPrice: number;
        amount: number;
    };
    internet: number;
    cleaning: number;
    totalAmount: number;
}

export type Bill = BillFormData;
export type BillForm = BillFormData;

export const defaultServiceFee: ServiceFee = {
    startReading: 0,
    endReading: 0,
    usage: 0,
    unitPrice: 0,
    amount: 0,
};

export const defaultBillForm: BillForm = {
    roomId: 0,
    electricity: { ...defaultServiceFee, unitPrice: 3500 },
    water: { ...defaultServiceFee, unitPrice: 30000 },
    internet: 100000,
    cleaning: 30000,
    totalAmount: 0,
};

export const defaultEditForm: any = {
    roomId: 0,
    electricity: { ...defaultServiceFee, unitPrice: 0 },
    water: { ...defaultServiceFee, unitPrice: 0 },
    internet: 0,
    cleaning: 0,
    totalAmount: 0,
};
