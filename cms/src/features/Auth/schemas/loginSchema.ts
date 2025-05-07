import { validateName, validatePassword } from "@utils/validate.util";
import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup
      .string()
      .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
      .max(30, "Tên đăng nhập có nhiều nhất 30 ký tự")
      .test(
        "is-valid-name",
        "Tên đăng nhập không bao gồm số và ký tự đặc biệt",
        (value) => {
          return value ? validateName(value) : false;
        }
      )
      .required("Không được bỏ trống Tên đăng nhập"),
    //     email: yup
    //       .string()
    //       .email("Email không hợp lệ")
    //       .required("Không được bỏ trống email"),
    password: yup.string().required("Chưa nhập mật khẩu"),
    // .test(
    //   "is-valid-new-password",
    //   'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
    //   (value) => {
    //     return value ? validatePassword(value) : false;
    //   }
    // )
  })
  .required();
