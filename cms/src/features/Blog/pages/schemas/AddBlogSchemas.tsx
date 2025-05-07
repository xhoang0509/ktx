import * as yup from "yup";

export const addBlogSchema = yup
  .object({
    title: yup
      .string()
      .min(5, "Tiêu đề bài viết phải có ít nhất 5 ký tự")
      .max(200, "Tiêu đề bài viết có nhiều nhất 200 ký tự")
      .required("Không được bỏ trống Tiêu đề bài viết"),
    content: yup
      .string()
      .min(5, "Tên blog phải có ít nhất 5 ký tự")
      .required("Không được bỏ trống nội dung"),
    image: yup
      .array()
      .of(yup.string().required())
      .required("Không được bỏ trống Hình ảnh"),
    status: yup.string().required("Không được bỏ trống Trạng thái"),
  })
  .required();
