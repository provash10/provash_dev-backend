import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

// login route
router.post(
	"/login",
	validateRequest(AuthValidation.loginSchema),
	AuthController.login,
);

// google oauth login route
router.post(
	"/google-login",
	AuthController.googleLogin,
);

// register route
router.post(
	"/register",
	validateRequest(AuthValidation.registerSchema),
	AuthController.register,
);

// refresh token route
router.post(
	"/refresh-token",
	AuthController.refreshToken,
);

// logout route
router.post(
	"/logout",
	AuthController.logout,
);

// get current user profile route
router.get(
	"/me",
	checkAuth("SUPER_ADMIN", "ADMIN", "CLIENT"),
	AuthController.getMe,
);

export const AuthRoutes = router;
