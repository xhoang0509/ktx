export const defaultPagination = {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
};

export const deviceStatus: { [key: string]: { label: string; color: string } } = {
    pending: { label: "đang chờ xử lý", color: "warning" },
    shipping: { label: "đang giao hàng", color: "warning" },
    completed: { label: "đã hoàn thành", color: "success" },
    cancelled: { label: "đã huỷ", color: "danger" },
};
