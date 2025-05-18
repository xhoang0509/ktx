import { CalendarDate } from "@internationalized/date";

export interface Student {
  id: string;
  full_name: string;
  student_id: string;
  class_code: string;
  gender: "other" | "male" | "female";
  faculty_name: string;
  phone: string;
}

export interface RoomDetail {
  id: string;
  name: string;
  gender: "other" | "male" | "female";
  max_capacity: number;
  current_capacity: number;
  base_price: number;
  images: string[];
  status: "active" | "inactive";
  note: string;
  building: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  students: Student[];
}

export interface Semester {
  id: string;
  name: string;
}

export interface BookingPayload {
  roomId: string;
  startDate: CalendarDate;
  endDate: CalendarDate;
  note?: string;
} 