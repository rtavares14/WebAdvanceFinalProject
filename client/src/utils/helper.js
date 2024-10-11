export function constructQueryString(searchQuery, filterRating, filterEnergy, filterCardType, filterActionStatus) {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.append('search', searchQuery);
    if (filterRating) queryParams.append('rating', filterRating);
    if (filterEnergy) queryParams.append('energy', filterEnergy);
    if (filterCardType) queryParams.append('type', filterCardType);
    if (filterActionStatus) queryParams.append('status', filterActionStatus);

    return queryParams.toString();
}

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

export function clearFilters(updatePromise) {
    updatePromise('');
}
