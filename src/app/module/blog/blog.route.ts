import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { BlogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const router = Router();

// public blog routes
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getBlogBySlug);

// admin only blog management routes
router.post(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(BlogValidation.createBlogSchema),
	BlogController.createBlog,
);

router.patch(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(BlogValidation.updateBlogSchema),
	BlogController.updateBlog,
);

router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	BlogController.deleteBlog,
);

export const BlogRoutes = router;
