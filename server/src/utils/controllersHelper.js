import {data} from "../dummyData/dummyData.js";

/**
 * Filters the cards based on user input.
 * It checks the card's rating, energy type, card type, and auction status.
 * @param {Array} cards - List of cards.
 * @param {Object} query - The search filters (rating, energy, type, status).
 * @returns {Array} - Returns the cards that match the filters.
 */
export function filterCards(cards, query) {
    const { rating, energy, type, status } = query;
    const now = new Date();

    let filteredCards = cards;

    if (rating) {
        filteredCards = filteredCards.filter(card => {
            if (rating.includes('-')) {
                const [minRating, maxRating] = rating.split('-').map(parseFloat);
                return card.cardRate >= minRating && card.cardRate <= maxRating;
            }
            return card.cardRate == rating;
        });
    }

    if (energy) {
        filteredCards = filteredCards.filter(card =>
            card.energyType.toLowerCase() === energy.toLowerCase()
        );
    }

    if (type) {
        filteredCards = filteredCards.filter(card =>
            card.cardType.toLowerCase() === type.toLowerCase()
        );
    }

    if (status) {
        filteredCards = filteredCards.filter(card => {
            const startDate = new Date(card.actionStartingDate);
            const endDate = new Date(card.auctionEndDate);

            if (status === "Waiting") {
                return startDate > now;
            } else if (status === "Started") {
                return startDate <= now && endDate > now;
            } else if (status === "Ended") {
                return endDate <= now;
            }
        });
    }
    return filteredCards;
}

/**
 * Gets random unique indices.
 * Picks 'amount' of random numbers between 0 and max.
 * @param {number} amount - How many random numbers.
 * @param {number} max - Maximum value for the numbers.
 * @returns {Array} - List of random unique numbers.
 */
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

/**
 * Finds the next user ID.
 * Goes through the list of users, finds gaps, and returns the next available ID.
 * @returns {number} - Next available user ID.
 */
export function getNextUserID() {
    const sortedUsers = data.users.map(user => user.userID).sort((a, b) => a - b);

    for (let i = 0; i < sortedUsers.length; i++) {
        if (sortedUsers[i] !== i + 1) {
            return i + 1;
        }
    }

    return sortedUsers.length + 1;
}

/**
 * Finds the next card ID.
 * Similar to getNextUserID, but for cards.
 * @returns {number} - Next available card ID.
 */
export function getNextCardID() {
    const sortedCards = data.cards.map(card => card.cardID).sort((a, b) => a - b);

    for (let i = 0; i < sortedCards.length; i++) {
        if (sortedCards[i] !== i + 1) {
            return i + 1;
        }
    }

    return sortedCards.length + 1;
}

/**
 * Checks if all the card data is valid.
 * It looks at required fields, auction dates, starting bid, and rating.
 * @param {Object} card - The card data to check.
 * @returns {Object} - Whether it's valid and why.
 */
export function validateCardData(card) {
    const { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate} = card;

    if (!cardName || !cardImg || !actionStartingDate || !auctionEndDate || !auctionStartingBid || !cardType || !energyType || !cardRate) {
        return { valid: false, message: 'All fields are required.' };
    }

    const startDate = new Date(actionStartingDate);
    const endDate = new Date(auctionEndDate);

    if (endDate <= startDate) {
        return { valid: false, message: 'End date must be after start date.' };
    }

    if (auctionStartingBid < 20) {
        return { valid: false, message: 'Starting bid must be at least 20.' };
    }

    if (cardRate < 0.5 || cardRate > 10 || cardRate % 0.5 !== 0) {
        return { valid: false, message: 'Card rate must be between 0.5 and 10.' };
    }

    return { valid: true };
}

/**
 * Checks if the bid is valid.
 * Looks at the auction start/end dates, compares the bid with the highest bid,
 * and ensures the user isn’t bidding twice in a row.
 * @param {number} bidAmount - The bid amount.
 * @param {Object} card - The card to place a bid on.
 * @param {number} userID - The user placing the bid.
 * @returns {Object} - Whether the bid is valid and why.
 */
export function validateBid(bidAmount, card, userID) {
    const now = new Date();
    const startDate = new Date(card.actionStartingDate);
    const endDate = new Date(card.auctionEndDate);

    if (startDate > now) {
        return { isValid: false, message: "Auction hasn't started yet." };
    }

    if (endDate <= now) {
        return { isValid: false, message: "Auction has ended." };
    }

    if (bidAmount < card.auctionStartingBid) {
        return { isValid: false, message: "Bid is less than the starting bid." };
    }

    const lastBid = card.bids[card.bids.length - 1];

    if (lastBid) {
        if (bidAmount <= lastBid.bidAmount) {
            return { isValid: false, message: "Bid must be higher than the current highest bid." };
        }

        if (bidAmount > lastBid.bidAmount * 1.3) {
            return { isValid: false, message: "Bid can't be more than 30% higher than the last one." };
        }

        if (lastBid.userID === userID) {
            return { isValid: false, message: "You can't bid twice in a row." };
        }
    }

    return { isValid: true };
}