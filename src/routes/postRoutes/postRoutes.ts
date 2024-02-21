import express from "express";
import { authorizationFunction } from "../../middlewares/authorization";
import { userMakesPost } from "../../controllers/blogPostControllers/userMakesPost";
import { upload } from "../../utilities/upload";
import { getSinglePost } from "../../controllers/blogPostControllers/getSinglePost";
import { deletePost } from "../../controllers/blogPostControllers/deletePost";
import { getAllPosts } from "../../controllers/blogPostControllers/getAllPosts";
import { userLikesPost } from "../../controllers/likesControllers/userLikesPost";
import { userDisLikesPost } from "../../controllers/dislikesControllers/userDislikes";
import { userMakesComments } from "../../controllers/commentsControllers/userMakesComments";
import { getAllPostComments } from "../../controllers/commentsControllers/getAllPostComments";


const router = express.Router();

router.post("/create", authorizationFunction, upload.single("postImage"), userMakesPost);
router.get('/singlePost/:postId', getSinglePost)
router.delete('/userPost/:postId', authorizationFunction, deletePost)
router.get('/allPosts', getAllPosts)
router.post('/likePost/:postId', authorizationFunction, userLikesPost)
router.post('/dislikePost/:postId', authorizationFunction, userDisLikesPost)
router.post('/makeComment/:postId', authorizationFunction, userMakesComments)
router.get('/allComments', getAllPostComments)





export default router;