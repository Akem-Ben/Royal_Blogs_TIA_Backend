import {Request, Response} from 'express';
import BlogPost from '../../models/postModel/postModel';

export const getAllPosts = async(request:Request, response:Response) => {
    try{

        const allPosts = await BlogPost.findAll({})

        if(!allPosts){
            return response.status(404).json({
                status: `error`,
                message: `Unable to get blogposts, contact admin`
            })
        }

        if(allPosts.length === 0){
            return response.status(200).json({
                status: `success`,
                message: `No Post found`,
                allPosts
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Post found successfully`,
            allPosts
        })
    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}