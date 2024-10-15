import { data } from "../dummyData/dummyData.js";
import * as helper from "../utils/controllersHelper.js";
import StatusCodes from "http-status-codes";

let bidsIDFake = 6;

export function createNewCardBid(req, res) {
    const cardID = Number(req.params.cardID);
    const userID = Number(req.user.userId);
    const bidAmount = Number(req.body.bidAmount);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Card not found" });
    }

    const validationResult = helper.validateBid(bidAmount, card, userID);

    if (!validationResult.isValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: validationResult.message });
    }

    const bid = {
        bidID: bidsIDFake,
        userID,
        bidAmount,
        bidDate: new Date(),
    };

    card.bids.push(bid);

    res.status(StatusCodes.CREATED).json({ message: "Bid created successfully.", bid });
    console.log("Bid created successfully.");
}