export interface UserDetail {
    avatar?: string;
    full_name: string;
    email: string;
    student_id: string;
    gender: string;
    phone?: string;
    faculty_name: string;
    class_code: string;
    status: "active" | "inactive";
    birth_date: string;
    createdAt: string;
    updatedAt: string;
}