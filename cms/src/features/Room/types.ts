export enum RoomGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export interface Room {
  id: string;
  name: string;
  gender: RoomGender;
  max_capacity: number;
  current_capacity: number;
  type: string;
  building: string;
  base_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoomPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
} 