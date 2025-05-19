import { RoomGender } from "../types";
import * as yup from "yup";

export const defaultAddRoomForm = {
  name: "",
  gender: RoomGender.MALE,
  max_capacity: 4,
  current_capacity: 0,
  base_price: 0,
  images: [],
  floor: 0,
  building: "",
  type: "",
  note: "",
  status: "active"
};

export const genderOptions = [
  { key: RoomGender.MALE, label: "Nam" },
  { key: RoomGender.FEMALE, label: "Nữ" },
  { key: RoomGender.OTHER, label: "Khác" }
];

export const statusOptions = [
  { key: "active", label: "Hoạt động" },
  { key: "inactive", label: "Không hoạt động" }
];

export const addRoomSchema = yup.object().shape({
  name: yup.string().required("Tên phòng là bắt buộc"),
  gender: yup.string().oneOf(Object.values(RoomGender), "Giới tính không hợp lệ").required("Giới tính là bắt buộc"),
  max_capacity: yup.number().min(1, "Sức chứa tối thiểu là 1").required("Sức chứa tối đa là bắt buộc"),
  base_price: yup.number().min(0, "Giá không được âm").required("Giá cơ bản là bắt buộc"),
  images: yup.array().min(1, "Cần ít nhất 1 hình ảnh").required("Hình ảnh là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  floor: yup.number().min(0, "Tầng không được âm").required("Tầng là bắt buộc"),
  building: yup.string().required("Tòa nhà là bắt buộc"),
  type: yup.string().required("Loại phòng là bắt buộc"),
  note: yup.string().required("Ghi chú là bắt buộc")
}); 