<script>
    let promise;

    async function fetchCards() {
        const response = await fetch(`http://localhost:3000/cards`);
        if (response.ok) {
            return response.json();
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
        }
    }

    promise = fetchCards();

</script>

<main class="container mx-auto p-4">

    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center"
         style="max-width: 45rem;">
        <p class="text-2xl font-bold">Check out all of our cards currently being auctioned!</p>
    </div>

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then data}
        <div class="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-4 justify-center">
            {#each data as card}
                <a href={`/cards/${card.cardID}`} class="no-underline">
                    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md overflow-hidden mx-auto"
                         style="width: 30rex;">
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
                                <p><strong>Auction
                                    Starts:</strong> {new Date(card.actionStartingDate).toLocaleDateString()}</p>
                                <p><strong>Auction Ends:</strong> {new Date(card.auctionEndDate).toLocaleDateString()}
                                </p>

                                {#if new Date() < new Date(card.actionStartingDate)}
                                    <p class="text-pokeYellow"><strong>Starting
                                        in:</strong> {Math.ceil((new Date(card.actionStartingDate) - new Date()) / (1000 * 60 * 60 * 24))}
                                        days</p>
                                {:else if new Date() < new Date(card.auctionEndDate)}
                                    <p class="text-pokeGreen"><strong>Days
                                        Left:</strong> {Math.ceil((new Date(card.auctionEndDate) - new Date()) / (1000 * 60 * 60 * 24))}
                                        days</p>
                                {:else}
                                    <p class="text-pokeRed"><strong>Auction has ended</strong></p>
                                {/if}

                            </div>
                        </div>
                    </div>
                </a>
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

    a.no-underline:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }

</style>