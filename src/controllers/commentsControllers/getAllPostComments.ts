import {Request, Response} from 'express';
import { CommentAttributes, Comments } from '../../models/commentModel/commentModel';
import User, { UserAttributes } from '../../models/userModel/userModel';

export const getAllPostComments = async(request:Request, response:Response)=>{
    try{

        const {postId} = request.params

        const allComments = await Comments.findAll({where:{postId}})

        let commentsWithOwners: any = await Promise.all(allComments.map(async (comments: any) => {
            const user = await User.findOne({where: {id: comments.ownerId}}) as unknown as UserAttributes;
            if (user){
                return {
                    ownerName: user.fullName,
                    ownerImage: user.profileImage,
                    comment: comments.commentText
                }
            }else {
                console.error(`Owner not found for post with ID: ${comments.ownerId}`);
                return comments;
            }
        }))


        if(!allComments){
            return response.status(404).json({
                status: `error`,
                message: `Unable to get comments, contact admin`
            })
        }

        if(allComments.length === 0){
            return response.status(200).json({
                status: `success`,
                message: `No Comments found`,
                commentsWithOwners
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Comments found successfully`,
            commentsWithOwners
        })


    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}