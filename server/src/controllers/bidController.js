import {data} from "../dummyData/dummyData.js";
import * as helper from "../utils/controllersHelper.js";
export function createNewCardBid(req, res) {
    const cardID = Number(req.params.cardID);
    const userID = Number(req.user.userId);
    const bidAmount = Number(req.body.bidAmount);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        console.log(cardID);
        return res.status(404).json({ error: "Card not found" });
    }

    const validationResult = helper.validateBid(bidAmount, card, userID);

    if (!validationResult.isValid) {
        return res.status(400).json({ message: validationResult.message });
    }

    const bid = {
        bidID: card.bids.length + 1,
        userID,
        bidAmount,
        bidDate: new Date(),
    };

    card.bids.push(bid);

    res.status(201).json({ message: "Bid created successfully.", bid });
    console.log("Bid created successfully.");
}