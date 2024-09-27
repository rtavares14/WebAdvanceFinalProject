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
    <h1 class="text-2xl font-bold mb-4 text-center">Random Cards</h1>

    <p class="text-center mb-4">Some of our cards</p>

    {#await promise}
        <div class="text-center">
            <p>Loading cards...</p>
        </div>
    {:then data}
        <div class="flex justify-center gap-4">
            {#each data as card}
                <a href={`/cards/${card.cardID}`} class="no-underline">
                    <div class="bg-pokeDarkBlue bg-opacity-70 text-white rounded-lg shadow-md overflow-hidden"
                         style="width: 25rex;">
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
