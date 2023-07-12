import nodemailer from 'nodemailer';
// mail template
import contact from '@/app/hooks/emailTemplates/contact';

export default async function handler(req, res) {
    const { name, email, message } = req.body || {};

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "helphis.tech@gmail.com",
            subject: `Nuevo contacto de Pal Patio Export`,
            text: `${name} dejó un mensaje: \n\n${message}`,
            html: contact({ name, email, message })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error?.response?.data?.msg || error)
        return res.status(400).json({ msg: resError.message });
    }
}