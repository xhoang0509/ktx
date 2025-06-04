const { Not, IsNull } = require("typeorm");
const { RoomModel, UserModel, DeviceModel, BillModel, AdminModel } = require("../models/db");
const AdminService = require("../services/admin.service");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const AdminController = {
    async create(req, res) {
        try {
            const admin = await AdminService.create(req.body);
            res.status(200).send({ status: 200, message: 'Tạo tài khoản thành công', data: admin });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const loginDto = req.body;

            const admin = await AdminModel.findOne({
                where: { username: loginDto.username }
            });
            if (!admin || !(await argon2.verify(admin.password, loginDto.password))) {
                return res.status(400).send({ status: 400, message: 'Tài khoản hoặc mật khẩu không đúng' });
            }

            const payload = {
                username: admin.username,
                id: admin.id,
                role: 'admin'
            };
            if (!process.env.ADMIN_SECRET_KEY) {
                return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: 'ADMIN_SECRET_KEY is not defined' });
            }
            const token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY, { expiresIn: '1h' });

            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async logout(req, res) {
        try {
            const response = {
                success: true,
            }
            res.status(200).send({ status: 200, message: 'Đăng xuất thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async getInfo(req, res) {
        try {
            const adminId = req.admin.id;
            const admin = await AdminModel.findOne({ where: { id: adminId } });
            const result = {
                id: admin.id,
                username: admin.username,
                role: 'admin'
            }
            res.status(200).send({ status: 200, message: 'Lấy thông tin thành công', data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async getAnalytic(req, res) {
        try {

            const result = {
                totalRoom: 0,
                totalUser: 0,
                totalUserInRoom: 0,
                totalDevice: 0,
                totalPriceElectric: 0,
                totalPriceWater: 0,
                totalPaid: 0,
                totalUnpaid: 0,
                rooms: []
            }

            result.totalRoom = await RoomModel.count();
            result.totalUser = await UserModel.count();
            result.totalUserInRoom = await UserModel.count({
                where: {
                    room: Not(IsNull())
                }
            });

            result.totalDevice = await DeviceModel.count();
            let bills = await BillModel.find({ order: { createdAt: 'DESC' }, relations: ['room', 'billUsers'] });


            let billMostElectricAndWater = []
            let totalAmount = 0
            bills.forEach(bill => {
                result.totalPriceElectric += parseInt(bill.electricity.amount);
                result.totalPriceWater += parseInt(bill.water.amount);

                bill.billUsers.forEach(billUser => {
                    if (billUser.status === 'paid') {
                        result.totalPaid += parseInt(billUser.amount);
                    }
                })
                totalAmount += parseInt(bill.totalAmount)

                // get bill most electric and water
                billMostElectricAndWater.push({
                    ...bill,
                    totalWaterAndElectric: parseInt(bill.water.amount) + parseInt(bill.electricity.amount)
                })
            });

            result.totalUnpaid = totalAmount - result.totalPaid

            billMostElectricAndWater.sort((a, b) => b.totalWaterAndElectric - a.totalWaterAndElectric);

            result.rooms = await RoomModel.find({ order: { createdAt: 'DESC' } });
            result.bills = billMostElectricAndWater

            res.status(200).send({ status: 200, message: 'Lấy dữ liệu thành công', data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}


module.exports = AdminController