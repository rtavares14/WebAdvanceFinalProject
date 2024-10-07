<script>
    import CardFilters from '../components/CardFilters.svelte';

    let searchQuery = '';
    let cards = [];
    let loading = false;
    let errorMessage = '';

    let filterRating = '';
    let filterEnergy = '';
    let filterCardType = '';
    let filterActionStatus = '';

    async function fetchCards(query) {
        let url = `http://localhost:3000/cards`;
        if (query) {
            url += `?cards=${encodeURIComponent(query)}`;
        }

        loading = true;
        errorMessage = '';

        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
        }
    }

    async function updateCards() {
        const data = await fetchCards(searchQuery);
        if (data) {
            let filteredCards = data.matchedCards || data;

            // Apply additional filters (same logic as before)
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

            cards = filteredCards;
        }
        loading = false;
    }

    async function loadAllCards() {
        loading = true;
        const data = await fetchCards();
        cards = data;
        loading = false;
    }

    $: searchQuery, updateCards();
    $: filterRating, updateCards();
    $: filterEnergy, updateCards();
    $: filterCardType, updateCards();
    $: filterActionStatus, updateCards();

    loadAllCards();
</script>

<main class="container mx-auto p-4">
    <CardFilters
            {searchQuery}
            bind:filterRating
            bind:filterEnergy
            bind:filterCardType
            bind:filterActionStatus
            updateCards={updateCards}
    />

    {#if loading}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:else if errorMessage}
        <div class="text-center">
            <p class="text-red-500">{errorMessage}</p>
        </div>
    {:else}
        <div class="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-4 justify-center">
            {#each cards as card}
                <a href={`/cards/${card.cardID}`} class="no-underline">
                    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md overflow-hidden mx-auto"
                         style="width: 16rem;">
                        <div class="p-4">
                            <h2 class="text-xl font-semibold text-center mb-2">{card.cardName}</h2>
                            <div class="flex justify-center mb-2">
                                <img src={card.cardImg} alt={card.cardName} class="h-32 w-auto object-cover">
                            </div>
                            <div class="text-center">
                                <p><strong>Type:</strong> {card.cardType}</p>
                                <p><strong>Energy Type:</strong> {card.energyType}</p>
                                <p><strong>Rating:</strong> {card.cardRate}</p>
                            </div>
                            <div class="mt-4 text-center">
                                <p><strong>Starting Bid:</strong> ${card.auctionStartingBid}</p>
                                <p><strong>Auction Starts:</strong> {new Date(card.actionStartingDate).toLocaleDateString()}</p>
                                <p><strong>Auction Ends:</strong> {new Date(card.auctionEndDate).toLocaleDateString()}</p>
                                {#if new Date() < new Date(card.actionStartingDate)}
                                    <p class="text-pokeYellow"><strong>Starting in:</strong> {Math.ceil((new Date(card.actionStartingDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                                {:else if new Date() < new Date(card.auctionEndDate)}
                                    <p class="text-pokeGreen"><strong>Days Left:</strong> {Math.ceil((new Date(card.auctionEndDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                                {:else}
                                    <p class="text-pokeRed"><strong>Auction has ended</strong></p>
                                {/if}
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</main>

<style>
    a.no-underline:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
</style>