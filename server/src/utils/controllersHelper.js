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

