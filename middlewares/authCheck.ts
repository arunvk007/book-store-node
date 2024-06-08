import jwt, { JwtPayload } from "jsonwebtoken";
import HttpError from "../utils/HttpError";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { UserData } from "../types/mainTypes";

interface RequestWithUserData extends Request {
    userData?: UserData;
   }

const authCheck = async (req: RequestWithUserData, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization!.split(" ")[1];
    if (! token) {
    //   throw new Error("Authentication Failed!", 403);
        return next(new HttpError("Authentication Failed", 403))
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findOne({ _id: decodedToken.user_id, email: decodedToken.email })

    if (! user) {
      return next(new HttpError("Invalid credentials", 400))
    } else {
      req.userData = { userId : decodedToken.user_id } as UserData;

      next();
    }
  } catch (err) {
    return next(new HttpError("Authentication failed", 403));
  }
};

export default authCheck;
