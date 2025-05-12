import { validatePassword } from "@utils/validate.util";
import * as yup from "yup";

export const registerSchema = yup
    .object({
        username: yup
            .string()
            .min(5, "Username phải có ít nhất 5 ký tự")
            .max(30, "Username có nhiều nhất 30 ký tự")
            .required("Username không được bỏ trống"),
        full_name: yup
            .string()
            .min(5, "Họ và tên phải có ít nhất 5 ký tự")
            .max(30, "Họ và tên có nhiều nhất 30 ký tự")
            .required("Họ và tên không được bỏ trống"),
        student_id: yup
            .string()
            .min(6, "Mã sinh viên phải có ít nhất 6 ký tự")
            .max(32, "Mã sinh viên có nhiều nhất 32 ký tự")
            .required("Mã sinh viên không được bỏ trống"),
        password: yup
            .string()
            .required("Mật khẩu không được bỏ trống")
            .test("is-valid-new-password", "Mật khẩu bao gồm 6 đến 32 ký tự!", (value) => {
                return value ? validatePassword(value) : false;
            }),
        confirm_password: yup
            .string()
            .required("Xác nhận mật khẩu không được bỏ trống")
            .oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận không khớp với mật khẩu mới")
            .test(
                "is-valid-confirm-password",
                'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
                (value) => {
                    return value ? validatePassword(value) : false;
                }
            ),
    })
    .required();
