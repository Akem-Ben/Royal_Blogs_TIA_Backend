import express from "express";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { upload } from "../../utilities/upload";
import { verifyUser } from "../../controllers/userControllers/verifyUser";


const router = express.Router();

router.post("/signup", upload.single("profileImage"), registerUser);
router.post("/verify/:token", verifyUser);

export default router;