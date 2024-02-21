import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import BlogPost, { BlogPostAttributes } from '../../models/postModel/postModel';
import Likes from '../../models/likesModel/likesModel';
import Dislikes from '../../models/dislikesModel/dislikesModel';
import {v4} from 'uuid'

export const userLikesPost = async (request: JwtPayload, response: Response) => {
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

        const checkIfLiked = await Likes.findOne({where: {postId, ownerId:userId}})

        if(checkIfLiked){

          const unLike = await Likes.destroy({where: {postId, ownerId:userId}})

          let numberOfLikes:number = findPost.likes

          const newNumberOfLikes = numberOfLikes - 1

          const updatePostLikes = await BlogPost.update({likes: newNumberOfLikes}, {where: {id:postId}})

          const findNewPost = await BlogPost.findOne({where: {id:postId}}) as unknown as BlogPostAttributes

          return response.status(201).json({
            status: `success`,
            message: 'post unliked',
            findNewPost
          })
        }

        const checkIfDisliked = await Dislikes.findOne({where: {postId, ownerId:userId}})

        if(checkIfDisliked){

          const destroyDislike = await Dislikes.destroy({where: {postId, ownerId:userId}});

          let numberOfDisLikes:number = findPost.dislikes

          const newNumberOfDisLikes = numberOfDisLikes - 1

          const updatePostDisLikes = await BlogPost.update({dislikes: newNumberOfDisLikes}, {where: {id:postId}})

        }


        const newLike = await Likes.create({
          id: v4(),
          postId,
          ownerId: userId
        })

        if(newLike){
          let blogLikes = findPost.likes

          const newLikes = blogLikes + 1

          await BlogPost.update({likes: newLikes}, {where: {id:postId}})

          const newPost = await BlogPost.findOne({where: {id:postId}})

          
          return response.status(200).json({
            status: `success`,
            message: `post successfully liked`,
            newPost
          })
        }

   


        } catch (error: any) {
       return response.status(500).json({
         status: `error`,
         message: `Internal Server Error`,
         error: error.message,
       });
     }
}