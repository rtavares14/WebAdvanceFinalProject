import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import * as cardController from "../controllers/cardController.js";

const cardRouter = express.Router()

cardRouter.get("/popular", cardController.getPopularCards);
cardRouter.get("/",isLoggedIn, cardController.getRequestedCards);
cardRouter.get("/:cardID",isLoggedIn,cardController.getCardByID);
cardRouter.get("/:cardID/bids",isLoggedIn,cardController.getAllBidsFromCard);
cardRouter.get("/:cardID/bids/:bidID",isLoggedIn,cardController.getBidIDFromCard);

cardRouter.post("/",isLoggedIn,isAdmin,cardController.createNewCard);

cardRouter.patch("/:cardID",isLoggedIn,isAdmin,cardController.updateCard)

cardRouter.delete("/:cardID",isLoggedIn,isAdmin,cardController.deleteCard);

export default cardRouter;