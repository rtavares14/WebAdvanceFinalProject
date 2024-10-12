<script>
    import { fetchAllCards } from "../api/allAPIRequests.js";
    import { deleteCard } from "../api/allAPIRequests.js";
    import CardRow from '../components/cards components/CardRow.svelte';

    let promise;
    let errorMessage = '';

    promise = fetchAllCards();

    function editCard(cardID) {
        console.log(`Edit card with ID: ${cardID}`);
    }
</script>

<main class="container mx-auto p-4 bg-pokeDarkBlue opacity-95 mt-4 rounded-lg">
    <h1 class="text-3xl text-white font-bold text-center mb-4">Admin Dashboard</h1>

    <div class="header-row flex justify-between items-center bg-pokeLightBlue text-white py-2 px-4 rounded-md mb-4 font-semibold">
        <div class="w-1/8 pl-5">Auction ID</div>
        <div class="w-1/6 pl-5">Auction Name</div>
        <div class="w-1/4 pr-20">Start/End Date</div>
        <div class="w-1/8 pr-16">Options</div>
    </div>

    <div class="card-container bg-pokeLightBlue rounded-lg p-4" style="max-height: 600px; overflow-y: auto;">
        {#await promise}
            <div class="text-center">
                <p>Loading cards...</p>
            </div>
        {:then data}
            {#if errorMessage}
                <div class="text-red-500 text-center mb-4">
                    <p>{errorMessage}</p>
                </div>
            {/if}

            {#if data.matchedCards.length > 0}
                <div>
                    {#each data.matchedCards as card (card.cardID || card.cardName)}
                        <CardRow
                                {card}
                                {editCard}
                                {deleteCard}
                        />
                    {/each}
                </div>
            {:else}
                <div class="text-center">
                    <p>No cards available.</p>
                </div>
            {/if}
        {:catch error}
            <div class="text-center">
                <p class="text-red-500">Error loading cards: {error.message}</p>
            </div>
        {/await}
    </div>
</main>

<style>
    .container {
        max-width: 1000px;
    }

    .card-container {
        max-height: 600px;
    }

    main {
        margin-top: 5rem;
    }
</style>
