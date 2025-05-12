import * as yup from "yup";
import { UserStatus } from "../types";

export const editUserSchema = yup.object().shape({
  id: yup.string(),
  full_name: yup.string().required("Họ và tên không được để trống"),
  username: yup.string().required("Tên đăng nhập không được để trống"),
  gender: yup.string().oneOf(["male", "female", "other"], "Giới tính không hợp lệ").required("Giới tính không được để trống"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),
  student_id: yup.string().required("Mã số sinh viên không được để trống"),
  status: yup.string().oneOf(["active", "inactive", "graduated", "deleted"] as UserStatus[], "Trạng thái không hợp lệ").required("Trạng thái không được để trống"),
  role: yup.string(),
  avatar: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string()
}); 