import multer from "multer";

// in-memory storage for handling files before cloudinary upload
const storage = multer.memoryStorage();

export const upload = multer({
	storage,
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
});
