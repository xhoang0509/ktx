export interface Student {
    id: string;
    name: string;
    gender: 'male' | 'female';
    roomId: string;
    checkInDate: string;
}

export interface Room {
    id: string;
    name: string;
    capacity: number;
    currentOccupancy: number;
    electricityBill: number;
    waterBill: number;
    totalBill: number;
}

export interface Bill {
    id: string;
    roomId: string;
    type: 'electricity' | 'water';
    amount: number;
    month: number;
    year: number;
    isPaid: boolean;
    dueDate: string;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'event' | 'maintenance' | 'meeting';
}

export interface SummaryData {
    totalStudents: number;
    maxCapacity: number;
    totalElectricityBill: number;
    totalWaterBill: number;
    totalPaidBills: number;
    totalUnpaidBills: number;
}

export interface MonthlyBillData {
    month: string;
    paid: number;
    unpaid: number;
}

export interface GenderData {
    gender: string;
    count: number;
    percentage: number;
}

export interface TopUsageRoom {
    roomName: string;
    electricityBill: number;
    waterBill: number;
    totalBill: number;
} 