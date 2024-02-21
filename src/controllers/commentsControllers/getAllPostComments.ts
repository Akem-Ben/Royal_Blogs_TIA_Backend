import {Request, Response} from 'express';
import { Comments } from '../../models/commentModel/commentModel';

export const getAllPostComments = async(request:Request, response:Response)=>{
    try{
        const allComments = await Comments.findAll({})


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
                allComments
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Comments found successfully`,
            allComments
        })


    }catch(error:any){
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        })
    }
}