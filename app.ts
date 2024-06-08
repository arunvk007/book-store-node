import express from "express";
import dotenv from 'dotenv' //env configuration
import connectDB from "./config/db.js";
import cors, { CorsOptions } from 'cors'
import files from './config/files.js'
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import booksApi from "./api/booksApi.js";
import userApi from "./api/userApi.js";


dotenv.config()

const app = express()
const port = process.env.PORT || 8001;

connectDB()

const corsOptions: any = {
    origin: process.env.CLIENT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions))
  
app.get("/", (req, res) => {
      res.send("API IS RUNNING...")
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(files.uploads.root_directory));
app.use(express.static(files.assets.root_directory));

app.use("/api/v1/books", booksApi)
app.use("/api/v1/user", userApi)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
    next();
  });

  app.use(notFound)
  app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));