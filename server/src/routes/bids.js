import express from "express";
import * as bidsController from "../controllers/userController.js";

const bidRouter = express.Router()

bidRouter.patch("/:bidID",bidsController.updateBid);

bidRouter.delete("/:bidID",bidsController.deleteBid);

export default bidRouter();