import { tokenShop } from '../shops/tokenShop.js';

let token;
tokenShop.subscribe(value => token = value);

async function request(url, params) {
    const queryString = new URLSearchParams(window.location.search).toString();
    const response = await fetch(`http://localhost:3000/${url}?${queryString}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}


//home page
export async function fetch5Cards() {
    const response = await request("cards/hot");
    if (response.ok) {
        const data = await response.json();
        const dataLength = data.length;
        const randomIndices = getRandomIndices(5, dataLength);
        return randomIndices.map(index => data[index]);
    } else {
        console.error(`Failed to fetch cards data: ${response.status}`);
    }
}

//cards page



//card page
export async function fetchCardDetails(cardID) {
    const response = await request(`cards/${cardID}`);
    if (response.ok) {
        const data = await response.json();
        const cardDetails = data.card;

        const now = new Date();
        const start = new Date(cardDetails.actionStartingDate);
        const end = new Date(cardDetails.auctionEndDate);

        const auctionActive = now >= start && now <= end;
        return cardDetails ;
    } else {
        console.error('Error fetching card details:', response.status);
        throw new Error('Failed to fetch card details.');
    }
}

export async function fetchBids(cardID) {
    const response = await request(`cards/${cardID}/bids`);
    if (response.ok) {
        const data = await response.json();
        return data.bids.sort((a, b) => b.bidAmount - a.bidAmount);
    } else {
        console.error('Error fetching bids:', response.status);
        return [];
    }
}


//account page
export async function fetchCardsWon() {
    const response = await request("users/cards");
    if (response.ok) {
        return response.json();
    } else {
        console.error('Error fetching won cards:', response.status);
        throw new Error('Failed to fetch won cards.');
    }
}

//dashboard
export async function fetchAllCards() {
    const response = await request("cards");
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Failed to fetch cards data: ${response.status}`);
    }
}




function getRandomIndices(count, max) {
    const indices = new Set();
    while (indices.size < count) {
        const randomIndex = Math.floor(Math.random() * max);
        indices.add(randomIndex);
    }
    return [...indices];
}