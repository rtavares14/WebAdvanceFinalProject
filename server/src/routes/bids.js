import express from "express";
import * as bidsController from "../controllers/bidController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const bidRouter = express.Router();

bidRouter.post("/:cardID", isLoggedIn ,bidsController.createNewCardBid);

export default bidRouter;