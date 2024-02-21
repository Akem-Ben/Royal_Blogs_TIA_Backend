import express from "express";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { upload } from "../../utilities/upload";
import { verifyUser } from "../../controllers/userControllers/verifyUser";
import { userLogin } from "../../controllers/userControllers/userLogin";


const router = express.Router();

router.post("/signup", upload.single("profileImage"), registerUser);
router.post("/verify/:token", verifyUser);
router.post('/login', userLogin)

export default router;