import * as yup from "yup";

export const addBillSchema = yup.object().shape({
  roomId: yup.number().required("Vui lòng chọn phòng"),
  electricity: yup.object().shape({
    startReading: yup
      .number()
      .required("Vui lòng nhập chỉ số đầu")
      .min(0, "Chỉ số không được âm"),
    endReading: yup
      .number()
      .required("Vui lòng nhập chỉ số cuối")
      .min(0, "Chỉ số không được âm")
      .test(
        "is-greater-than-start",
        "Chỉ số cuối phải lớn hơn hoặc bằng chỉ số đầu",
        (value, context) => {
          const { startReading } = context.parent;
          return value >= startReading;
        }
      ),
    usage: yup.number(),
    unitPrice: yup
      .number()
      .required("Vui lòng nhập đơn giá")
      .min(0, "Đơn giá không được âm"),
    amount: yup.number(),
  }),
  water: yup.object().shape({
    startReading: yup
      .number()
      .required("Vui lòng nhập chỉ số đầu")
      .min(0, "Chỉ số không được âm"),
    endReading: yup
      .number()
      .required("Vui lòng nhập chỉ số cuối")
      .min(0, "Chỉ số không được âm")
      .test(
        "is-greater-than-start",
        "Chỉ số cuối phải lớn hơn hoặc bằng chỉ số đầu",
        (value, context) => {
          const { startReading } = context.parent;
          return value >= startReading;
        }
      ),
    usage: yup.number(),
    unitPrice: yup
      .number()
      .required("Vui lòng nhập đơn giá")
      .min(0, "Đơn giá không được âm"),
    amount: yup.number(),
  }),
  internet: yup
    .number()
    .required("Vui lòng nhập tiền Internet")
    .min(0, "Giá trị không được âm"),
  cleaning: yup
    .number()
    .required("Vui lòng nhập tiền vệ sinh")
    .min(0, "Giá trị không được âm"),
  totalAmount: yup.number(),
});

export const billSchema = addBillSchema;
