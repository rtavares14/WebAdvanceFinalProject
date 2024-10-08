<script>
    import CardFilters from '../components/CardFilters.svelte';
    import Card from '../components/Card.svelte';
    import { applyFilters } from '../utils/filters';
    let promise;


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

        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
        }
    }

    async function updateCards() {
        loading = true;
        try {
            const data = await fetchCards(searchQuery);
            if (data) {
                const matchedCards = data.matchedCards || data;
                cards = applyFilters(matchedCards, filterRating, filterEnergy, filterCardType, filterActionStatus);
            }
        } catch (error) {
            errorMessage = error.message;
        }
        loading = false;
    }

    async function loadAllCards() {
        loading = true;
        try {
            const data = await fetchCards();
            cards = applyFilters(data, filterRating, filterEnergy, filterCardType, filterActionStatus);
        } catch (error) {
            errorMessage = error.message;
        }
        loading = false;
    }

    function clearFilters() {
        searchQuery = '';
        filterRating = '';
        filterEnergy = '';
        filterCardType = '';
        filterActionStatus = '';
        updateCards();
    }

    $: searchQuery, updateCards();
    $: filterRating, updateCards();
    $: filterEnergy, updateCards();
    $: filterCardType, updateCards();
    $: filterActionStatus, updateCards();

    loadAllCards();
</script>

<main class="container mx-auto p-4">
    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center" style="max-width: 100rem;">
        <p class="text-2xl font-bold">Check out all of our cards currently being auctioned!</p>
        <p class="mt-2 text-lg">Discover a variety of unique cards, their energy types, ratings, and auction statuses. Whether you're looking to buy, bid, or simply explore, you'll find all the information you need right here!</p>
    </div>

    <CardFilters
            bind:searchQuery
            bind:filterRating
            bind:filterEnergy
            bind:filterCardType
            bind:filterActionStatus
            on:clearFilters={clearFilters}
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
                <Card {card} />
            {/each}
        </div>
    {/if}
</main>

<style>
    input, select {
        transition: background-color 0.3s ease;
    }

    input:focus, select:focus {
        background-color: #1d3557;
    }
</style>