import SysFetch from "@app/axios";

const BillService = {
    getBills: async () => {
        const response = await SysFetch.post("/payment/student-my-payments");
        return response;
    },
    createPaymentUrl: async (data: any = {}) => {
        const response = await SysFetch.post("/payment/vnpay-create", data);
        return response;
    },
};

export default BillService;
