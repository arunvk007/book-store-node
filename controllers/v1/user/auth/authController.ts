import { validationResult } from "express-validator";
import HttpError from "../../../../utils/HttpError";
import { NextFunction, Response, Request } from "express";
import {LoginParams, RegisterParams} from "../../../../types/mainTypes";
import User from "../../../../models/user";
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                first_name,
                last_name,
                gender,
                email,
                password,
                date_of_birth,
                phone_number
            }: RegisterParams = req.body;
            
            // Create a new user document instance
            const newUser = new User({
                first_name,
                last_name,
                gender,
                email,
                password,
                date_of_birth,
                phone_number
            });

            const existingUser = await User.findOne({ email })
            
            if (existingUser) {
                return next(new HttpError("User already exist!", 400));
            } else {

            // Save the new user document to the database
            await newUser.save();

            // Check if the save operation was successful
            if (! newUser) {
                return next(new HttpError("Invalid credentials!", 400));
            } else {
                res.status(200).json({
                    status: true,
                    message: 'User created successfully',
                    data: null,
                    access_token: null
                });
            }
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors)
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                email,
                password
            }: LoginParams = req.body;
            
            
            const existingUser = await User.findOne({ email, password})

            if (! existingUser) {
                return next(new HttpError("Invalid credentials, No user exist!", 500));
            } else {

                const token = jwt.sign({ user_id : existingUser._id, email: existingUser.email }, process.env.JWT_SECRET!,
                    { expiresIn: process.env.JWT_TOKEN_EXPIRY }
                  );
                const userData = {
                    first_name: existingUser.first_name,
                    last_name: existingUser.last_name,
                    gender: existingUser.gender,
                    email: existingUser.email,
                    role: existingUser.role
                }
                
                res.status(200).json({
                    status: true,
                    message: '',
                    data: userData,
                    access_token: token
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};