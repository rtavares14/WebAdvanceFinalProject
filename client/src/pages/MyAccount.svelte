<script>
    import CardWon from '../components/cards components/cardUI/CardWon.svelte';
    import { fetchCardsWon } from "../api/allAPIRequests.js";

    let cardsWonPromise;
    let error = '';

    $: cardsWonPromise = fetchCardsWon();
</script>

<main class="container mx-auto  transform-scale">
    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center"
         style="max-width: 45rem;">
        <h2 class="text-3xl font-bold mb-4">Obtain Cards</h2>
        <p class="text-lg">All the cards obtained by you, congratulations!</p>

        <div class="mt-4">
            <a href="/cards"
               class="bg-pokeYellow bg-opacity-80 text-pokeDarkBlue font-bold py-2 px-4 rounded hover:bg-pokeDarkBlue hover:text-pokeYellow hover:bg-opacity-60 transition">
                Bid More Here
            </a>
        </div>
    </div>

    <div class="w-full max-w-4xl mx-auto">
        {#await cardsWonPromise}
            <div class="flex justify-center items-center h-48">
                <div class="loader"></div>
            </div>
        {:then data}
            {#if data.wonCards && data.wonCards.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {#each data.wonCards as card}
                        <div class="flex justify-center">
                            <CardWon {card} />
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-6 mx-auto text-center" style="max-width: 20rem;">
                    <h2 class="text-1xl text-white font-bold">You haven't won any cards yet.</h2>
                    <p>Start bidding, something may happen...</p>
                </div>
            {/if}
        {:catch fetchError}
            <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-6 mx-auto text-center" style="max-width: 24rem;">
                <p class="text-1xl text-white font-bold mb-2">Error fetching won cards... Please try again</p>
                <p class="text-1xl text-red-500 font-bold">{fetchError.message}</p>
            </div>
        {/await}
    </div>
</main>

<style>
    .grid {
        justify-items: center;
    }

    .transform-scale {
        transform: scale(0.9);
    }
</style>
