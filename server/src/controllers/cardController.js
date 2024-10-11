import {data} from "../dummyData/dummyData.js" ;
import Fuse from "fuse.js";
import * as helper from "../utils/controllersHelper.js";

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

export function getPopularCards(req, res) {
    const cards = data.cards;
    const dataLength = cards.length;

    const randomIndices = getRandomIndices(5, dataLength);
    const randomCards = randomIndices.map(index => cards[index]);

    res.status(200).json({ popularCards: randomCards });
}

export function getRandomIndices(amount, max) {
    const indices = [];
    while (indices.length < amount) {
        const index = Math.floor(Math.random() * max);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    return indices;
}

export function getRequestedCards(req, res) {
    const query = req.query.search;
    let filteredCards = data.cards;

    if (query) {
        const options = {
            includeScore: true,
            keys: ['cardName'],
            threshold: 0.3,
        };

        const fuse = new Fuse(data.cards, options);
        const result = fuse.search(query);

        filteredCards = result.map(r => r.item);
    }

    filteredCards = helper.filterCards(filteredCards, req.query);

    res.status(200).json({ matchedCards: filteredCards });
}