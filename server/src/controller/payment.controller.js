const crypto = require('crypto');
const querystring = require('qs');

const PaymentService = require("../services/payment.service");
const { UserModel, ContractModel, BillModel, RoomModel } = require('../models/db');
const { Like } = require('typeorm');
const { generateCode } = require('../utils/random');
const { vnp_Version, vnp_Url, vnp_TmnCode, vnp_HashSecret } = process.env;

const secretKey = vnp_HashSecret;

const PaymentController = {
    async addUtilityCost(req, res) {
        try {
            const { roomId, utilityAmount, month, year } = req.body;
            const response = await PaymentService.addUtilityCost(roomId, utilityAmount, month, year);

            return res.status(200).json({ message: "Đã cập nhật tiền điện nước", response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi nhập tiền điện nước", error: error.message });
        }
    },

    async getStudentDebts(req, res) {
        try {
            const response = await PaymentService.getStudentDebts();
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách công nợ", error: error.message });
        }
    },

    async getFinancialReport(req, res) {
        try {
            const { month, year } = req.query;
            const response = await PaymentService.getFinancialReport(Number(month), Number(year));
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xuất báo cáo", error: error.message });
        }
    },

    async getLatePayments(req, res) {
        try {
            const latePayments = await PaymentService.getLatePayments();
            return res.status(200).json({ latePayments });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách thanh toán trễ hạn", error: error.message });
        }
    },

    //Sinh viên
    async getStudentPayments(req, res) {
        try {
            const userId = req.user?.sub;
            const response = await PaymentService.getStudentPayments(userId);
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách hóa đơn", error: error.message });
        }
    },

    async completePayment(req, res) {
        try {
            const { paymentId, paymentMethod } = req.body;
            const response = await PaymentService.completePayment(paymentId, paymentMethod);
            return res.status(200).json({ message: "Thanh toán thành công", response });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi thanh toán", error: error.message });
        }
    },

    async getPaymentHistory(req, res) {
        try {
            const userId = req.user?.sub;
            const payments = await PaymentService.getPaymentHistory(userId);
            return res.status(200).json({ payments });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy lịch sử thanh toán", error: error.message });
        }
    },

    async createPaymentUrl(req, res,) {
        try {
            const { amount, bankCode, orderDescription, orderType, language } = req.body;
            let locale = language;
            let orderInfo = orderDescription;
            var ipAddr =
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            let vnpUrl = vnp_Url;
            let returnUrl = `${process.env.CLIENT_URL}/booking-history`;

            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            var createDate = parseInt(`${year}${month}${day}${hours}${minutes}${seconds}`);
            var orderId = parseInt(`${hours}${minutes}${seconds}`);

            if (locale === null || locale === '') {
                locale = 'vn';
            }
            var currCode = 'VND';
            var vnp_Params = {};
            vnp_Params['vnp_Version'] = vnp_Version;
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = orderInfo;
            vnp_Params['vnp_OrderType'] = orderType;
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if (bankCode !== null && bankCode !== '') {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var hmac = crypto.createHmac('sha512', secretKey);
            var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

            res.status(200).json({
                status: true,
                message: 'Create URL checkout ok',
                redirectUrl: vnpUrl,
            });
        } catch (e) {
            writeLog(__filename, 'createPaymentUrl', e.message, 'FAILED');
            res.status(500).json({ status: false, message: e.message });
        }
    },

    async getCodeIpnUrl(req, res) {
        try {
            var vnp_Params = req.query;
            var secureHash = vnp_Params['vnp_SecureHash'];

            delete vnp_Params['vnp_SecureHash'];
            delete vnp_Params['vnp_SecureHashType'];

            vnp_Params = sortObject(vnp_Params);

            var signData = querystring.stringify(vnp_Params, { encode: false });
            var hmac = crypto.createHmac('sha512', secretKey);
            var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

            if (secureHash === signed) {
                var orderId = vnp_Params['vnp_TxnRef'];
                var rspCode = vnp_Params['vnp_ResponseCode'];
                //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
                res.status(200).json({ RspCode: '00', Message: 'success' });
            } else {
                res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
            }
        } catch (e) {
            writeLog(__filename, 'getCodeIpnUrl', e.message, 'FAILED');
            res.status(200).json({
                status: false,
                message: e.message,
            });
        }
    }
    ,
    async addBill(req, res) {
        try {
            const { contractId, electricity, water, internet, cleaning, totalAmount } = req.body;

            if (!contractId || !electricity || !water || !internet || !cleaning || !totalAmount) {
                return res.status(400).json({ status: 400, message: "Thiếu dữ liệu" });
            }
            if (electricity.startReading > electricity.endReading) {
                return res.status(400).json({ status: 400, message: "Số điện bắt đầu phải nhỏ hơn số điện kết thúc" });
            }
            if (water.startReading > water.endReading) {
                return res.status(400).json({ status: 400, message: "Số nước bắt đầu phải nhỏ hơn số nước kết thúc" });
            }
            if (internet < 0) {
                return res.status(400).json({ status: 400, message: "Tiền internet phải lớn hơn 0" });
            }
            if (cleaning < 0) {
                return res.status(400).json({ status: 400, message: "Tiền dọn dẹp phải lớn hơn 0" });
            }
            if (totalAmount < 0) {
                return res.status(400).json({ status: 400, message: "Tổng tiền phải lớn hơn 0" });
            }

            const contract = await ContractModel.findOne({ where: { id: contractId }, relations: { room: true } });
            if (!contract) {
                return res.status(400).json({ status: 400, message: "Hợp đồng không tồn tại" });
            }
            const roomId = contract.room.id
            const room = await RoomModel.findOne({ where: { id: roomId } });
            if (!room) {
                return res.status(400).json({ status: 400, message: "Phòng không tồn tại" });
            }

            const code = generateCode(contract);
            const checkCode = await BillModel.findOne({ where: { code: code } });
            if (checkCode) {
                return res.status(400).json({ status: 400, message: "Mã hóa đơn đã tồn tại, vui lòng thử lại" });
            }
            const bill = BillModel.create({
                contract: { id: contractId },
                room: { id: roomId },
                electricity: electricity,
                water: water,
                internet: internet,
                cleaning: cleaning,
                totalAmount: totalAmount,
                code: code,
            });
            await BillModel.save(bill);
            return res.status(200).json({ status: 200, message: "Thêm hóa đơn thành công", data: bill });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: 500, message: "Lỗi khi thêm hóa đơn", error: error.message });

        }
    },

    async getBillList(req, res) {
        try {
            const { page, limit, search } = req.query;
            const skip = (page - 1) * limit;

            const filterBill = search ? [
                { code: Like(`%${search}%`) },
            ] : {};

            const [bills, total] = await BillModel.findAndCount({
                where: filterBill,
                take: limit,
                skip: skip,
                order: { id: "DESC" },
                relations: { contract: true, room: true }
            });

            for (const bill of bills) {
                const user = await UserModel.findOne({ where: { id: bill.contract.userId } });
                delete user.password;
                bill.user = user;
            }

            const totalItems = total;
            const totalPages = Math.ceil(totalItems / limit);

            return res.status(200).json({
                status: 200, message: "Lấy danh sách hóa đơn thành công", data: {
                    bills,
                    totalItems,
                    totalPages,
                    page,
                    limit
                }
            });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "Lỗi khi lấy danh sách hóa đơn", error: error.message });
        }
    },
    async getBillById(req, res) {
        try {
            const { id } = req.params;
            const bill = await BillModel.findOne({ where: { id: id }, relations: { contract: true, room: true } });
            if (!bill) {
                return res.status(400).json({ status: 400, message: "Hóa đơn không tồn tại" });
            }
            const user = await UserModel.findOne({ where: { id: bill.contract.userId } });
            delete user.password;
            bill.student = user;
            return res.status(200).json({ status: 200, message: "Lấy hóa đơn thành công", data: bill });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "Lỗi khi lấy hóa đơn", error: error.message });
        }
    }

}

module.exports = { PaymentController }; 