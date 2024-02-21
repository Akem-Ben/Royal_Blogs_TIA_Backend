import {Request, Response} from 'express';
import User from '../../models/userModel/userModel';
import jwt from 'jsonwebtoken';


export const verifyUser = async(request:Request, response:Response)=>{
    try{
        const {token} = request.params

        if(!token){
            return response.status(400).json({
                status: `error`,
                message: `Resend verification link`
            })
        }

        const decode:any = jwt.verify(token, `${process.env.APP_SECRET}`);
        const user:any = await User.findOne({where: {id:decode.id}})
    
        if(!user){
          return response.status(400).json({
            status: `error`,
            message: `User does not exist, Contact the admin`
          })
        }

        if(user.isVerified){
            return response.status(400).json({
                status: `success`,
                message: `Account already verified`
            })
        }
        const updateUser = await User.update({isVerified: true}, {where: {id: user.id}})

        if(updateUser[0]==1){

        console.log(updateUser)

        const newUser = await User.findOne({where: {id:decode.id}})

        return response.status(200).json({
            status: `success`,
            message: `Account successfully verified`,
            newUser
        })
    }

    return response.status(200).json({
        status: `error`,
        message: `Verification not successful`
    })
    
    }catch (error: any) {
        return response.status(500).json({
          status: `error`,
          message: `Internal Server Error`,
          error: error.message
        });
    }

}