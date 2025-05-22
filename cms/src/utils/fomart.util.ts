import moment from "moment";

export const formatDateTime = (date: string) => {
    return moment(date).utc().format("hh:mm:ss DD-MM-YYYY");
};

export function formatVND(amount: number | any): string {
    if (isNaN(amount) || amount === null) {
        return "Số tiền không hợp lệ";
    }

    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function formatCompactNumber(num: number, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
    });
    return formatter.format(num);
}

export function formatUserStatus(status: string) {
    switch (status) {
        case "active":
            return "Đang hoạt động";
        case "inactive":
            return "Ngừng hoạt động";
        case "graduated":
            return "Đã tốt nghiệp";
        case "deleted":
            return "Đã xóa";
        default:
            return status;
    }
}

export function getColorUserStatus(
    status: string
): "success" | "warning" | "default" | "danger" | "primary" | "secondary" | undefined {
    switch (status) {
        case "active":
            return "success";
        case "inactive":
            return "warning";
        case "graduated":
            return "default";
        case "deleted":
            return "danger";
        default:
            return "default";
    }
}

export function formatDateTimeDetail(dateString: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}


export function getRoomStatus(status: string) {
    switch (status) {
        case "active":
            return "Hoạt động";
        case "inactive":
            return "Ngừng hoạt động";
        default:
            return status;
    }
}
