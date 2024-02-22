import {Request, Response} from 'express';
import User, { UserAttributes } from '../../models/userModel/userModel';
import Likes from '../../models/likesModel/likesModel';

export const getAllPostLikes = async(request:Request, response:Response)=>{
    try{

        const {postId} = request.params

        const allLikes = await Likes.findAll({where:{postId}})

        let likesWithOwners: any = await Promise.all(allLikes.map(async (likes: any) => {
            const user = await User.findOne({where: {id: likes.ownerId}}) as unknown as UserAttributes;
            if (user){
                return {
                    ownerName: user.fullName,
                    ownerUserName: user.userName,
                    likes
                }
            }else {
                console.error(`Owner not found for like with ID: ${likes.ownerId}`);
                return likes;
            }
        }))


        if(!allLikes){
            return response.status(404).json({
                status: `error`,
                message: `Unable to get likes`
            })
        }

        if(allLikes.length === 0){
            return response.status(200).json({
                status: `success`,
                message: `No likes found`,
                likesWithOwners
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Likes found successfully`,
            likesWithOwners
        })


    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}