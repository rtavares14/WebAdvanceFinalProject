<script>
    import Timer from '../components/Timer.svelte';
    export let params;

    let cardID = params.id;
    let cardDetails = null;
    let bids = [];
    let auctionActive = false;

    $: if (cardID) {
        fetchCardDetails(cardID);
        fetchBids(cardID);
    }

    async function fetchCardDetails(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}`);
        if (response.ok) {
            const data = await response.json();
            cardDetails = data.card;

            const now = new Date();
            const start = new Date(cardDetails.actionStartingDate);
            const end = new Date(cardDetails.auctionEndDate);

            if (now >= start && now <= end) {
                auctionActive = true;
            } else if (now > end) {
                auctionActive = false;
            } else {
                auctionActive = false;
            }
        } else {
            console.error('Error fetching card details:', response.status);
        }
    }

    async function fetchBids(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}/bids`);
        if (response.ok) {
            const data = await response.json();
            bids = data.bids.sort((a, b) => b.bidAmount - a.bidAmount);
        } else {
            console.error('Error fetching bids:', response.status);
            bids = [];
        }
    }


    function handleAuctionStatus(event) {
        auctionActive = event.detail;
    }

    let bidAmount = 100;

    function handleBidClick() {
        console.log(`Bid placed: $${bidAmount}`);
        // bid function here
    }

</script>

<main class="flex justify-center p-6 mt-16">
    <div class="w-full max-w-4xl flex space-x-6">
        <!-- Card Details -->
        <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-6 w-2/3">
            {#if cardDetails}
                <h1 class="text-2xl font-bold text-center mb-4">{cardDetails.cardName}</h1>
                <div class="flex justify-center mb-4">
                    <img src={cardDetails.cardImg} alt={cardDetails.cardName} class="h-56 w-auto object-cover rounded">
                </div>
                <div class="mb-4">
                    <p><strong>Type:</strong> {cardDetails.cardType}</p>
                    <p><strong>Energy Type:</strong> {cardDetails.energyType}</p>
                    <p><strong>Rating:</strong> {cardDetails.cardRate}</p>
                </div>
                <div>
                    <p><strong>Starting Bid:</strong> ${cardDetails.auctionStartingBid}</p>
                    <p><strong>Auction Starts:</strong> {new Date(cardDetails.actionStartingDate).toLocaleDateString()}</p>
                    <p><strong>Auction Ends:</strong> {new Date(cardDetails.auctionEndDate).toLocaleDateString()}</p>

                    <!-- Timer Component -->
                    <Timer
                            startDate={new Date(cardDetails.actionStartingDate)}
                            endDate={new Date(cardDetails.auctionEndDate)}
                            on:auctionStatus={handleAuctionStatus} /> <!-- auction status changes -->

                    <button
                            class="px-4 py-2 font-bold text-lg rounded transition duration-200
    {auctionActive ? 'bg-pokeYellow hover:bg-pokeYellow-dark text-pokeDarkBlue hover:scale-105 shadow-lg' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}"
                            disabled={!auctionActive}
                            on:click={handleBidClick}
                    >
                        {#if auctionActive}
                            Place a Bid
                        {:else if new Date() < new Date(cardDetails.actionStartingDate)}
                            Auction hasn't started
                        {:else}
                            Auction has ended
                        {/if}
                    </button>
                </div>
            {:else}
                <p>Loading card details...</p>
            {/if}
        </div>

        <!-- Bids Section -->
        <div class="bg-pokeYellow bg-opacity-85 text-pokeDarkBlue rounded-lg shadow-md p-6 w-1/3">
            <h2 class="text-xl font-bold mb-4 text-center">All Bids</h2>
            <ul>
                {#if bids && bids.length > 0}
                    {#each bids as bid}
                        <li>Bid: ${bid.bidAmount} by User {bid.userID}</li>
                    {/each}
                {:else}
                    <li>No bids available for this card.</li>
                {/if}
            </ul>
        </div>
    </div>
</main>

<style>

</style>
