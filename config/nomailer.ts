import { env } from "@/env";
import nodemailer from "nodemailer";

const adminEmail = env.ADMIN_EMAIL
const adminEmailPass = env.ADMIN_EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: adminEmail,
        pass:adminEmailPass,
    },
});

export const mailOptions = {
    from: adminEmail,    
};
