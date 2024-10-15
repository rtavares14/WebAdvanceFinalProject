/**
 * Builds a query string based on the search and filter parameters.
 * @param {string} searchQuery - to filter the cards.
 * @param {string} filterRating - rating filter for cards.
 * @param {string} filterEnergy - energy type filter for cards.
 * @param {string} filterCardType - card type filter.
 * @param {string} filterActionStatus - auction status filter.
 * @returns {string} The builds query string.
 */
export function constructQueryString(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus) {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.append('search', searchQuery);
    if (filterRating) queryParams.append('rating', filterRating);
    if (filterEnergy) queryParams.append('energy', filterEnergy);
    if (filterCardType) queryParams.append('type', filterCardType);
    if (filterActionStatus) queryParams.append('status', filterActionStatus);

    return queryParams.toString();
}

/**
 * Fetches and updates the list of cards based on the provided search and filter parameters.
 * @param {string} searchQuery - search term to filter the cards.
 * @param {string} filterRating - rating filter for cards.
 * @param {string} filterEnergy - energy type filter for cards.
 * @param {string} filterCardType - card type filter.
 * @param {string} filterActionStatus - auction status filter.
 * @returns {Promise<Array>} The updated list of matched cards.
 * @throws {Error} If the fetch request fails.
 */
export async function updateCards(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus) {
    const queryString = constructQueryString(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus);
    const url = `http://localhost:3000/cards?${queryString}`;

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data.matchedCards || data;
    } else {
        throw new Error('Failed to fetch cards');
    }
}
