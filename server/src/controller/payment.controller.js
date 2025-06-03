const crypto = require('crypto');
const querystring = require('qs');
const { UserModel, BillModel, RoomModel, BillUserModel } = require('../models/db');
const { Like } = require('typeorm');
const { generateCode } = require('../utils/random');
const { error } = require('../logger');
const sortObject = require('../utils/sortObject');
const { vnp_Version, vnp_Url, vnp_TmnCode, vnp_HashSecret } = process.env;

const secretKey = vnp_HashSecret;

const PaymentController = {
    // Sinh viên
    async getStudentPayments(req, res) {
        try {
            const userId = req.user?.sub;

            const bills = await BillUserModel.find({
                where: {
                    user: {
                        id: userId,
                    }
                },
                order: {
                    id: "DESC"
                },
                relations: ["bill", "bill.room", "user"],
            });

            const user = await UserModel.findOne({
                where: {
                    id: userId,
                }
            });
            delete user.password;

            return res.status(200).json({
                status: 200,
                message: "Lấy danh sách hóa đơn thành công",
                data: { bills, user }
            });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "Lỗi khi lấy danh sách hóa đơn", error: error.message });
        }
    },

    async createPaymentUrl(req, res,) {
        try {
            let { amount, bankCode, orderDescription, orderType, language } = req.body;

            if (amount < 0) {
                return res.status(400).json({ status: 400, message: "Số tiền phải lớn hơn 0" });
            }

            amount = Math.round(amount);

            let locale = language;
            let orderInfo = JSON.stringify(orderDescription);
            var ipAddr = "1.55.210.67" ||
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress || '1.1.1.1'

            let vnpUrl = vnp_Url;
            let returnUrl = `${process.env.SERVER_URL}/api/v1/payment/ipn-url`;

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
            if (bankCode) {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var hmac = crypto.createHmac('sha512', secretKey);
            var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

            res.status(200).json({
                status: true,
                message: 'Create URL checkout ok',
                data: { vnpUrl },
            });
        } catch (e) {
            error(__filename, e.message);
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
            var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

            if (secureHash === signed) {
                const orderId = vnp_Params['vnp_TxnRef'];
                const rspCode = vnp_Params['vnp_ResponseCode'];
                let orderInfo = vnp_Params['vnp_OrderInfo'];
                orderInfo = decodeURIComponent(orderInfo);
                orderInfo = JSON.parse(orderInfo);
                const { billCode, userId } = orderInfo;
                // thanh toán thành công
                if (rspCode === '00') {
                    const billUser = await BillUserModel.findOne({
                        where: {
                            bill: { code: billCode },
                            user: { id: userId }
                        },
                        relations: ['bill', 'user']
                    });

                    if (!billUser) {
                        return res.status(200).json({ RspCode: '97', Message: 'Bill user not found' });
                    }

                    await BillUserModel.update({ id: billUser.id }, { status: 'paid' });
                } else {
                    console.log(`Giao dịch thất bại: ${orderId} - ${rspCode} - ${orderInfo}`)
                }
                return res.redirect(`${process.env.CLIENT_URL}/payment`);
            } else {
                error(__filename, 'Fail checksum');
                res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
            }
        } catch (e) {
            error(__filename, e.message);
            res.status(200).json({
                status: false,
                message: e.message,
            });
        }
    },

    async addBill(req, res) {
        try {
            const { roomId, electricity, water, internet, cleaning, totalAmount } = req.body;

            if (!roomId || !electricity || !water || !internet || !cleaning || !totalAmount) {
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

            const room = await RoomModel.findOne({ where: { id: roomId } });
            if (!room) {
                return res.status(400).json({ status: 400, message: "Phòng không tồn tại" });
            }

            const usersInRoom = await UserModel.find({
                where: { room: { id: roomId }, status: 'active' }
            });

            if (usersInRoom.length === 0) {
                return res.status(400).json({ status: 400, message: "Phòng này chưa có sinh viên nào" });
            }

            const code = generateCode(room);
            const checkCode = await BillModel.findOne({ where: { code: code } });
            if (checkCode) {
                return res.status(400).json({ status: 400, message: `Phòng ${room.name} đã có hóa đơn tháng này. Vui lòng chọn phòng khác!` });
            }

            const bill = BillModel.create({
                room: { id: roomId },
                electricity: electricity,
                water: water,
                internet: internet,
                cleaning: cleaning,
                totalAmount: totalAmount,
                code: code,
            });
            await BillModel.save(bill);

            const amountPerUser = Math.round(totalAmount / usersInRoom.length);

            for (const user of usersInRoom) {
                const billUser = BillUserModel.create({
                    bill: { id: bill.id },
                    user: { id: user.id },
                    amount: amountPerUser,
                    status: 'pending'
                });
                await BillUserModel.save(billUser);
            }

            return res.status(200).json({
                status: 200,
                message: "Thêm hóa đơn thành công",
                data: {
                    bill,
                    totalUsers: usersInRoom.length,
                    amountPerUser
                }
            });
        } catch (error) {
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
                relations: { room: true, billUsers: { user: true } }
            });

            for (const bill of bills) {
                const room = await RoomModel.findOne({ where: { id: bill.room.id } });

                if (room) {
                    bill.room = room;
                }

                if (bill.billUsers) {
                    for (const billUser of bill.billUsers) {
                        if (billUser.user && billUser.user.password) {
                            delete billUser.user.password;
                        }
                    }

                }
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
            const bill = await BillModel.findOne({
                where: { id: id },
                relations: { room: true, billUsers: { user: true } }
            });
            if (!bill) {
                return res.status(400).json({ status: 400, message: "Hóa đơn không tồn tại" });
            }

            const room = await RoomModel.findOne({ where: { id: bill.room.id } });
            if (room) {
                bill.room = room;
            }

            if (bill.billUsers) {
                for (const billUser of bill.billUsers) {
                    if (billUser.user && billUser.user.password) {
                        delete billUser.user.password;
                    }
                }
            }

            return res.status(200).json({ status: 200, message: "Lấy hóa đơn thành công", data: bill });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "Lỗi khi lấy hóa đơn", error: error.message });
        }
    },

    async editBill(req, res) {
        try {
            const { id } = req.params;
            const { electricity, water, internet, cleaning, totalAmount } = req.body;

            const bill = await BillModel.findOne({
                where: { id: id },
                relations: { billUsers: true }
            });
            if (!bill) {
                return res.status(400).json({ status: 400, message: "Hóa đơn không tồn tại" });
            }

            await BillModel.update({ id: id }, {
                electricity: electricity,
                water: water,
                internet: internet,
                cleaning: cleaning,
                totalAmount: totalAmount
            });

            if (bill.billUsers && bill.billUsers.length > 0) {
                const newAmountPerUser = Math.round(totalAmount / bill.billUsers.length);

                for (const billUser of bill.billUsers) {
                    await BillUserModel.update({ id: billUser.id }, { amount: newAmountPerUser });
                }
            }

            return res.status(200).json({
                status: 200,
                message: "Sửa hóa đơn thành công",
                data: {
                    ...bill,
                    electricity,
                    water,
                    internet,
                    cleaning,
                    totalAmount
                }
            });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "Lỗi khi sửa hóa đơn", error: error.message });
        }
    },


}

module.exports = { PaymentController }; 