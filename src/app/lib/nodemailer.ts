import nodemailer from "nodemailer";
import config from "../config";

// nodemailer gmail smtp transporter
export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.smtp_user,
		pass: config.smtp_password,
	},
});

// send email utility function
export const sendEmail = async ({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) => {
	// console.log("sending email via nodemailer transporter")
	return await transporter.sendMail({
		from: `"${config.super_admin_name}" <${config.email_sender}>`,
		to,
		subject,
		html,
	});
};
