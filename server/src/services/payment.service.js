const { LessThanOrEqual } = require("typeorm");
const { PaymentModel, RoomModel } = require("../models/db");

const PaymentService = {
    async addUtilityCost(roomId, utilityAmount, month, year) {
        const room = await RoomModel.findOne({
            where: {
                id: roomId
            },
            relations: ["users"],
        });
        if (!room) {
            throw new Error("Không tìm thấy phòng");
        }

        const students = room.users;
        if (students?.length === 0) {
            throw new Error("Phòng này không có sinh viên ở");
        }

        const amountPerStudent = utilityAmount / students?.length;

        const payments = await Promise.all(students.map(async (s) => {
            let payment = await PaymentModel.findOne({
                where: {
                    user: s,
                    month,
                    year,
                }
            });
            if (!payment) {
                payment = PaymentModel.create({
                    user: s,
                    room,
                    rent_amount: room.base_price,
                    utility_amount: amountPerStudent,
                    total_amount: room.base_price + amountPerStudent,
                    status: "pending",
                    month,
                    year,
                });
            } else {
                payment.utility_amount = amountPerStudent;
                payment.total_amount = payment.rent_amount + amountPerStudent;
            }
            return PaymentModel.save(payment);
        }));
        return payments;
    },

    // Admin xem danh sách công nợ sinh viên
    async getStudentDebts() {
        return await PaymentModel.findOne({
            where: {
                status: "pending"
            },
            relations: ["user", "room"]
        });
    },

    // Admin xuất báo cáo tài chính
    async getFinancialReport(month, year) {
        return await PaymentModel.find({
            where: {
                month,
                year,
                status: "completed",
            },
            relations: ["user", "room"],
        });
    },

    // Theo dõi trễ hạn
    async getLatePayments() {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        return await PaymentModel.find({
            where: [
                {
                    status: "pending",
                    year: LessThanOrEqual(currentYear),
                    month: LessThanOrEqual(currentMonth - 1),
                }
            ],
            relations: ["user", "room"],
        });
    },

    //Sinh viên xem hoá đơn của mình
    async getStudentPayments(userId) {
        return await PaymentModel.find({
            where: {
                user: {
                    id: userId,
                }
            },
            relations: ["room"],
        });
    },

    //Sinh viên thanh toán
    async completePayment(paymentId, paymentMethod) {
        const payment = await PaymentModel.findOne({
            where: {
                id: paymentId,
            },
        });
        if (!payment) {
            throw new Error("Không tìm thấy hoá đơn");
        }

        payment.status = "completed";
        payment.payment_method = paymentMethod;
        payment.is_settled = true;

        return await PaymentModel.save(payment);
    },

    //Sinh viên xem lịch sử thanh toán
    async getPaymentHistory(userId) {
        return await PaymentModel.find({
            where: { user: { id: userId } },
            order: { payment_date: "DESC" },
            relations: ["room"]
        });
    },
}

module.exports = PaymentService