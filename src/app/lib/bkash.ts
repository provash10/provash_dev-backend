import httpStatus from "http-status";
import config from "../config";
import AppError from "../errors/AppError";
import { redisClient } from "./redis";

// get bkash id token with redis caching
export const getBkashIdToken = async () => {
	try {
		const idTokenKey = "bkash:idToken";
		const refreshTokenKey = "bkash:refreshToken";

		let bkashIdToken = await redisClient.get(idTokenKey);
		const bkashIdTokenTTL = await redisClient.ttl(idTokenKey);

		const bkashRefreshToken = await redisClient.get(refreshTokenKey);
		const bkashRefreshTokenTTL = await redisClient.ttl(refreshTokenKey);

		// console.log("bkash token ttl check")

		// refresh token if id token is about to expire or expired
		if (
			(bkashIdTokenTTL <= 600 || !bkashIdToken) &&
			bkashRefreshToken &&
			bkashRefreshTokenTTL > 600
		) {
			const refreshTokenResponse = await fetch(
				`${config.bkash_base_url}/tokenized/checkout/token/refresh`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						username: config.bkash_username,
						password: config.bkash_password,
					},
					body: JSON.stringify({
						app_key: config.bkash_app_key,
						app_secret: config.bkash_app_secret,
						refresh_token: bkashRefreshToken,
					}),
				},
			);

			if (!refreshTokenResponse.ok) {
				throw new AppError(
					httpStatus.INTERNAL_SERVER_ERROR,
					"Bkash Access Token Grant Failed",
				);
			}

			const bkashRefreshTokenResult = await refreshTokenResponse.json();
			bkashIdToken = bkashRefreshTokenResult.id_token as string;

			await redisClient.set(idTokenKey, bkashIdToken, {
				EX: 60 * 60,
			});

			return bkashIdToken;
		}

		if (bkashIdTokenTTL > 600 && bkashIdToken) {
			return bkashIdToken;
		}

		// grant new token from bkash sandbox api
		const response = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/token/grant`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					username: config.bkash_username,
					password: config.bkash_password,
				},
				body: JSON.stringify({
					app_key: config.bkash_app_key,
					app_secret: config.bkash_app_secret,
				}),
			},
		);

		if (!response.ok) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"Bkash Access Token Grant Failed",
			);
		}

		const result = await response.json();

		// set bkash id token in redis
		await redisClient.set(idTokenKey, result.id_token, {
			EX: 60 * 60,
		});

		// set bkash refresh token in redis
		await redisClient.set(refreshTokenKey, result.refresh_token, {
			EX: 60 * 60 * 24 * 28,
		});

		return result.id_token as string;
	} catch (error: any) {
		throw new AppError(
			httpStatus.INTERNAL_SERVER_ERROR,
			error.message || "Failed to retrieve bKash id token",
		);
	}
};
