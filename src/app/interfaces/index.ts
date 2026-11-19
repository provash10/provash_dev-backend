export type TMeta = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

export type TResponseData<T> = {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	meta?: TMeta;
};

export interface IRequestUser {
	userId: string;
	email: string;
	name: string;
	role: "SUPER_ADMIN" | "ADMIN" | "PROJECT_MANAGER" | "CLIENT";
}

