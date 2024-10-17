import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import * as userController from "../controllers/userController.js"
import {getWonByUserID} from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.get("/me/cards",isLoggedIn,userController.getWonByUserID);

userRouter.post("",userController.createUser);

export default userRouter;