import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import * as cardController from "../controllers/cardController.js";

const cardRouter = express.Router()

cardRouter.get("/", cardController.getRequestedCards);
cardRouter.get("/:cardID",cardController.getCardByID);
cardRouter.get("/:cardID/bids",cardController.getAllBidsFromCard);
cardRouter.get("/:cardID/bids/:bidID",cardController.getBidIDFromCard);

cardRouter.post("/:cardID/bids",cardController.createNewCardBid);
cardRouter.post("/",cardController.createNewCard);

cardRouter.patch("/:cardID",cardController.updateCard)

cardRouter.delete("/:cardID",cardController.deleteCard);

export default cardRouter;