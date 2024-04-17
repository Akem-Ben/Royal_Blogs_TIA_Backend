import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";
import BlogPost, { BlogPostAttributes } from "../../models/postModel/postModel";
import { Comments } from "../../models/commentModel/commentModel";
import Dislikes from "../../models/dislikesModel/dislikesModel";
import Likes from "../../models/likesModel/likesModel";

export const deletePost = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;

    const user = await User.findOne({ where: { id: userId } });

    const { postId } = request.params;

    const findPost = (await BlogPost.findOne({
      where: { id: postId, ownerId: userId },
    })) as unknown as BlogPostAttributes;

    if (!findPost) {
      return response.status(400).json({
        status: `error`,
        message: `You are not authorised to delete this post`,
      });
    }

    const deleted = await BlogPost.destroy({
      where: { id: findPost.id, ownerId: userId },
    });
    const checkDeletedPost = await BlogPost.findOne({
      where: { id: postId, ownerId: userId },
    });

    if (!deleted && checkDeletedPost) {
      return response.status(400).json({
        status: `error`,
        message: `Unable to delete post, contact admin`,
      });
    }

    await Comments.destroy({ where: { postId } });
    await Dislikes.destroy({ where: { postId } });
    await Likes.destroy({ where: { postId } });

    const allPosts = await BlogPost.findAll({});

    return response.status(200).json({
      status: `success`,
      message: `Post deleted successfully`,
      deletedPost: checkDeletedPost,
      allPosts,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
