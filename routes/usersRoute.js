import express from "express";
import { postUsers, loginUsers, getUsers, updateUser, deleteUser, getUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/",postUsers)

userRouter.post("/login",loginUsers)

userRouter.get("/", getUser)

userRouter.get("/all",getUsers)

userRouter.put("/:email", updateUser)

userRouter.delete("/:email", deleteUser)

export default userRouter;