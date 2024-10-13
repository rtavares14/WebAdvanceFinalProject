import {tokenShop} from '../shops/tokenShop.js';
import {constructQueryString} from "../utils/filtersHelper.js";
let token;
tokenShop.subscribe(value => token = value);

//main functions for my requests
async function getRequest(url, params) {
    const getResponse = await fetch(`http://localhost:3000/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return getResponse;
}

async function postRequest(url, body) {
    const postResponse = await fetch(`http://localhost:3000/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return postResponse;
}


//home page
export async function fetchPopularCards() {
    const response = await getRequest("cards/popular");
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Failed to fetch cards data: ${response.status}`);
    }
}


//cards page
export async function updateCards(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus) {
    const queryString = constructQueryString(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus);
    const response = await getRequest(`cards?${queryString}`);

    if (response.ok) {
        const data = await response.json();
        return data.matchedCards || data;
    } else {
        console.error('Error fetching cards:', response.status);
        throw new Error('Failed to fetch cards');
    }
}


//card page
export async function fetchCardDetails(cardID) {
    const response = await getRequest(`cards/${cardID}`);
    if (response.ok) {
        const data = await response.json();
        const cardDetails = data.card;

        return cardDetails;
    } else {
        console.error('Error fetching card details:', response.status);
        throw new Error('Failed to fetch card details.');
    }
}

export async function fetchBids(cardID) {
    const response = await getRequest(`cards/${cardID}/bids`);
    if (response.ok) {
        const data = await response.json();
        const sortedBids = data.bids.sort((a, b) => b.bidAmount - a.bidAmount);
        return sortedBids;
    } else {
        console.error('Error fetching bids:', response.status);
        return [];
    }
}


//account page
export async function fetchCardsWon() {
    const response = await getRequest("users/cards");
    if (response.ok) {
        return response.json();
    } else {
        console.error('Error fetching won cards:', response.status);
        throw new Error('Failed to fetch won cards.');
    }
}


//dashboard
export async function fetchAllCards() {
    const response = await getRequest("cards");
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Failed to fetch cards data: ${response.status}`);
    }
}

export async function deleteCard(cardID) {
    if (confirm('Are you sure you want to delete this card?')) {
        try {
            const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                return { success: true };
            } else {
                throw new Error(`Failed to delete card: ${response.status}`);
            }
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred. Please try again later.' };
        }
    }
}


//login
export async function login(email, password) {
    try {
        const response = await postRequest('users/tokens', { email, password });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);
            tokenShop.set(token);

            return { success: true, token };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Login failed. Please try again.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'An error occurred. Please try again later.' };
    }
}


//register
export async function registerUser(userEmail, userPass) {
    try {
        const response = await postRequest('users/', { userEmail, userPass });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);
            tokenShop.set(token);

            return { success: true, token };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Registration failed.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'An error occurred. Please try again later.' };
    }
}