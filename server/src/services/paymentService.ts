import { LessThanOrEqual, Repository } from "typeorm";
import { Payment } from "../models/entities/payments";
import { User } from "../models/entities/user";
import { Room } from "../models/entities/room";
import { AppDataSource } from "../models/db";

export class PaymentService {
    private readonly paymentRepo: Repository<Payment>
    private readonly userRepo: Repository<User>
    private readonly roomRepo: Repository<Room>

    constructor() {
        this.paymentRepo = AppDataSource.getRepository(Payment);
        this.userRepo = AppDataSource.getRepository(User);
        this.roomRepo = AppDataSource.getRepository(Room);
    }

    //Admin nhập tiền điện nước cho phòng
    async addUtilityCost(roomId: number, utilityAmount: number, month: number, year: number): Promise<any> {
        const room = await this.roomRepo.findOne({
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
            let payment = await this.paymentRepo.findOne({
                where: {
                    user: s,
                    month,
                    year,
                }
            });
            if (!payment) {
                payment = this.paymentRepo.create({
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
            return this.paymentRepo.save(payment);
        }));
        return payments;
    }

    //Admin xem danh sách công nợ sinh viên
    async getStudentDebts(): Promise<any> {
        return await this.paymentRepo.findOne({
            where: {
                status: "pending"
            },
            relations: ["user", "room"]
        });
    }

    //Admin xuất báo cáo tài chính
    async getFinancialReport(month: number, year: number): Promise<any> {
        return await this.paymentRepo.find({
            where: {
                month,
                year,
                status: "completed",
            },
            relations: ["user", "room"],
        });
    }

    //Theo dõi trễ hạn
    async getLatePayments(): Promise<any> {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        return await this.paymentRepo.find({
            where: [
                {
                    status: "pending",
                    year: LessThanOrEqual(currentYear),
                    month: LessThanOrEqual(currentMonth - 1),
                }
            ],
            relations: ["user", "room"],
        });
    }

    //Sinh viên xem hoá đơn của mình
    async getStudentPayments(userId: number): Promise<Payment[]> {
        return await this.paymentRepo.find({
            where: {
                user: {
                    id: userId,
                }
            },
            relations: ["room"],
        });
    }

    //Sinh viên thanh toán
    async completePayment(paymentId: number, paymentMethod: string): Promise<Payment> {
        const payment = await this.paymentRepo.findOne({
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

        return await this.paymentRepo.save(payment);
    }

    //Sinh viên xem lịch sử thanh toán
    async getPaymentHistory(userId: number): Promise<Payment[]> {
        return await this.paymentRepo.find({
            where: { user: { id: userId } },
            order: { payment_date: "DESC" },
            relations: ["room"]
        });
    }
}