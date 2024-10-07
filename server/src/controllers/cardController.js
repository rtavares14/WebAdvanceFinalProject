import {data} from "../dummyData/dummyData.js" ;
import Fuse from "fuse.js";

export function deleteCard(req, res) {
    const cardID = req.params.cardID;

    const card = data.cards.find(card => card.id === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    data.cards = data.cards.filter(card => card.id !== cardID);
    res.status(200).json({ message: "Card deleted successfully." });
}

export function updateCard(req, res) {

}


export function createNewCard(req, res) {
    const card = {
        ...req.body,
        cardID: data.cards.length + 1,
        bids: []
    };

    data.cards.push(card);
    res.status(201).json(card);
}


export function createNewCardBid(req, res) {


}


export function getBidIDFromCard(req, res) {
    const cardID = req.params.cardID;
    const bidID = req.params.bidID;

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    const bid = card.bids.find((bid, index) => index + 1 === bidID);

    if (!bid) {
        return res.status(404).json({ error: "Bid not found" });
    }

    res.status(200).json({ bid });
}


export function getAllBidsFromCard(req, res) {
    const cardID = Number(req.params.cardID);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ bids: card.bids });
}

export function getCardByID(req, res) {
    const cardID = Number(req.params.cardID);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ card });
}

export function getAllCards(req, res) {
    res.status(200).json(data.cards);
    console.log("cancro");
}

export function getRequestedCards(req, res) {
    const query = req.query.cards;

    if (!query) {
        return res.status(200).json(data.cards);
    }

    const options = {
        includeScore: true,
        keys: ['cardName'],
        threshold: 0.2,
    };

    const fuse = new Fuse(data.cards, options);

    const result = fuse.search(query);

    const matchedCards = result.map(r => r.item);

    res.status(200).json({ matchedCards });
}