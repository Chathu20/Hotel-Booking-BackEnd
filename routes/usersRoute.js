import express from "express";
import { postUsers, loginUsers, getUser, changeUserType, delelteUserByEmail, getAllUsers , disableUser , verifyUserEmail} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/",postUsers)

userRouter.post("/login",loginUsers)

userRouter.get("/",getUser)

userRouter.post("/all",getAllUsers)

userRouter.put("/change-type/:userId",changeUserType)

userRouter.put("/disable/:userId",disableUser)

userRouter.delete("/admin-delete/:email",delelteUserByEmail)

userRouter.post("/verify-email", verifyUserEmail)

export default userRouter;