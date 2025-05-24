import { Room } from "@features/Room/types";
import { UserDetail } from "@features/User";

export interface SchoolInfo {
    schoolName: string;
    representative: string;
    department: string;
    position: string;
    phone: string;
}

export interface StudentInfo {
    full_name: string;
    gender: string;
    birth_year: string;
    student_id: string;
    class_name: string;
    faculty: string;
    course: string;
    phone: string;
    email: string;
    address: string;
}

export interface RoomInfo {
    name: string;
    floor: number;
    building: string;
    type: string;
    base_price: number;
}

export interface RentalInfo {
    price: string;
    startDate: string;
    endDate: string;
}

export interface ContractData {
    school: SchoolInfo;
    student: StudentInfo;
    room: RoomInfo;
    rental: RentalInfo;
}

export const defaultContractData: ContractData = {
    school: {
        schoolName: "Trường Đại học Kỹ thuật Công nghiệp Thái Nguyên",
        representative: "Nguyễn Văn A",
        department: "Phòng Công tác HSSV",
        position: "Trưởng phòng",
        phone: "0123456789",
    },
    student: {
        full_name: "Nguyễn Văn B",
        gender: "male",
        birth_year: "2002",
        student_id: "20201234",
        class_name: "K65CNTT",
        faculty: "Công nghệ thông tin",
        course: "65",
        phone: "0912345678",
        email: "nguyenvanb@gmail.com",
        address: "Nam Định",
    },
    room: {
        name: "203",
        building: "B2",
        floor: 1,
        type: "single",
        base_price: 120000,
    },
    rental: {
        price: "120.000",
        startDate: "01/09/2024",
        endDate: "31/01/2025",
    },
};
