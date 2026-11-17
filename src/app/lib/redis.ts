import { createClient } from "redis";
import config from "../config";

// redis client connection setup
export const redisClient = createClient({
	username: config.redis_user,
	password: config.redis_password,
	socket: {
		host: config.redis_host,
		port: config.redis_port,
	},
});

redisClient.on("error", (_err) => {
	// console.log("redis client error", _err)
});
