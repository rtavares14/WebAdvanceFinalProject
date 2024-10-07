<script>
    let promise;

    async function fetchCards() {
        const response = await fetch(`http://localhost:3000/cards`);
        if (response.ok) {
            const data = await response.json();
            const dataLength = data.length;
            const randomIndices = getRandomIndices(5, dataLength);
            return randomIndices.map(index => data[index]);
        } else {
            console.error(`Failed to fetch cards data: ${response.status}`);
        }
    }

    promise = fetchCards();

    function getRandomIndices(count, max) {
        const indices = new Set();
        while (indices.size < count) {
            const randomIndex = Math.floor(Math.random() * max);
            indices.add(randomIndex);
        }
        return [...indices];
    }
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
                                <p><strong>Auction
                                    Starts:</strong> {new Date(card.actionStartingDate).toLocaleDateString()}</p>
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
