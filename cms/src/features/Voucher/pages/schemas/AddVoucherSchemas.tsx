import * as yup from "yup";

export const addVoucherSchema = yup
  .object({
    name: yup
      .string()
      .min(5, "Tên voucher phải có ít nhất 5 ký tự")
      .max(20, "Tên voucher có nhiều nhất 30 ký tự")
      .required("Không được bỏ trống Tên voucher"),
    code: yup.string().required("Không được bỏ trống Code"),
    discount: yup.number().required("Không được bỏ trống giá trị giảm"),
    isPercentage: yup.boolean().required("Không được bỏ trống"),
    minOrderValue: yup
      .number()
      .required("Không được bỏ trống Giá trị đạt áp dụng"),
    isActive: yup.boolean().required("Không được bỏ trống"),
    expiryDate: yup.string().required("Không được bỏ trống ngày hết hạn"),
    quantity: yup.number().required("Không được bỏ trống Số lượng"),
  })
  .required();
