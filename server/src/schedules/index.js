const schedule = require('node-schedule');
const { ContractModel } = require('../models/db');
const { sendEmail } = require('../services/email.service');
const fs = require('fs');
const path = require('path');
const GLOBAL_CONFIG = require('../config/global.config');

const Schedule = {
    initial: async () => {
        try {
            schedule.scheduleJob('0 0 * * *', checkContractExpired);
            if (GLOBAL_CONFIG.IS_CONTRACT_EXPIRED) {
                checkContractExpired()
            }
        } catch (error) {
            console.error('Schedule Error: ', error);
        }
    },
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
};

const checkContractExpired = async () => {
    try {
        const contracts = await ContractModel.find({
            where: {
                status: 'active'
            },
            relations: {
                user: true,
                room: true
            },
        })

        for (const contract of contracts) {
            const { start_date, end_date } = contract;
            const currentDate = new Date();
            const expiredDate = new Date(end_date);

            const dateDiff = expiredDate.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

            if (GLOBAL_CONFIG.IS_CONTRACT_EXPIRED || daysDiff <= 5 && daysDiff > 0) {
                try {
                    const templatePath = path.join(__dirname, "../templates/remid-contract-expired.html");
                    let emailTemplate = fs.readFileSync(templatePath, "utf8");

                    emailTemplate = emailTemplate
                        .replace(/{{contract_id}}/g, contract.id)
                        .replace(/{{user_name}}/g, contract.user.full_name)
                        .replace(/{{student_id}}/g, contract.user.student_id)
                        .replace(/{{room_name}}/g, contract.room.name)
                        .replace(/{{building}}/g, contract.room.building)
                        .replace(/{{floor}}/g, contract.room.floor)
                        .replace(/{{room_type}}/g, contract.room.type)
                        .replace(/{{start_date}}/g, formatDate(contract.start_date))
                        .replace(/{{end_date}}/g, formatDate(contract.end_date))
                        .replace(/{{duration}}/g, contract.duration)
                        .replace(/{{base_price}}/g, formatVND(contract.room.base_price))
                        .replace(/{{days_remaining}}/g, daysDiff)
                        .replace(/{{website_url}}/g, 'http://localhost:3001/room-registration');

                    await sendEmail(
                        contract.user.email,
                        `⚠️ Hợp đồng sắp hết hạn - Còn ${daysDiff} ngày`,
                        `Xin chào ${contract.user.full_name}, hợp đồng thuê phòng của bạn sẽ hết hạn trong ${daysDiff} ngày. Vui lòng truy cập website để đăng ký hợp đồng mới.`,
                        emailTemplate
                    );

                    console.log(`✅ Đã gửi email nhắc nhở cho ${contract.user.full_name} (${contract.user.email}) - Còn ${daysDiff} ngày`);
                } catch (emailError) {
                    console.error(`❌ Lỗi gửi email cho hợp đồng #${contract.id}:`, emailError.message);
                }
            } else if (daysDiff <= 0) {
                await ContractModel.update({ id: contract.id }, { status: 'expired' });
                console.log(`⏰ Hợp đồng #${contract.id} đã hết hạn và được cập nhật status thành 'expired'`);
            }
        }
    } catch (error) {
        console.error('❌ Lỗi kiểm tra hợp đồng hết hạn:', error);
    }
}

module.exports = Schedule

