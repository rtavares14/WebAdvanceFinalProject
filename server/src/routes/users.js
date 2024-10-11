import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import * as userController from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/",isLoggedIn,isAdmin,userController.getAllUsers);
userRouter.get("/cards",isLoggedIn,userController.getWonByID);

userRouter.post("/tokens",userController.loginUser);
userRouter.post("/",userController.createUser);

userRouter.delete("/:userID",isLoggedIn,isAdmin,userController.deleteUser);

export default userRouter;