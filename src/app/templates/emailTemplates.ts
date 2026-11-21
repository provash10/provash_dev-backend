// email template generator for provash digital agency

// generate admin inquiry notification email html
export const generateAdminInquiryEmail = (inquiry: {
	name: string;
	email: string;
	phone?: string | null;
	budget?: string | null;
	message: string;
	createdAt?: Date;
}) => {
	const createdTime = inquiry.createdAt
		? new Date(inquiry.createdAt).toLocaleString()
		: new Date().toLocaleString();

	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>New Client Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #070f21; color: #ffffff; padding: 24px; margin: 0;">
	<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #091733; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; overflow: hidden;">
		<tr>
			<td style="padding: 24px; background: linear-gradient(135deg, #091836, #0d2247); border-bottom: 1px solid rgba(6, 182, 212, 0.3);">
				<h2 style="margin: 0; color: #38bdf8; font-size: 20px;">New Consultation Request Received</h2>
				<p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">Provash Agency Platform Lead Alert</p>
			</td>
		</tr>
		<tr>
			<td style="padding: 24px;">
				<table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; color: #e2e8f0;">
					<tr>
						<td width="30%" style="color: #38bdf8; font-weight: bold;">Client Name:</td>
						<td>${inquiry.name}</td>
					</tr>
					<tr>
						<td style="color: #38bdf8; font-weight: bold;">Email:</td>
						<td><a href="mailto:${inquiry.email}" style="color: #38bdf8; text-decoration: none;">${inquiry.email}</a></td>
					</tr>
					<tr>
						<td style="color: #38bdf8; font-weight: bold;">Phone:</td>
						<td>${inquiry.phone || "Not provided"}</td>
					</tr>
					<tr>
						<td style="color: #38bdf8; font-weight: bold;">Target Budget:</td>
						<td style="color: #34d399; font-weight: bold;">${inquiry.budget || "Custom / Open"}</td>
					</tr>
					<tr>
						<td style="color: #38bdf8; font-weight: bold;">Received Time:</td>
						<td style="color: #94a3b8;">${createdTime}</td>
					</tr>
				</table>

				<div style="margin-top: 16px; padding: 16px; background-color: #040814; border-radius: 12px; border: 1px solid #1e293b;">
					<p style="margin: 0 0 8px 0; color: #38bdf8; font-size: 12px; font-weight: bold;">Project Scope & Objectives:</p>
					<p style="margin: 0; font-size: 13px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${inquiry.message}</p>
				</div>

				<div style="margin-top: 24px; text-align: center;">
					<a href="http://localhost:3000/dashboard" style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #06b6d4, #2563eb); color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 13px; font-weight: bold;">
						Review in Executive Console
					</a>
				</div>
			</td>
		</tr>
		<tr>
			<td style="padding: 16px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
				Provash Digital Agency & Software Lab • Dhaka, Bangladesh
			</td>
		</tr>
	</table>
</body>
</html>
	`.trim();
};

// generate client welcome and confirmation email html
export const generateClientWelcomeEmail = (
	clientName: string,
	projectScope?: string,
) => {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Consultation Received</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #070f21; color: #ffffff; padding: 24px; margin: 0;">
	<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #091733; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; overflow: hidden;">
		<tr>
			<td style="padding: 24px; background: linear-gradient(135deg, #091836, #0d2247); border-bottom: 1px solid rgba(6, 182, 212, 0.3); text-align: center;">
				<h1 style="margin: 0; color: #38bdf8; font-size: 22px;">Thank You for Reaching Out!</h1>
				<p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Provash Digital Agency & Engineering Team</p>
			</td>
		</tr>
		<tr>
			<td style="padding: 24px; font-size: 13px; line-height: 1.6; color: #e2e8f0;">
				<p style="margin: 0 0 16px 0;">Hello <strong>${clientName}</strong>,</p>
				<p style="margin: 0 0 16px 0;">
					We have successfully received your project inquiry. Our technical lead and engineering team are reviewing your project scope.
				</p>
				<div style="padding: 16px; background-color: #040814; border-radius: 12px; border-left: 4px solid #38bdf8; margin-bottom: 16px;">
					<p style="margin: 0; font-weight: bold; color: #38bdf8; font-size: 12px;">What Happens Next?</p>
					<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #cbd5e1; font-size: 12px;">
						<li>Technical review of product scope and architecture.</li>
						<li>Detailed sprint estimate and milestone roadmap preparation.</li>
						<li>Direct follow up within twelve hours via email or WhatsApp.</li>
					</ul>
				</div>
				<p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 12px;">
					You can track live sprint updates anytime through your personal client portal:
				</p>
				<div style="text-align: center; margin-bottom: 20px;">
					<a href="http://localhost:3000/dashboard/user" style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #06b6d4, #2563eb); color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 13px; font-weight: bold;">
						Access Client Portal
					</a>
				</div>
				<p style="margin: 0; font-size: 12px; color: #64748b;">
					If you have urgent questions, connect with us directly on WhatsApp at <strong style="color: #38bdf8;">+880 1710-490345</strong>.
				</p>
			</td>
		</tr>
		<tr>
			<td style="padding: 16px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
				Provash Digital Agency • Custom Software, YouTube Automation & SMM Solutions
			</td>
		</tr>
	</table>
</body>
</html>
	`.trim();
};
