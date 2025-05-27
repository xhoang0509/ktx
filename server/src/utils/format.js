
const formatVND = (amount) => {
    if (isNaN(amount) || amount === null) {
        return "Số tiền không hợp lệ";
    }

    if (typeof amount === "string") {
        amount = parseFloat(amount);
    }
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

module.exports = {
    formatVND,
};
