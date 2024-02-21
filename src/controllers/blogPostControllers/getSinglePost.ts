import {Request, Response} from 'express';
import BlogPost from '../../models/postModel/postModel';

export const getSinglePost = async(request:Request, response:Response) => {
    try{
        const {postId} = request.params

        const findPost = await BlogPost.findOne({where: {id:postId}})

        if(!findPost){
            return response.status(404).json({
                status: `error`,
                message: `Post not found`
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Post found successfully`,
            findPost
        })
    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}