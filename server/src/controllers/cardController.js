import { data } from "../dummyData/dummyData.js";
import Fuse from "fuse.js";
import * as helper from "../utils/controllersHelper.js";
import { StatusCodes } from 'http-status-codes';

// Delete card with the given ID
export function deleteCard(req, res) {
    const cardID = Number(req.params.cardID);
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Card not found" });
    }

    data.cards = data.cards.filter(card => card.cardID !== cardID);
    res.status(StatusCodes.OK).json({ message: "Card deleted successfully." });
    console.log("Card deleted successfully.");
}

// Update card with the given ID
export function updateCard(req, res) {
    const { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate } = req.body;
    const cardID = Number(req.params.cardID);
    const card = { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate };
    const validation = helper.validateCardData(card);

    if (!validation.valid) {
        console.log("Card data is not valid.");
        return res.status(StatusCodes.BAD_REQUEST).json({ message: validation.message });
    }

    try {
        const cardIndex = data.cards.findIndex(c => c.cardID === cardID);

        if (cardIndex === -1) {
            console.log("Card not found. cardIndex:", cardIndex);
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Card not found." });
        }

        data.cards[cardIndex] = {
            ...data.cards[cardIndex],
            ...card,
        };

        res.status(StatusCodes.OK).json({ message: "Card updated successfully.", card: data.cards[cardIndex] });
    } catch (error) {
        console.error("Failed to update card:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update card." });
    }
}

// Create a new card with the given data
export function createNewCard(req, res) {
    const {cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate} = req.body;
    const card = {cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate};
    const validation = helper.validateCardData(card);

    if (!validation.valid) {
        console.log("Card data is not valid.");
        return res.status(StatusCodes.BAD_REQUEST).json({ message: validation.message });
    }

    const newCard = {
        cardID: helper.getNextCardID(),
        cardName,
        cardImg,
        actionStartingDate,
        auctionEndDate,
        auctionStartingBid,
        cardType,
        energyType,
        cardRate,
        bids: [],
    };

    data.cards.push(newCard);

    res.status(StatusCodes.CREATED).json(newCard);
    console.log("Card created successfully.");
}

//Get all bids from the card with the given ID
export function getBidIDFromCard(req, res) {
    const cardID = req.params.cardID;
    const bidID = req.params.bidID;
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Card not found" });
    }

    const bid = card.bids.find((bid, index) => index + 1 === bidID);

    if (!bid) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Bid not found" });
    }

    res.status(StatusCodes.OK).json({ bid });
    console.log("Bid found successfully.");
}

// Get all bids from the card with the given ID
export function getAllBidsFromCard(req, res) {
    const cardID = Number(req.params.cardID);
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Card not found" });
    }

    res.status(StatusCodes.OK).json({ bids: card.bids });
    console.log("Bids found successfully.");
}

// Get card by ID
export function getCardByID(req, res) {
    const cardID = Number(req.params.cardID);
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Card not found" });
    }

    res.status(StatusCodes.OK).json({ card });
    console.log("Card found successfully.");
}

// Get popular cards for the home page (5 random cards)
export function getPopularCards(req, res) {
    const cards = data.cards;
    const dataLength = cards.length;

    const randomIndices = helper.getRandomIndices(5, dataLength);
    const randomCards = randomIndices.map(index => cards[index]);

    res.status(StatusCodes.OK).json({ popularCards: randomCards });
    console.log("Popular cards found successfully.");
}

// Get all cards that match the search query
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

    res.status(StatusCodes.OK).json({ matchedCards: filteredCards });
}