import { validationResult } from "express-validator";
import HttpError from "../../../utils/HttpError";
import { NextFunction, Request, Response } from "express";
import { BookAddParam, BookEditParam, BookRemoveParam, BooksListParam } from "../../../types/mainTypes";
import Book from "../../../models/book";
import getFilePath from "../../../utils/multer/getFilePath";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                rating,
                price,
                query
            }: BooksListParam = req.body;
            const searchQuery: any = {}
            if (rating) {
                searchQuery.star_rating = rating
            }
            if (price) {
                searchQuery.price  = { $lte: price }
            }
            if (query) {
                
                const searchValue = query.toLowerCase()

                searchQuery.$or = [
                    { name: { $regex: searchValue, $options: 'i' } },
                    { author: { $regex: searchValue, $options: 'i' } },
                ];
            
            }
            const books = await Book.find(searchQuery)

            if (! books) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: '',
                    data: books,
                    access_token: null
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};
export const popular = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            
            const books = await Book.find({}).sort({ star_rating: -1 }).limit(6)

            if (! books) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: '',
                    data: books,
                    access_token: null
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const view = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                book_id
            }: { book_id:  string } = req.body;
            
            
            const bookData = await Book.findOne({ _id: book_id })

            if (! bookData) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: '',
                    data: bookData,
                    access_token: null
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                name,
                author,
                genre,
                star_rating,
                published,
                price,
                language,
            }: BookAddParam = req.body;
            const image = req.file ? getFilePath(req.file.path) : null

            if (! image) {
                return next(new HttpError("Upload cover image!", 500));
            }
            
            const newBook = new Book({
                name,
                author,
                genre,
                star_rating,
                published,
                price,
                language,
                image
            })
            const newBookData = await newBook.save()

            if (! newBookData) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: 'new book added',
                    data: '',
                    access_token: null
                });
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                book_id
            }: BookEditParam = req.body;

            const updateQuery: Partial<BookEditParam> & { [key: string]: any } = {}; // Partial to allow optional fields

            // Iterate over the keys of req.body
            for (const key in req.body) {
                // Check if the field exists and is not book_id
                if (req.body.hasOwnProperty(key) && key !== 'book_id') {
                    // Add the field to the updateQuery object
                    updateQuery[key] = req.body[key];
                }
            }
            const image = req.file ? getFilePath(req.file.path) : null

            if (image) {
                updateQuery.image = image;
            }
            const bookData = await Book.findOneAndUpdate({ _id: book_id },  updateQuery, {new: true})
         

            if (! bookData) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: 'book edited',
                    data: '',
                    access_token: null
                });
            }
        }
    } catch (error) {
        console.error(error)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
        } else {
            const {
                book_id
            }: BookRemoveParam = req.body;

            const removedBook = await Book.deleteOne({ _id: book_id })

            if (! removedBook) {
                return next(new HttpError("Invalid credentials!", 500));
            } else {
                res.status(200).json({
                    status: true,
                    message: 'book deleted',
                    data: '',
                    access_token: null
                });
            }
        }
    } catch (error) {
        console.error(error)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};