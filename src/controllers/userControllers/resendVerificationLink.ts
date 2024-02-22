import {Request, Response} from 'express';
import User, { UserAttributes } from '../../models/userModel/userModel';
import { generateToken } from '../../helperFunctions/helpers';
import { sendMail } from '../../utilities/notification';

export const resendUserVerification = async(request:Request, response:Response) => {
    try{
        const {loginKey} = request.body

        let user:any;

        const findUserByEmail = await User.findOne({where: {email:loginKey}}) as unknown as UserAttributes

        if(findUserByEmail) user = findUserByEmail

        const findUserByUserName = await User.findOne({where: {userName:loginKey}}) as unknown as UserAttributes


        if(findUserByUserName) user = findUserByUserName

        if(!findUserByEmail && ! findUserByUserName){
            return response.status(401).json({
                status: `error`,
                message: `User does not exist, please check username/email or register`
            })
        }

        const tokenData = {
            data: {
              id: user.id,
            email: user.email
            },
            expires: '10min'
          }
      
          const token = generateToken(tokenData)
          
          await sendMail(user.email, token)

          return response.status(200).json({
            status: `success`,
            message: `Verification successfully sent, please check your email`
          })

    }catch(error:any){
        return response.status(500).json({
        status: `error`,
        message: `Internal Server Error`,
        error: error.message,
      })
}
}