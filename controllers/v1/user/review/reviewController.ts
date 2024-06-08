import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpError from "../../../../utils/HttpError";
import { ReviewAddParam } from "../../../../types/mainTypes";
import Review from "../../../../models/review";

export const listReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            
            const reviews = await Review.find({}).sort({ rating: -1 }).limit(6)
                                        .populate({
                                            path: 'user',
                                            select: 'first_name last_name gender'
                                        }).populate({
                                            path: 'book',
                                            select: 'name author image'
                                        })

            if (! reviews) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: '',
                    data: reviews,
                    access_token: null
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                user,
                book,
                rating,
                message
            }: ReviewAddParam = req.body;
            
            // Create a new user document instance
            const newReview = new Review({
                user,
                book,
                rating,
                message
            });

            // Save the new user document to the database
            await newReview.save();

            // Check if the save operation was successful
            if (! newReview) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: 'New review added',
                    data: null,
                    access_token: null
                });
            }
        }
    } catch (error) {
        console.error(error)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};
