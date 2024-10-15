import {data} from "../dummyData/dummyData.js" ;
import Fuse from "fuse.js";
import * as helper from "../utils/controllersHelper.js";

export function deleteCard(req, res) {
    const cardID = Number(req.params.cardID);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    data.cards = data.cards.filter(card => card.cardID !== cardID);
    res.status(200).json({ message: "Card deleted successfully." });
    console.log("Card deleted successfully.");
}

export function updateCard(req, res) {
    const { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate } = req.body;

    const cardID = Number(req.params.cardID);

    const card = { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate };

    const validation = helper.validateCardData(card);

    if (!validation.valid) {
        console.log("Card data is not valid.");
        return res.status(400).json({ message: validation.message });
    }

    try {
        const cardIndex = data.cards.findIndex(c => c.cardID === cardID);

        if (cardIndex === -1) {
            console.log("Card not found. cardIndex:", cardIndex);
            return res.status(404).json({ message: "Card not found." });
        }

        data.cards[cardIndex] = {
            ...data.cards[cardIndex],
            ...card,
        };

        res.status(200).json({ message: "Card updated successfully.", card: data.cards[cardIndex] });
    } catch (error) {
        console.error("Failed to update card:", error);
        res.status(500).json({ error: "Failed to update card." });
    }
}


export function createNewCard(req, res) {
    const {cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate} = req.body;
    const card = { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate };

    const validation = helper.validateCardData(card);

    if (!validation.valid) {
        console.log("Card data is not valid.");
        return res.status(400).json({ message: validation.message });
    }

    const newCard = {
        cardID: helper.getNextCardID(), cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate, bids: [],
    };

    data.cards.push(newCard);

    res.status(201).json(newCard);
    console.log("Card created successfully.");
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
    console.log("Bid found successfully.");
}


export function getAllBidsFromCard(req, res) {
    const cardID = Number(req.params.cardID);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ bids: card.bids });
    console.log("Bids found successfully.");
}

export function getCardByID(req, res) {
    const cardID = Number(req.params.cardID);

    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ card });
    console.log("Card found successfully.");
}

export function getPopularCards(req, res) {
    const cards = data.cards;
    const dataLength = cards.length;

    const randomIndices = helper.getRandomIndices(5, dataLength);
    const randomCards = randomIndices.map(index => cards[index]);

    res.status(200).json({ popularCards: randomCards });
    console.log("Popular cards found successfully.");
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