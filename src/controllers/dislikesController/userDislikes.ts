import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import BlogPost, { BlogPostAttributes } from '../../models/postModel/postModel';
import Likes from '../../models/likesModel/likesModel';
import Dislikes, { DislikesAttributes } from '../../models/dislikesModel/dislikesModel';
import {v4} from 'uuid'

export const userDisLikesPost = async (request: JwtPayload, response: Response) => {
    try {

        const userId = request.user.id;

        const {postId} = request.params;

        const findPost = await BlogPost.findOne({where: {id:postId}}) as unknown as BlogPostAttributes

        if(!findPost){
          return response.status(404).json({
            status: `error`,
            message: `post not found`
          })
        }

        const checkIfDisLiked = await Dislikes.findOne({where: {postId, ownerId:userId}})

        if(checkIfDisLiked){

          const unDisLike = await Dislikes.destroy({where: {postId, ownerId:userId}})

          let numberOfDisLikes:number = findPost.dislikes

          const newNumberOfDisLikes = numberOfDisLikes - 1

          const updatePostLikes = await BlogPost.update({dislikes: newNumberOfDisLikes}, {where: {id:postId}})

          const findNewPost = await BlogPost.findOne({where: {id:postId}}) as unknown as BlogPostAttributes

          const testDislike = await Dislikes.findOne({where: {postId, ownerId:userId}})

          return response.status(201).json({
            status: `success`,
            message: 'post undisliked',
            findNewPost,
            testDislike
          })
        }

        const checkIfLiked = await Likes.findOne({where: {postId, ownerId:userId}})

        if(checkIfLiked){

          const destroyLike = await Likes.destroy({where: {postId, ownerId:userId}});

          let numberOfLikes:number = findPost.likes

          const newNumberOfLikes = numberOfLikes - 1

          const updatePostLikes = await BlogPost.update({likes: newNumberOfLikes}, {where: {id:postId}})
        }


        const newDisLike = await Dislikes.create({
          id: v4(),
          postId,
          ownerId: userId
        }) as unknown as DislikesAttributes

        if(newDisLike){
          let blogDisLikes = findPost.dislikes

          const newDisLikes = blogDisLikes + 1

          await BlogPost.update({dislikes: newDisLikes}, {where: {id:postId}})

          const newPost = await BlogPost.findOne({where: {id:postId}})

          const findDisLike = await Dislikes.findOne({where: {id:newDisLike.id}})

          return response.status(200).json({
            status: `success`,
            message: `post successfully disliked`,
            newPost,
            findDisLike
          })
        }

        return response.status(400).json({
          status: `error`,
          message: `post not successfully liked`,
        })


        } catch (error: any) {
       return response.status(500).json({
         status: `error`,
         message: `Internal Server Error`,
         error: error.message,
       });
     }
}