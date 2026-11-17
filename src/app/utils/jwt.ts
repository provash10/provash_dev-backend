import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const createToken = (
	payload: JwtPayload,
	secret: string,
	expiresIn: string | number,
) => {
	return jwt.sign(payload, secret, {
		expiresIn: expiresIn as SignOptions["expiresIn"],
	});
};

const verifyToken = (token: string, secret: string) => {
	try {
		const verified = jwt.verify(token, secret);
		return {
			success: true,
			data: verified as JwtPayload,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Invalid or expired token",
		};
	}
};

export const jwtUtils = {
	createToken,
	verifyToken,
};

