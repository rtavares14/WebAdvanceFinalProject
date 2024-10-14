<script>
    //import { createNewCardBid } from "../api/allAPIRequests.js"; // Import the API call

    export let cardID;
    export let currentBids = [];
    export let currentUserID;
    export let auctionStartingBid;

    let bidAmount = "";
    let errorMessage = "";
    let successMessage = "";

    async function submitBid() {

    }
</script>

<div class="flex flex-col space-y-2">
    <input
            type="number"
            placeholder="Enter your bid"
            bind:value={bidAmount}
            class="px-4 py-2 text-lg rounded bg-pokeYellow text-pokeDarkBlue"
            min={currentBids.length > 0 ? currentBids[0].bidAmount + 1 : auctionStartingBid}
    />

    <button
            class="px-4 py-2 font-bold text-lg rounded bg-pokeYellow hover:bg-pokeYellow-dark text-pokeDarkBlue hover:scale-105 shadow-lg"
            on:click={submitBid}
            disabled={!bidAmount || parseFloat(bidAmount) <= (currentBids[0]?.bidAmount || auctionStartingBid)}
    >
        Place Bid
    </button>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    {#if successMessage}
        <p class="text-green-500">{successMessage}</p>
    {/if}
</div>
