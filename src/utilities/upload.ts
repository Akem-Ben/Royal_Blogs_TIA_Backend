import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import {Request, Response} from 'express';

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async(req, file)=>{
        return {
            folder: "Tia_Blog"
        }
    }
})


export const upload = multer({
    storage: storage,
    fileFilter: (req:Request, file, cb)=>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/webp" ||
            file.mimetype == "image/avif"
        ){
            cb(null, true);
        }else{
            cb(null, false)
            return cb(new Error("only .png, .jpg, .jpeg, .webp format allowed"))
        }
    }
})
// export const imageDeletion = async(public_id:string, resource_type?:string)=> {
//     try{
//         const data = await cloudinary.uploader.destroy(public_id, { resource_type });
//         return data
//     }catch(error:any){
//         console.log(error.message)
//     }
// }