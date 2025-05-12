export interface UserDetail {
  id: string;
  full_name: string;
  username: string;
  gender: "male" | "female" | "other";
  phone: string;
  avatar: string;
  status: UserStatus;
  student_id: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserStatus = "active" | "inactive" | "graduated" | "deleted";

export const userStatusOptions = [
  { value: "active", label: "Đang hoạt động" },
  { value: "inactive", label: "Đã khóa" },
  { value: "graduated", label: "Đã tốt nghiệp" },
  { value: "deleted", label: "Đã xóa" }
];

export const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" }
]; 