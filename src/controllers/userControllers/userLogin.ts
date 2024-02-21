import { Request, Response } from "express";
import User, { UserAttributes } from "../../models/userModel/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../../helperFunctions/helpers";

export const userLogin = async (request: Request, response: Response) => {
  try {
    const { loginKey, password } = request.body;

    let user: any;

    const checkUserName = (await User.findOne({
      where: { userName: loginKey },
    })) as unknown as UserAttributes;

    const checkEmail = (await User.findOne({
      where: { email: loginKey },
    })) as unknown as UserAttributes;

    if (checkEmail) user = checkEmail;
    if (checkUserName) user = checkUserName;

    if (!checkUserName && !checkEmail) {
      return response.status(404).json({
        status: `error`,
        message: `${loginKey} not found`,
      });
    }

    if (!user.isVerified) {
      return response.status(401).json({
        status: `error`,
        message: `Account not verified yet, only verified users can login`,
      });
    }

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      return response.status(400).json({
        status: `error`,
        message: `Invalid Password`,
      });
    }

    const tokenData = {
      data: {
        id: user.id,
        email: user.email,
      },
      expires: "10h",
    };

    const token = generateToken(tokenData);

    const firstName = user.fullName.split(" ")[0]

    return response.status(200).json({
        message: `Welcome back ${firstName}`,
        token,
        user,
      });

  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
