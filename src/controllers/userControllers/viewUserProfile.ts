import {Request, Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../models/userModel/userModel';

export const viewProfile = async(request:JwtPayload, response:Response)=>{
    try{
        const userId = request.user.id

        const user = await User.findOne({where: {id:userId}})

        if(!user){
            return response.status(404).json({
                status: `error`,
                message: `User not found`
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Profile found successfully`,
            user
        })
    }catch(error: any){
        return response.status(500).json({
            status: `error`,
            message: `Inernal Server Error`,
            error: error.message
        })
    }
}