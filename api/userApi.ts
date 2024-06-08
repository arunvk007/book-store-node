import express from "express";
import userRoutes from "../routes/v1/user/userRoutes";

const userApi = express()

userApi.use('/', userRoutes)

export default userApi;