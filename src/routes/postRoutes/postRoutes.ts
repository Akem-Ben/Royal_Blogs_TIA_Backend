import express from "express";
import { authorizationFunction } from "../../middlewares/authorization";
import { userMakesPost } from "../../controllers/blogPostControllers/userMakesPost";
import { upload } from "../../utilities/upload";
import { getSinglePost } from "../../controllers/blogPostControllers/getSinglePost";
import { deletePost } from "../../controllers/blogPostControllers/deletePost";
import { getAllPosts } from "../../controllers/blogPostControllers/getAllPosts";


const router = express.Router();

router.post("/create", authorizationFunction, upload.single("postImage"), userMakesPost);
router.get('/singlePost/:postId', getSinglePost)
router.delete('/userPost/:postId', authorizationFunction, deletePost)
router.get('/allPosts', getAllPosts)




export default router;