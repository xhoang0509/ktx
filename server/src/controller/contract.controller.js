const { Like } = require("typeorm");
const { ContractModel, RoomModel, UserModel, BillModel } = require("../models/db");
const ContractService = require("../services/contract.service");
const { generateCode } = require("../utils/random");
const fs = require("fs");
const path = require("path");
const { sendEmail } = require("../services/email.service");
const { formatVND } = require("../utils/format");
const { isValidDate } = require("../utils/checkdate");

const ContractController = {
    async create(req, res) {
        try {
            const userId = req.user?.sub;

            const response = await ContractService.create(userId, req.body);
            await new Promise(resolve => setTimeout(resolve, 2000));
            res.status(200).send({ status: 200, message: 'Tạo hợp đồng thành công', data: response });
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 500, message: error.message || 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    },

    async list(req, res) {
        try {
            const userId = req.user?.sub;
            const query = req.query;
            const contracts = await ContractService.list(userId, query);
            return res.status(200).json({ status: 200, message: "Lấy danh sách hợp đồng thành công", data: contracts });
        } catch (error) {
            return res.status(400).json({ status: 200, message: error.message });
        }
    },


    async listAdmin(req, res) {
        try {
            const { page = 1, limit = 10, search, status } = req.query;
            const skip = (page - 1) * limit;
            const filter = search ? [
                { user: { full_name: Like(`%${search}%`) } },
            ] : {};

            if (status) {
                filter.status = status;
            }

            const contracts = await ContractModel.find({
                where: filter,
                relations: {
                    user: true,
                    room: true
                },
                take: limit,
                skip: skip,
                order: {
                    createdAt: "DESC"
                }
            });
            return res.status(200).json({ status: 200, message: "Lấy danh sách hợp đồng thành công", data: contracts });
        } catch (error) {
            return res.status(400).json({ status: 200, message: error.message });
        }
    },



    async view(req, res) {
        try {
            const userId = req.user?.sub;
            const contract = await ContractService.view(userId, req.body);
            return res.status(200).json({ message: "Xem hợp đồng thành công", contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async adminGetContractDetail(req, res) {
        try {
            const { id: contractId } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: contractId },
                relations: {
                    user: true,
                    room: true
                }
            });
            if (contract.user) {
                contract.student = contract.user;
            }
            return res.status(200).json({ status: 200, message: "Xem hợp đồng thành công", data: contract });
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    },

    async cancel(req, res) {
        try {
            const userId = req.user?.sub;
            const { id: contractId } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: contractId, user: { id: userId } },
            });

            if (!contract) {
                throw new Error("Hợp đồng không tồn tại");
            }

            await ContractModel.update({
                id: contractId
            }, { status: "cancelled" });

            const room = await RoomModel.findOne({
                where: { id: contract.room_id },
                relations: ["users"]
            });

            const newContract = await ContractModel.findOne({
                where: { id: contractId, user: { id: userId } },
            });

            return res.status(200).json({ status: 200, message: "Hủy hợp đồng thành công", data: newContract });
        } catch (error) {
            return res.status(400).json({ status: 500, message: error.message });
        }
    },

    async approveContract(req, res) {
        try {
            const { id } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: id },
                relations: ["room", "user"],
            });

            if (!contract) {
                return res.status(400).json({ message: "Hợp đồng không tồn tại" });
            }

            if (contract.status !== "pending") {
                throw new Error("Hợp đồng đã được xử lý trước đó");
            }

            if (contract.room.current_capacity === contract.room.max_capacity) {
                return res.status(500).json({ status: 500, message: "Phòng đã đầy" });
            }

            contract.status = "active";
            await RoomModel.update({ id: contract.room.id }, { current_capacity: contract.room.current_capacity + 1 });
            await ContractModel.save(contract);

            await UserModel.update({ id: contract.user.id }, { room: { id: contract.room.id } });

            const templatePath = path.join(__dirname, "../templates/contract-approve.html");
            let emailTemplate = fs.readFileSync(templatePath, "utf8");

            emailTemplate = emailTemplate.replace(/\${contract\.id}/g, contract.id)
                .replace(/\${contract\.user\.full_name}/g, contract.user.full_name)
                .replace(/\${contract\.user\.email}/g, contract.user.email)
                .replace(/\${contract\.user\.phone}/g, contract.user.phone)
                .replace(/\${contract\.user\.student_id}/g, contract.user.student_id)
                .replace(/\${contract\.user\.faculty_name}/g, contract.user.faculty_name)
                .replace(/\${contract\.user\.class_code}/g, contract.user.class_code)
                .replace(/\${contract\.room\.name}/g, contract.room.name)
                .replace(/\${contract\.start_date}/g, contract.start_date)
                .replace(/\${contract\.end_date}/g, contract.end_date)
                .replace(/\${contract\.duration}/g, contract.duration)
                .replace(/\${contract\.room\.base_price}/g, formatVND(contract.room.base_price))
                .replace(/\${contract\.room\.building}/g, contract.room.building)
                .replace(/\${contract\.room\.floor}/g, contract.room.floor)

            sendEmail(
                contract.user.email,
                "Thông báo hợp đồng đã được duyệt",
                "",
                emailTemplate
            );
            await new Promise(resolve => setTimeout(resolve, 1500));
            return res.status(200).json({ status: 200, message: "Cập nhật hợp đồng thành công", data: contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async rejectContract(req, res) {
        try {
            const { id } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: id },
                relations: ["room", "user"],
            });

            if (!contract) {
                return res.status(400).json({ message: "Hợp đồng không tồn tại" });
            }

            if (contract.status !== "pending") {
                throw new Error("Hợp đồng đã được xử lý trước đó");
            }

            if (contract.room.current_capacity < 0) {
                throw new Error("Không thể từ chối hợp đồng khi phòng đã hết chỗ");
            }

            contract.status = "cancelled";

            await ContractModel.save(contract);
            await RoomModel.save(contract.room);
            await UserModel.update({ id: contract.user.id }, {
                room: {
                    id: null
                }
            });

            const templatePath = path.join(__dirname, "../templates/contract-rejection.html");
            let emailTemplate = fs.readFileSync(templatePath, "utf8");

            emailTemplate = emailTemplate.replace(/\${contract\.id}/g, contract.id)
                .replace(/\${contract\.user\.full_name}/g, contract.user.full_name)
                .replace(/\${contract\.user\.email}/g, contract.user.email)
                .replace(/\${contract\.user\.phone}/g, contract.user.phone)
                .replace(/\${contract\.user\.student_id}/g, contract.user.student_id)
                .replace(/\${contract\.user\.faculty_name}/g, contract.user.faculty_name)
                .replace(/\${contract\.user\.class_code}/g, contract.user.class_code)
                .replace(/\${contract\.room\.name}/g, contract.room.name)
                .replace(/\${contract\.start_date}/g, contract.start_date)
                .replace(/\${contract\.end_date}/g, contract.end_date)
                .replace(/\${contract\.duration}/g, contract.duration)
                .replace(/\${contract\.room\.base_price}/g, formatVND(contract.room.base_price))
                .replace(/\${contract\.room\.building}/g, contract.room.building)
                .replace(/\${contract\.room\.floor}/g, contract.room.floor)

            sendEmail(
                contract.user.email,
                "Thông báo từ chối hợp đồng",
                "",
                emailTemplate
            );
            await new Promise(resolve => setTimeout(resolve, 2000));
            return res.status(200).json({ status: 200, message: "Cập nhật hợp đồng thành công", });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async terminateContract(req, res) {
        try {
            const { id } = req.params;
            const contract = await ContractModel.findOne({
                where: { id: id },
                relations: ["room", "user"],
            });

            if (!contract) {
                return res.status(400).json({ message: "Hợp đồng không tồn tại" });
            }

            if (contract.status !== "active") {
                throw new Error("Hợp đồng không đang hoạt động");
            }

            const code = generateCode(contract);
            const checkCode = await BillModel.findOne({ where: { code: code } });

            if (!checkCode) {
                return res.status(400).json({ message: `Hợp đồng ${contract.id} chưa có hóa đơn tháng này. Vui lòng thêm hóa đơn trước khi chấm dứt hợp đồng!` });
            }

            if (checkCode.status !== "paid") {
                return res.status(400).json({ message: `Hóa đơn ${checkCode.id} chưa được thanh toán. Vui lòng thanh toán hóa đơn trước khi chấm dứt hợp đồng!` });
            }

            contract.status = "terminated";
            if (contract.room.current_capacity < 0) {
                return res.status(400).json({ message: `Lỗi hệ thống` })
            }

            await ContractModel.save(contract);
            await RoomModel.update({ id: contract.room.id }, { current_capacity: contract.room.current_capacity - 1 });
            await UserModel.update({ id: contract.user.id }, {
                room: {
                    id: null
                }
            });
            return res.status(200).json({ status: 200, message: "Cập nhật hợp đồng thành công", });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getPendingContracts(req, res) {
        try {
            const contracts = await ContractService.getPendingContracts();
            return res.status(200).json({ contracts });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async adminEditContract(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const contract = await ContractModel.findOne({ where: { id } });
            if (!contract) {
                return res.status(400).json({ message: "Hợp đồng không tồn tại" });
            }

            if (!body.start_date || !body.end_date) {
                return res.status(400).json({ message: "Ngày bắt đầu và ngày kết thúc không được để trống" });
            }


            if (!isValidDate(new Date(body.start_date)) || !isValidDate(new Date(body.end_date))) {
                return res.status(400).json({ message: "Ngày bắt đầu và ngày kết thúc không hợp lệ" });
            }

            if (new Date(body.start_date) > new Date(body.end_date)) {
                return res.status(400).json({ message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc" });
            }

            const updateData = {
                start_date: body.start_date,
                end_date: body.end_date,
                duration: body.duration,
                room_id: body.room_id,
                user_id: body.user_id
            }
            await ContractModel.update({ id }, updateData);
            return res.status(200).json({ status: 200, message: "Cập nhật hợp đồng thành công", data: contract });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = ContractController 