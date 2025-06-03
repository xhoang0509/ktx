export enum RoomGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export interface Student {
  id: string;
  name?: string;
  full_name?: string;
  student_id?: string;
  email?: string;
  phone?: string;
}

export interface Room {
  id: number;
  name: string;
  gender: RoomGender;
  max_capacity: number;
  current_capacity: number;
  type: string;
  building: string;
  note: string;
  base_price: number;
  students?: Student[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
} 