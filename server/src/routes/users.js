import express from "express";
import * as userController from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/",userController.getAllUsers);
userRouter.get("/:userID",userController.getUserByID);
userRouter.get("/:userID/bids",userController.getAllBidsFromUser);
userRouter.get("/:userID/bids/:bidID",userController.getBidIDFromUser);

userRouter.post("/login",userController.loginUser);
userRouter.post("/",userController.createUser);

userRouter.patch("/:userID",userController.updateUser);

userRouter.delete("/:userID",userController.deleteUser);

export default userRouter();