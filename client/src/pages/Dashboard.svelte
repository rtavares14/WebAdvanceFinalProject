<script>
    import { fetchAllCards } from "../api/allAPIRequests.js";
    import CardRow from '../components/cards components/CardRow.svelte';  // Importing the CardRow component

    let promise;
    let errorMessage = '';

    // Fetch cards when the component mounts (promise gets assigned)
    promise = fetchAllCards();

    // Function to handle deleting a card
    async function deleteCard(cardID) {
        if (confirm('Are you sure you want to delete this card?')) {
            try {
                const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Re-fetch cards after deleting one
                    promise = fetchAllCards();
                } else {
                    throw new Error(`Failed to delete card: ${response.status}`);
                }
            } catch (error) {
                errorMessage = error.message;
            }
        }
    }

    // Placeholder function for editing a card
    function editCard(cardID) {
        console.log(`Edit card with ID: ${cardID}`);
    }
</script>

<main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then data}
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
            {#if errorMessage}
                <div class="text-red-500 text-center mb-4">
                    <p>{errorMessage}</p>
                </div>
            {/if}

            {#if data.length > 0}
                <div>
                    {#each data as card (card.id || card.name || Math.random())}
                        <CardRow {card} {editCard} {deleteCard} />
                    {/each}
                </div>
            {:else}
                <div class="text-center">
                    <p>No cards available.</p>
                </div>
            {/if}
        </div>
    {:catch error}
        <div class="text-center">
            <p class="text-red-500">Error loading cards: {error.message}</p>
        </div>
    {/await}
</main>

<style>
    .container {
        max-width: 1000px;
    }
</style>
