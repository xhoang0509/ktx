import { validatePassword } from "@utils/validate.util";
import * as yup from "yup";

export const loginSchema = yup
    .object({
        username: yup
            .string()
            .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
            .max(30, "Tên đăng nhập có nhiều nhất 30 ký tự")
            .required("Không được bỏ trống Tên đăng nhập"),

        password: yup
            .string()
            .required("Chưa nhập mật khẩu")
            .test(
                "is-valid-new-password",
                'Mật khẩu bao gồm 6 đến 32 ký tự!',
                (value) => {
                    return value ? validatePassword(value) : false;
                }
            ),
    })
    .required();
