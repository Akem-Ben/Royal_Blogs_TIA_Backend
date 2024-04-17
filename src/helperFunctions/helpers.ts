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
  return jwt.sign(data.data, `${process.env.APP_SECRET}`, {expiresIn: `${data.expires}`});
};

export const convertToDDMMYY = (isoDateString:any)=>{
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
  // 27-09-2025
}

export const convertToISODateString = (regularDateString: any): string | null => {
  const dateParts = regularDateString.split('/');

  if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];

      // Ensure the date is valid by constructing a Date object
      const date = new Date(`${year}-${month}-${day}`);

      // Check if the date is valid after parsing
      if (!isNaN(date.getTime())) {
          return date.toISOString().slice(0, 10);
      }
  }
  return null; // Return null for invalid or unrecognized input
};


export const passwordTest = (password:string)=>{
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?![\s!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,20}$/
    const passwordTest = passwordRegex.test(password)
    return passwordTest ? true : false
}

export const handleDeleteCloudinaryAPI = (imageLink:any)=> {
  imageLink = imageLink.split(".")
  imageLink.splice(-1)
return imageLink.join(".")
}