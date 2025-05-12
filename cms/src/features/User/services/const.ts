import * as yup from "yup";

/**
 * edit addProductSchema to editUserSchema by user table in sql
 *  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL DEFAULT 'other',
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `status` enum('active','inactive','graduated','deleted') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roomId` int DEFAULT NULL,
 */
export const editUserSchema = yup
  .object({
    name: yup
      .string()
      .min(1, "Tên phòng phải có ít nhất 5 ký tự")
      .max(500, "Tên phòng có nhiều nhất 30 ký tự")
      .required("Không được bỏ trống Tên phòng"),
    description: yup.string().nullable(),
    categories: yup
      .array()
      .of(yup.string().required())
      .required("Không được bỏ trống Danh mục"),
    quantity: yup.number().required("Không được bỏ trống Số lượng"),
    price: yup.number().required("Không được bỏ trống Giá"),
    sku: yup.string().required("Không được bỏ trống SKU"),
    size: yup.string().required("Không được bỏ trống Kích cỡ"),
    // size: yup.array().of(yup.string().required()),
    material: yup.string().required("Không được bỏ trống Chất liệu"),
    // material: yup.array().of(yup.string().required()),
    status: yup.string().required("Không được bỏ trống Trạng thái"),
    warranty: yup.string().required("Không được bỏ trống Bảo hành"),
    shippingInfo: yup
      .string()
      .required("Không được bỏ trống Thông tin vận chuyển"),
    images: yup
      .array()
      .of(yup.string().required())
      .required("Không được bỏ trống Hình ảnh"),
  })
  .required();
