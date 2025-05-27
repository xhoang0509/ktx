import {
    Student,
    Room,
    Bill,
    Activity,
    SummaryData,
    MonthlyBillData,
    GenderData,
    TopUsageRoom,
} from "./types";

export const mockStudents: Student[] = [
    { id: "1", name: "Nguyễn Văn A", gender: "male", roomId: "A101", checkInDate: "2024-01-15" },
    { id: "2", name: "Trần Thị B", gender: "female", roomId: "B201", checkInDate: "2024-01-20" },
    { id: "3", name: "Lê Văn C", gender: "male", roomId: "A102", checkInDate: "2024-02-01" },
    { id: "4", name: "Phạm Thị D", gender: "female", roomId: "B202", checkInDate: "2024-02-10" },
    { id: "5", name: "Hoàng Văn E", gender: "male", roomId: "A103", checkInDate: "2024-02-15" },
    { id: "6", name: "Vũ Thị F", gender: "female", roomId: "B203", checkInDate: "2024-03-01" },
    { id: "7", name: "Đỗ Văn G", gender: "male", roomId: "A104", checkInDate: "2024-03-05" },
];

export const mockBills: Bill[] = [
    {
        id: "1",
        roomId: "A101",
        type: "electricity",
        amount: 250000,
        month: 12,
        year: 2024,
        isPaid: true,
        dueDate: "2024-12-31",
    },
    {
        id: "2",
        roomId: "A101",
        type: "water",
        amount: 80000,
        month: 12,
        year: 2024,
        isPaid: false,
        dueDate: "2024-12-31",
    },
    {
        id: "3",
        roomId: "A102",
        type: "electricity",
        amount: 280000,
        month: 12,
        year: 2024,
        isPaid: true,
        dueDate: "2024-12-31",
    },
    {
        id: "4",
        roomId: "A102",
        type: "water",
        amount: 75000,
        month: 12,
        year: 2024,
        isPaid: false,
        dueDate: "2024-12-31",
    },
];

export const mockActivities: Activity[] = [
    {
        id: "1",
        title: "Họp ban quản lý ký túc xá",
        description: "Họp định kỳ hàng tháng",
        date: "2024-12-15",
        type: "meeting",
    },
    {
        id: "2",
        title: "Bảo trì hệ thống điện",
        description: "Kiểm tra và bảo trì hệ thống điện tòa A",
        date: "2024-12-10",
        type: "maintenance",
    },
    {
        id: "3",
        title: "Giao lưu văn hóa",
        description: "Chương trình giao lưu văn hóa giữa các sinh viên",
        date: "2024-12-08",
        type: "event",
    },
    {
        id: "4",
        title: "Kiểm tra an toàn PCCC",
        description: "Kiểm tra định kỳ hệ thống PCCC",
        date: "2024-12-05",
        type: "maintenance",
    },
    {
        id: "5",
        title: "Sinh nhật tập thể tháng 12",
        description: "Tổ chức sinh nhật cho sinh viên có sinh nhật tháng 12",
        date: "2024-12-20",
        type: "event",
    },
];

export const mockSummaryData: SummaryData = {
    totalStudents: 7,
    maxCapacity: 288,
    totalElectricityBill: 2021950,
    totalWaterBill: 144000,
    totalPaidBills: 818150,
    totalUnpaidBills: 818150,
};

export const mockMonthlyBillData: MonthlyBillData[] = [
    { month: "T1", paid: 650000, unpaid: 320000 },
    { month: "T2", paid: 720000, unpaid: 280000 },
    { month: "T3", paid: 680000, unpaid: 350000 },
    { month: "T4", paid: 750000, unpaid: 290000 },
    { month: "T5", paid: 800000, unpaid: 250000 },
    { month: "T6", paid: 780000, unpaid: 270000 },
    { month: "T7", paid: 820000, unpaid: 230000 },
    { month: "T8", paid: 850000, unpaid: 200000 },
    { month: "T9", paid: 790000, unpaid: 260000 },
    { month: "T10", paid: 830000, unpaid: 220000 },
    { month: "T11", paid: 810000, unpaid: 240000 },
    { month: "T12", paid: 818150, unpaid: 818150 },
];

export const mockGenderData: GenderData[] = [
    { gender: "Nam", count: 4, percentage: 57.1 },
    { gender: "Nữ", count: 3, percentage: 42.9 },
];

export const mockTopUsageRooms: TopUsageRoom[] = [
    { roomName: "A103", electricityBill: 320000, waterBill: 90000, totalBill: 410000 },
    { roomName: "B203", electricityBill: 310000, waterBill: 92000, totalBill: 402000 },
    { roomName: "A104", electricityBill: 300000, waterBill: 85000, totalBill: 385000 },
    { roomName: "B202", electricityBill: 290000, waterBill: 88000, totalBill: 378000 },
    { roomName: "A102", electricityBill: 280000, waterBill: 75000, totalBill: 355000 },
    { roomName: "B201", electricityBill: 270000, waterBill: 70000, totalBill: 340000 },
    { roomName: "A101", electricityBill: 250000, waterBill: 80000, totalBill: 330000 },
];
