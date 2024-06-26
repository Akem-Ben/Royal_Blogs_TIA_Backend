import { Request, Response } from "express";
import {
  generateToken,
  hashPassword,
  passwordTest,
} from "../../helperFunctions/helpers";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import { sendMail } from "../../utilities/notification";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { fullName, userName, email, password, confirmPassword } =
      request.body;

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return response.status(400).json({
        status: `error`,
        message: `This email already exists, proceed to login`,
      });
    }

    if (!passwordTest(password)) {
      return response.status(400).json({
        status: `error`,
        message: `Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.`,
      });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({
        status: `error`,
        message: `password mismatch`,
      });
    }

    const newPassword = await hashPassword(password);

    const newUser = await User.create({
      id: v4(),
      profileImage: request?.file?.path,
      fullName,
      userName,
      email,
      password: newPassword,
      isVerified: false,
    });

    const findUser = (await User.findOne({
      where: { email },
    })) as unknown as UserAttributes;

    if (!findUser) {
      return response.status(400).json({
        status: `error`,
        message: `Unable to register user, contact admin`,
      });
    }

    const tokenData = {
      data: {
        id: findUser.id,
        email: findUser.email,
      },
      expires: "10min",
    };

    const token = generateToken(tokenData);

    await sendMail(email, token);

    return response.status(200).json({
      status: `success`,
      message: `User registered successfully, a mail has been sent to your email, click on the link in it to verify your account`,
      findUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
