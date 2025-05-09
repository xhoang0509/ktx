import { Room, RoomGender } from "../types";

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "A101",
    gender: RoomGender.MALE,
    max_capacity: 4,
    current_capacity: 3,
    base_price: 1500000,
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-10-15T10:30:00Z"
  },
  {
    id: "2",
    name: "A102",
    gender: RoomGender.MALE,
    max_capacity: 4,
    current_capacity: 4,
    base_price: 1500000,
    createdAt: "2023-06-01T08:15:00Z",
    updatedAt: "2023-11-20T14:45:00Z"
  },
  {
    id: "3",
    name: "B201",
    gender: RoomGender.FEMALE,
    max_capacity: 6,
    current_capacity: 4,
    base_price: 1800000,
    createdAt: "2023-06-02T09:30:00Z",
    updatedAt: "2023-12-05T11:20:00Z"
  },
  {
    id: "4",
    name: "B202",
    gender: RoomGender.FEMALE,
    max_capacity: 6,
    current_capacity: 5,
    base_price: 1800000,
    createdAt: "2023-06-02T09:45:00Z",
    updatedAt: "2024-01-10T16:15:00Z"
  },
  {
    id: "5",
    name: "C301",
    gender: RoomGender.OTHER,
    max_capacity: 2,
    current_capacity: 1,
    base_price: 2500000,
    createdAt: "2023-06-03T10:00:00Z",
    updatedAt: "2024-02-18T12:30:00Z"
  }
]; 