const { Not, IsNull } = require("typeorm");
const { RoomModel, UserModel, DeviceModel, BillModel } = require("../models/db");
const AdminService = require("../services/admin.service");

const AdminCtroller = {
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
            const token = await AdminService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập thành công', data: token });
        } catch (e) {
            console.error(e.message);
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: e.message });
        }
    },

    async logout(req, res) {
        try {
            const token = req.headers.authorization;
            // const response = await AdminService.logout(token);
            const response = {
                success: true,
            }
            res.status(200).send({ status: 200, message: 'Đăng xuất thành công', data: response });
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
            let bills = await BillModel.find({ order: { createdAt: 'DESC' }, relations: ['room'] });


            let billMostElectricAndWater = []
            bills.forEach(bill => {
                result.totalPriceElectric += bill.electricity.amount;
                result.totalPriceWater += bill.water.amount;
                if (bill.status === 'paid') {
                    result.totalPaid += bill.totalAmount;
                } else {
                    result.totalUnpaid += bill.totalAmount;
                }

                // get bill most electric and water
                billMostElectricAndWater.push({
                    ...bill,
                    totalWaterAndElectric: bill.water.amount + bill.electricity.amount
                })
            });

            billMostElectricAndWater.sort((a, b) => b.totalWaterAndElectric - a.totalWaterAndElectric);

            result.rooms = await RoomModel.find({ order: { createdAt: 'DESC' } });
            result.bills = billMostElectricAndWater

            res.status(200).send({ status: 200, message: 'Lấy dữ liệu thành công', data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}



module.exports = { AdminCtroller }; 