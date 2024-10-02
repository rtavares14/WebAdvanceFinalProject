<script>
    import { onMount } from 'svelte';
    import { tick } from 'svelte';

    let cardID;
    let cardDetails = null; // To store fetched card details
    let bids = []; // To store fetched bids

    // Function to update cardID when the URL changes
    function updateCardID() {
        const url = window.location.href;
        const urlParts = url.split('/');
        cardID = urlParts[urlParts.length - 1]; // Get the last part as cardID
    }

    // Fetch data when the cardID changes
    $: if (cardID) {
        fetchCardDetails(cardID);
        fetchBids(cardID);
    }

    onMount(() => {
        updateCardID(); // Set initial cardID

        // Listen for URL changes
        window.addEventListener('popstate', async () => {
            updateCardID();
            await tick(); // Wait for Svelte to update reactive variables
        });
    });

    // Function to fetch card details
    async function fetchCardDetails(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}`);
        if (response.ok) {
            const data = await response.json();
            cardDetails = data.card; // Assuming the card details are under the 'card' key
        } else {
            console.error('Error fetching card details:', response.status);
        }
    }

    // Function to fetch bids
    async function fetchBids(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}/bids`);
        if (response.ok) {
            bids = await response.json(); // Assuming bids are returned as an array
        } else {
            console.error('Error fetching bids:', response.status);
        }
    }

    function daysLeft(endDate) {
        const today = new Date();
        const remainingTime = new Date(endDate) - today;
        return Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    }
</script>

<main class="flex justify-center p-4">
    <div class="w-full max-w-3xl flex space-x-4">

        <div class="bg-pokeDarkBlue bg-opacity-70 text-white rounded-lg shadow-md p-6 w-2/3">
            {#if cardDetails}
                <h1 class="text-2xl font-bold text-center mb-4">{cardDetails.cardName}</h1>
                <div class="flex justify-center mb-4">
                    <img src={cardDetails.cardImg} alt={cardDetails.cardName} class="h-48 w-auto object-cover rounded">
                </div>
                <div class="mb-4">
                    <p><strong>Type:</strong> {cardDetails.cardType}</p>
                    <p><strong>Energy Type:</strong> {cardDetails.energyType}</p>
                    <p><strong>Rating:</strong> {cardDetails.cardRate}</p>
                </div>
                <div>
                    <p><strong>Starting Bid:</strong> ${cardDetails.auctionStartingBid}</p>
                    <p><strong>Auction Starts:</strong> {new Date(cardDetails.actionStartingDate).toLocaleDateString()}
                    </p>
                    <p><strong>Auction Ends:</strong> {new Date(cardDetails.auctionEndDate).toLocaleDateString()}</p>
                    <p>
                        {#if new Date() < new Date(cardDetails.auctionEndDate)}
                            <strong>Days Left:</strong> {daysLeft(cardDetails.auctionEndDate)} days
                        {:else}
                            <span class="text-red-500"><strong>Auction has ended</strong></span>
                        {/if}
                    </p>
                </div>
            {:else}
                <p>Loading card details...</p>
            {/if}
        </div>

        <div class="bg-pokeYellow bg-opacity-80 text-pokeDarkBlue rounded-lg shadow-md p-6 w-1/3">
            <h2 class="text-xl font-bold mb-4">All Bids</h2>
            <ul>
                {#each bids as bid}
                    <li>Bid: ${bid.amount} by {bid.user}</li>
                {:else}
                    <li>No bids available for this card.</li>
                {/each}
            </ul>
        </div>
    </div>
</main>

<style>
    h2 {
        border-bottom: 2px solid #facc15;
    }
</style>
