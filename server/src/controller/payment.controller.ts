import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";
import { AuthRequest } from "../middleware/userMiddleware";

export class PaymentController {
    private readonly paymentSer: PaymentService;
    
    constructor() {
        this.paymentSer = new PaymentService();
    }

    //Admin
    async addUtilityCost(req: Request, res: Response) {
        try {
            const { roomId, utilityAmount, month, year } = req.body;
            const response = await this.paymentSer.addUtilityCost(roomId, utilityAmount, month, year);

            return res.status(201).json({ message: "Đã cập nhật tiền điện nước", response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi nhập tiền điện nước", error: error.message });
        }
    }

    async getStudentDebts(req: Request, res: Response) {
        try {
            const response = await this.paymentSer.getStudentDebts();
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách công nợ", error: error.message });
        }
    }

    async getFinancialReport(req: Request, res: Response) {
        try {
            const { month, year } = req.query;
            const response = await this.paymentSer.getFinancialReport(Number(month), Number(year));
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xuất báo cáo", error: error.message });
        }
    }

    async getLatePayments(req: Request, res: Response) {
        try {
            const latePayments = await this.paymentSer.getLatePayments();
            return res.status(200).json({ latePayments });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách thanh toán trễ hạn", error: error.message });
        }
    }

    //Sinh viên
    async getStudentPayments(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.sub;
            const response = await this.paymentSer.getStudentPayments(userId);
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách hóa đơn", error: error.message });
        }
    }

    async completePayment(req: Request, res: Response) {
        try {
            const { paymentId, paymentMethod } = req.body;
            const response = await this.paymentSer.completePayment(paymentId, paymentMethod);
            return res.status(200).json({ message: "Thanh toán thành công", response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi thanh toán", error: error.message });
        }
    }

    async getPaymentHistory(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.sub;
            const payments = await this.paymentSer.getPaymentHistory(userId);
            return res.status(200).json({ payments });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy lịch sử thanh toán", error: error.message });
        }
    }
}