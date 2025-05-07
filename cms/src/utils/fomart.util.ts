import moment from "moment";

export const formatDateTime = (date: string) => {
  return moment(date).utc().format("hh:mm:ss DD-MM-YYYY");
};

export function formatVND(amount: number | any): string {
  if (isNaN(amount) || amount === null) {
    return "Số tiền không hợp lệ";
  }

  // Định dạng số với dấu phân cách hàng nghìn và ký tự VNĐ
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function formatCompactNumber(num: number, locale = "en-US") {
  const formatter = new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
  return formatter.format(num);
}
