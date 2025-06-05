const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        // user: 'scroll0509@gmail.com',
        // pass: 'bqolkurhokehdqia',
        user: 'roomtrack707@gmail.com',
        pass: 'qqcn mpkp doma maar',
    },
});

async function sendEmail(emailTo, subject, text, html = '') {
    try {
        const mailOptions = {
            from: 'RoomTrack <huong@gmail.com>',
            to: `${emailTo}`,
            subject: `${subject}`,
            text: `${text}`,
            html: html || undefined
        };
        let res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        console.log("SEND MAIL ERROR", error);
        return error;
    }
}

module.exports = {
    sendEmail,
};