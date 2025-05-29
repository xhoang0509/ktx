const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roomtrack707@gmail.com',
        pass: 'ybex shru aeth qxiq',
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
        return error;
    }
}

module.exports = {
    sendEmail,
};