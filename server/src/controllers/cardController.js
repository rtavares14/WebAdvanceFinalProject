import {data} from "../dummyData/dummyData.js";

export function deleteCard(req, res) {
    const cardID = req.params.cardID;

    // Find the Card by its ID
    const card = data.cards.find(card => card.id === cardID);

    if (!card) {
        // If no Card is found, send a 404 error
        return res.status(404).json({ error: "Card not found" });
    }

    // Remove and send success response if the Card is found
    data.cards = data.cards.filter(card => card.id !== cardID);
    res.status(200).json({ message: "Card deleted successfully." });
}

export function updateCard(req, res) {

}


export function createNewCard(req, res) {
    // Extract card data from the request body
    const newCard = {
        cardID: data.cards.length + 1, // Increment card ID
        cardName: req.body.cardName,
        cardImg: req.body.cardImg,
        actionStartingDate: new Date(req.body.actionStartingDate),
        auctionEndDate: new Date(req.body.auctionEndDate),
        auctionStartingBid: req.body.auctionStartingBid,
        cardType: req.body.cardType,
        energyType: req.body.energyType,
        cardRate: req.body.cardRate,
        bids: []
    };

    // Add the new card to the data
    data.cards.push(newCard);

    // Send a success response
    res.status(201).json({ message: 'New card added', card: newCard });
}


export function createNewCardBid(req, res) {

}


export function getBidIDFromCard(req, res) {
    const cardID = req.params.cardID;
    const bidID = req.params.bidID;

    // Find the card by its ID
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        // If the card is not found, return a 404 error
        return res.status(404).json({ error: "Card not found" });
    }

    // Find the specific bid within the card's bids array
    const bid = card.bids.find((bid, index) => index + 1 === bidID);

    if (!bid) {
        // If the bid is not found, return a 404 error
        return res.status(404).json({ error: "Bid not found" });
    }

    // Return the specific bid
    res.status(200).json({ bid });
}


export function getAllBidsFromCard(req, res) {
    const cardID = req.params.cardID;

    // Find the card by ID
    const card = data.cards.find(card => card.cardID === cardID);

    if (!card) {
        // If the card is not found, return a 404 error
        return res.status(404).json({ error: "Card not found" });
    }

    // Return the list of bids for the card
    res.status(200).json({ bids: card.bids });
}


export function getCardByID(req, res) {
    const cardID = req.params.cardID;

    // Find the Card by its ID
    const card = data.cards.find(card => card.id === cardID);

    if (!card) {
        // If Card is not found, send a 404 error
        return res.status(404).json({ error: "Card not found" });
    }

    // Return the Card data
    res.status(200).json({ card })
}

export function getAllCards(req, res) {
    // Return all Cards
    res.status(200).json(data.cards);
}