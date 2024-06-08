import express from "express";
import bookRoutes from "../routes/v1/books/bookRoutes";


const booksApi = express()

booksApi.use('/', bookRoutes)

export default booksApi;