import * as yup from "yup";

export const editRequestSchema = yup.object().shape({
    start_date: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    end_date: yup.string().required("Vui lòng nhập ngày kết thúc"),
    status: yup.string().required("Vui lòng chọn trạng thái"),
});
