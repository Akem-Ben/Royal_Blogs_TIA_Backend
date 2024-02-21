import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {v4} from 'uuid';
import { CommentAttributes, Comments } from '../../models/commentModel/commentModel';
import User, { UserAttributes } from '../../models/userModel/userModel';

export const userMakesComments = async(request:JwtPayload, response:Response)=>{
    try{
        const {commentText} = request.body;

        const userId = request.user.id

        const user = await User.findOne({where: {id:userId}}) as unknown as UserAttributes

        const {postId} = request.params

        const findPost = await postId.findOne({where: {id:postId}})

        if(!findPost){
            return response.status(404).json({
                status: `error`,
                message: `Post not found, contact the admin`,
            })
        }

        const newComment = await Comments.create({
            commentId: v4(),
            postId,
            userName: user.userName,
            commentText,
            likes: 0,
            dislikes: 0,
            ownerId: userId
        }) as unknown as CommentAttributes

        const findComment = await Comments.findOne({where: {commentId:newComment.commentId}})

        if(!findComment){
            return response.status(400).json({
                status: `error`,
                message: `Unable to make comment, please try again`
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Comment successfully made`,
            findComment
        })
    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}