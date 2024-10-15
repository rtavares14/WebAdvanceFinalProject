import {data} from "../dummyData/dummyData.js";

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

export function getNextUserID() {
    const sortedUsers = data.users.map(user => user.userID).sort((a, b) => a - b);

    for (let i = 0; i < sortedUsers.length; i++) {
        if (sortedUsers[i] !== i + 1) {
            return i + 1;
        }
    }

    return sortedUsers.length + 1;
}

export function getNextCardID() {
    const sortedCards = data.cards.map(card => card.cardID).sort((a, b) => a - b);

    for (let i = 0; i < sortedCards.length; i++) {
        if (sortedCards[i] !== i + 1) {
            return i + 1;
        }
    }

    return sortedUsers.length + 1;
}

export function validateCardData(card) {
    const { cardName, cardImg, actionStartingDate, auctionEndDate, auctionStartingBid, cardType, energyType, cardRate} = card;

    if (!cardName || !cardImg || !actionStartingDate || !auctionEndDate || !auctionStartingBid || !cardType || !energyType || !cardRate) {
        return { valid: false, message: 'All fields are required.' };
    }

    const startDate = new Date(actionStartingDate);
    const endDate = new Date(auctionEndDate);

    if (endDate <= startDate) {
        return { valid: false, message: 'End date must be greater than start date.' };
    }

    if (auctionStartingBid < 20) {
        return { valid: false, message: 'Starting bid must be a positive number.' };
    }

    if (cardRate < 0.5 || cardRate > 10 || cardRate % 0.5 !== 0) {
        return { valid: false, message: 'Card rate must be between 0.5 and 10, in increments of 0.5.' };
    }

    return { valid: true };
}

export function validateBid(bidAmount, card, userID) {
    const now = new Date();
    const startDate = new Date(card.actionStartingDate);
    const endDate = new Date(card.auctionEndDate);

    if (startDate > now) {
        return { isValid: false, message: "Auction has not started yet." };
    }

    if (endDate <= now) {
        return { isValid: false, message: "Auction has already ended." };
    }

    if (bidAmount < card.auctionStartingBid) {
        return { isValid: false, message: "Bid amount is lower than the starting bid." };
    }

    const lastBid = card.bids[card.bids.length - 1];

    if (lastBid) {
        if (bidAmount <= lastBid.bidAmount) {
            return { isValid: false, message: "Your bid must be higher than the current highest bid." };
        }

        if (bidAmount > lastBid.bidAmount * 1.3) {
            return { isValid: false, message: "Your bid cannot exceed 30% of the current highest bid." };
        }

        if (lastBid.userID === userID) {
            return { isValid: false, message: "You cannot place consecutive bids. Wait for another user to bid first." };
        }
    }

    return { isValid: true };
}