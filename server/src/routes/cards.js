import express from "express";
import * as cardController from "../controllers/userController.js";

const cardRouter = express.Router()

cardRouter.get("/",cardController.getAllCards);
cardRouter.get("/:cardID",cardController.getCardByID);
cardRouter.get("/:cardID/bids",cardController.getBidsFromCard);
cardRouter.get("/:cardID/bids/:bidID",cardController.getBidIDFromCard);

cardRouter.post("/:cardID/bids",cardController.createNewCardBid);
cardRouter.post("/",cardController.createNewCard);

cardRouter.post("/:cardID",cardController.updateCard)

cardRouter.delete("/:cardID",cardController.deleteCard);

export default cardRouter();