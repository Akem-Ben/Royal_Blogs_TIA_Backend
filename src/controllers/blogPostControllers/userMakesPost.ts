import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../models/userModel/userModel';
import BlogPost, { BlogPostAttributes } from '../../models/postModel/postModel';
import {v4} from 'uuid';


export const userMakesPost = async(request:JwtPayload, response:Response)=>{
    try{
        const userId = request.user.id

        console.log('userId', userId)

        if(!userId){
            return response.status(400).json({
                status: `error`,
                message: `you must be logged in`
            })
        }

        const user = await User.findOne({where: {id:userId}})

        if(!user){
            return response.status(404).json({
                status: `error`,
                message: `User not found, contact admin`
            })
        }

        const {postText, title} = request.body;

        const newPost = await BlogPost.create({
            id: v4(),
            ownerId: userId,
            postText,
            title,
            likes: 0,
            dislikes: 0,
            postImage: request.file.path
        }) as unknown as BlogPostAttributes

        const findPost = await BlogPost.findOne({where: {id:newPost.id}})

        if(!findPost){
            return response.status(400).json({
                status: `error`,
                message: `Post not created`,
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Post successfully created`,
            findPost
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}