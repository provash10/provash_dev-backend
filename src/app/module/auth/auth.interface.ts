export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		avatar?: string | null;
	};
}
