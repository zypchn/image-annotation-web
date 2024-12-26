const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const db = require("../models");

const sendOTP = async (email, userID) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        await db.userotp.create({
            UserId: userID,
            otp: hashedOTP,
            expiresAt: Date.now() + 3600000*4
        });
        
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASS
            }
        });
        
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Verify Your Email",
            html: `<p> Enter <b>${otp}</b> in the app to verify your email address.</p>
                    <p> This code <b>expires in 1 hour</b>. </p>`
        });
        
        console.log("email sent successfully!");
    } catch (error) { console.log(error.message) }
};

module.exports = sendOTP;