export function applyFilters(cards, filterRating, filterEnergy, filterCardType, filterActionStatus) {
    let filteredCards = [...cards];

    if (filterRating) {
        if (filterRating === "10") {
            filteredCards = filteredCards.filter(card => card.cardRate === 10);
        } else if (filterRating === "9.0-9.9") {
            filteredCards = filteredCards.filter(card => card.cardRate >= 9 && card.cardRate < 10);
        } else if (filterRating === "8.0-8.9") {
            filteredCards = filteredCards.filter(card => card.cardRate >= 8 && card.cardRate < 9);
        } else if (filterRating === "7.0-7.9") {
            filteredCards = filteredCards.filter(card => card.cardRate >= 7 && card.cardRate < 8);
        } else if (filterRating === "6.9") {
            filteredCards = filteredCards.filter(card => card.cardRate <= 6.9);
        }
    }

    if (filterEnergy) {
        filteredCards = filteredCards.filter(card => card.energyType === filterEnergy);
    }

    if (filterCardType) {
        filteredCards = filteredCards.filter(card => card.cardType === filterCardType);
    }

    if (filterActionStatus) {
        const currentDate = new Date();
        filteredCards = filteredCards.filter(card => {
            if (filterActionStatus === "Started") {
                return currentDate >= new Date(card.actionStartingDate) && currentDate <= new Date(card.auctionEndDate);
            } else if (filterActionStatus === "Ended") {
                return currentDate > new Date(card.auctionEndDate);
            } else if (filterActionStatus === "Waiting") {
                return currentDate < new Date(card.actionStartingDate);
            }
        });
    }

    return filteredCards;
}
