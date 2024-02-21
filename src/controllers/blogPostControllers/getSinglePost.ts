import {Request, Response} from 'express';
import BlogPost, { BlogPostAttributes } from '../../models/postModel/postModel';
import User from '../../models/userModel/userModel';

export const getSinglePost = async(request:Request, response:Response) => {
    try{
        const {postId} = request.params

        const findPost = await BlogPost.findOne({where: {id:postId}}) as unknown as BlogPostAttributes

        if(!findPost){
            return response.status(404).json({
                status: `error`,
                message: `Post not found`
            })
        }

        const postOwner = await User.findOne({where: {id:findPost.ownerId}})

        return response.status(200).json({
            status: `success`,
            message: `Post found successfully`,
            findPost,
            postOwner
        })
    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}