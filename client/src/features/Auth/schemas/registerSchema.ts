import { validatePassword } from "@utils/validate.util";
import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .min(5, "Họ và Tên phải có ít nhất 5 ký tự")
      .max(30, "Họ và Tên có nhiều nhất 30 ký tự"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Không được bỏ trống email"),
    password: yup
      .string()
      .required("Chưa điền mật khẩu mới")
      .test(
        "is-valid-new-password",
        'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
        (value) => {
          return value ? validatePassword(value) : false;
        }
      ),
    confirmPassword: yup
      .string()
      .required("Chưa điền xác nhận mật khẩu")
      .oneOf(
        [yup.ref("newPassword"), ""],
        "Mật khẩu xác nhận không khớp với mật khẩu mới"
      )
      .test(
        "is-valid-confirm-password",
        'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
        (value) => {
          return value ? validatePassword(value) : false;
        }
      ),
  })
  .required();
