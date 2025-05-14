export interface Student {
  id: string;
  name: string;
  studentId: string;
  className: string;
}

export interface RoomDetail {
  id: string;
  roomCode: string;
  building: string;
  roomType: string;
  gender: 'Male' | 'Female';
  status: 'Available' | 'Full';
  note?: string;
  students: Student[];
}

export interface Semester {
  id: string;
  name: string;
}

export interface BookingPayload {
  roomId: string;
  semesterId: string;
  note?: string;
} 