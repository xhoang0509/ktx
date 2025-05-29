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
    birth_date: string;
    student_id: string;
    class_code: string;
    faculty_name: string;
    course: string;
    phone: string;
    email: string;
    address: string;
}

export interface RoomInfo {
    name: string;
    floor: string;
    building: string;
    type: string;
    base_price: string;
    start_date: string;
    end_date: string;
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
}

export const defaultContractData: ContractData = {
    school: {
        schoolName: "Trường Đại học Trường Đại học Sư phạm Kỹ thuật Hưng Yên",
        representative: "Nguyễn Văn A",
        department: "Phòng Công tác HSSV",
        position: "Trưởng phòng",
        phone: "0123456789",
    },
    student: {
        full_name: "Nguyễn Văn B",
        gender: "male",
        birth_date: "2002-01-01",
        student_id: "20201234",
        class_code: "K65CNTT",
        faculty_name: "Công nghệ thông tin",
        course: "65",
        phone: "0912345678",
        email: "nguyenvanb@gmail.com",
        address: "Nam Định",
    },
    room: {
        name: "203",
        building: "B2",
        floor: "1",
        type: "single",
        base_price: "120000",
        start_date: "01/09/2024",
        end_date: "31/01/2025",
    },
};
