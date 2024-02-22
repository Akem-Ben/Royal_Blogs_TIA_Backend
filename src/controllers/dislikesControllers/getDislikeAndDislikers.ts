import {Request, Response} from 'express';
import User, { UserAttributes } from '../../models/userModel/userModel';
import Dislikes from '../../models/dislikesModel/dislikesModel';

export const getAllPostDislikes = async(request:Request, response:Response)=>{
    try{

        console.log(request.params)
        const {postId} = request.params

        const allDislikes = await Dislikes.findAll({where:{postId}})

        let dislikesWithOwners: any = await Promise.all(allDislikes.map(async (dislikes: any) => {
            const user = await User.findOne({where: {id: dislikes.ownerId}}) as unknown as UserAttributes;
            if (user){
                return {
                    ownerName: user.fullName,
                    ownerUserName: user.userName,
                    dislikes
                }
            }else {
                console.error(`Owner not found for dislike with ID: ${dislikes.ownerId}`);
                return dislikes;
            }
        }))


        if(!allDislikes){
            return response.status(404).json({
                status: `error`,
                message: `Unable to get dislikes`
            })
        }

        if(allDislikes.length === 0){
            return response.status(200).json({
                status: `success`,
                message: `No dislikes found`,
                dislikesWithOwners
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `dislikes found successfully`,
            dislikesWithOwners
        })


    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}