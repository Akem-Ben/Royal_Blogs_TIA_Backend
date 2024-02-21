import express from "express";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { upload } from "../../utilities/upload";
import { verifyUser } from "../../controllers/userControllers/verifyUser";
import { userLogin } from "../../controllers/userControllers/userLogin";
import { viewProfile } from "../../controllers/userControllers/viewUserProfile";
import { authorizationFunction } from "../../middlewares/authorization";


const router = express.Router();

router.post("/signup", upload.single("profileImage"), registerUser);
router.post("/verify/:token", verifyUser);
router.post('/login', userLogin)
router.get('/profile', authorizationFunction, viewProfile)





export default router;