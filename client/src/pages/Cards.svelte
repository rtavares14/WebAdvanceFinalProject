<script>
    import CardFilters from '../components/cards components/CardFilters.svelte';
    import Card from '../components/cards components/Card.svelte';
    import { applyFilters } from '../utils/filters';

    let promise;
    let searchQuery = '';
    let filterRating = '';
    let filterEnergy = '';
    let filterCardType = '';
    let filterActionStatus = '';
    let errorMessage = '';

    async function fetchCards(query) {
        let url = `http://localhost:3000/cards`;
        if (query) {
            url += `?cards=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
            throw new Error('Failed to fetch cards');
        }
    }

    async function updateCards() {
        try {
            const data = await fetchCards(searchQuery);
            return applyFilters(data.matchedCards || data, filterRating, filterEnergy, filterCardType, filterActionStatus);
        } catch (error) {
            errorMessage = error.message;
            throw error;
        }
    }


    function updatePromise() {
        promise = updateCards();
    }

    function clearFilters() {
        searchQuery = '';
        filterRating = '';
        filterEnergy = '';
        filterCardType = '';
        filterActionStatus = '';
    }

    $: searchQuery, updatePromise();
    $: filterRating, updatePromise();
    $: filterEnergy, updatePromise();
    $: filterCardType, updatePromise();
    $: filterActionStatus, updatePromise();

    updatePromise();
</script>

<main class="container mx-auto p-4">
    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center" style="max-width: 100rem;">
        <p class="text-2xl font-bold">Check out all of our cards currently being auctioned!</p>
        <p class="mt-2 text-lg"> Discover a variety of unique cards, their energy types, ratings, and auction statuses.</p>
        <p class="mt-2 text-lg"> Whether you're looking to buy, bid, or simply explore, you'll find all the information you need right here.</p>
        <p style="font-size: 0.25rem;" class="mt-2"> By the way, there is an easter egg planted on my cards.</p>
    </div>

    <CardFilters
            bind:searchQuery
            bind:filterRating
            bind:filterEnergy
            bind:filterCardType
            bind:filterActionStatus
            on:clearFilters={clearFilters}
    />

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then cards}
        {#if errorMessage}
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
    {:catch error}
        <div class="text-center">
            <p class="text-red-500">Error loading cards: {error.message}</p>
        </div>
    {/await}
</main>

<style>
    input, select {
        transition: background-color 0.3s ease;
    }

    input:focus, select:focus {
        background-color: #1d3557;
    }
</style>