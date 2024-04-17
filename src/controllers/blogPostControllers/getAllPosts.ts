import { Request, Response } from "express";
import BlogPost, { BlogPostAttributes } from "../../models/postModel/postModel";
import User, { UserAttributes } from "../../models/userModel/userModel";
import {
  CommentAttributes,
  Comments,
} from "../../models/commentModel/commentModel";

export const getAllPosts = async (request: Request, response: Response) => {
  try {
    const allPosts = (await BlogPost.findAll(
      {}
    )) as unknown as BlogPostAttributes[];

    let postsWithOwners: BlogPostAttributes[] = await Promise.all(
      allPosts.map(async (post: BlogPostAttributes) => {
        const owner = (await User.findOne({
          where: { id: post.ownerId },
        })) as unknown as UserAttributes;
        const comments = (await Comments.findAll({
          where: { postId: post.id },
        })) as unknown as CommentAttributes[];
        if (owner) {
          const response: any = {
            ...post,
            ownerName: owner.fullName,
            ownerImage: owner.profileImage,
          };
          response.comments = comments;
          return response;
        } else {
          console.error(`Owner not found for post with ID: ${post.id}`);
          return post;
        }
      })
    );

    if (!allPosts) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to get blogposts, contact admin`,
      });
    }

    if (allPosts.length === 0) {
      return response.status(200).json({
        status: `success`,
        message: `No Post found`,
        allPosts,
      });
    }

    postsWithOwners = postsWithOwners.sort(
      (a: any, b: any) =>
        new Date(b.dataValues.createdAt).getTime() -
        new Date(a.dataValues.createdAt).getTime()
    );
    return response.status(200).json({
      status: `success`,
      message: `Post found successfully`,
      postsWithOwners,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
