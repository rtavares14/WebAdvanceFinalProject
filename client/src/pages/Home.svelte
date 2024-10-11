<script>
    import Card from '../components/cards components/Card.svelte';
    import {fetch5Cards} from "../api/allAPIRequests.js";
    let promise;

    promise = fetch5Cards();
    console.log(promise);

</script>

<main class="container mx-auto p-4">

    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center"
         style="max-width: 45rem;">
        <h2 class="text-2xl font-bold mb-4">Popular Cards</h2>
        <p class="text-lg">Check out the most popular cards being bid on right now.</p>

        <div class="mt-4">
            <a href="/cards"
               class="bg-pokeYellow bg-opacity-80 text-pokeDarkBlue font-bold py-2 px-4 rounded hover:bg-pokeDarkBlue hover:text-pokeYellow hover:bg-opacity-60 transition">
                See All Cards
            </a>
        </div>
    </div>

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then data}
        <div class="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-4 justify-center">
            {#each data as card}
                <Card {card} />
            {/each}
        </div>
    {:catch error}
        <div class="text-center">
            <p>No cards available... Please try again</p>
            <p class="text-red-500">{error.message}</p>
        </div>
    {/await}
</main>

<style>
    a:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
</style>
