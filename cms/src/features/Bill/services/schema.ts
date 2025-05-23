import * as yup from "yup";

export const addDeviceSchema = yup
  .object({
    name: yup
      .string()
      .min(1, "Tên thiết bị phải có ít nhất 5 ký tự")
      .max(500, "Tên thiết bị có nhiều nhất 30 ký tự")
      .required("Không được bỏ trống Tên thiết bị"),
    type: yup.string().required("Không được bỏ trống Loại thiết bị"),
    year_of_manufacture: yup.number().required("Không được bỏ trống Năm sản xuất"),
    status: yup.string().required("Không được bỏ trống Trạng thái"),
  })
  .required();
