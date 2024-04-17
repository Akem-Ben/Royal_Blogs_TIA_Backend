import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateToken = (data: any) => {
  return jwt.sign(data.data, `${process.env.APP_SECRET}`, { expiresIn: `${data.expires}` });
};

export const convertToDDMMYY = (isoDateString: any) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;

}

export const convertToISODateString = (regularDateString: any): string | null => {
  const dateParts = regularDateString.split('/');

  if (dateParts.length === 3) {
    const day = dateParts[0].padStart(2, '0');
    const month = dateParts[1].padStart(2, '0');
    const year = dateParts[2];

    const date = new Date(`${year}-${month}-${day}`);

    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
  }
  return null;
};


export const passwordTest = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?![\s!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,20}$/
  const passwordTest = passwordRegex.test(password)
  return passwordTest ? true : false
}

// export const handleDeleteCloudinaryAPIImageString = (imageLink:string) => {
//   const parts = imageLink.split("/");

//   const publicIdPart = parts.slice(-1)
//   const publicId = publicIdPart.join().split(".")[0]
//   return publicId;
// }

// export const getResourceTypeFromExtension = (imageUrl:string) => {
//   const extension = imageUrl.split('.').pop()?.toLowerCase();

//   switch (extension) {
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//     case 'gif':
//     case 'webp':
//     case 'avif':
//       return 'image';
//     case 'mp4':
//     case 'mov':
//     case 'wmv':
//       return 'video';
//     default:
//       return undefined;
//   }
// }