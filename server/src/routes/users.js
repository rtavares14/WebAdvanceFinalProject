import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import * as userController from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/cards",isLoggedIn,userController.getWonByID);

userRouter.post("",userController.createUser);

export default userRouter;