<script>
    let promise;

    async function fetchCards() {
        const response = await fetch(`http://localhost:3000/cards`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
        }
    }

    promise = fetchCards();

</script>


<main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Random Cards</h1>

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then data}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each data as card}
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
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
                            <p><strong>Auction Ends:</strong> {new Date(card.auctionEndDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
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

</style>
