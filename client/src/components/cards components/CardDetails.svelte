<script>
    import Timer from "../../components/Timer.svelte";

    export let cardDetails;
    export let auctionActive;
    export let onAuctionStatus;

    function handleBidClick() {
        console.log(`Bid placed: $100`);
        // Place bid logic here
    }
</script>

<div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-6">
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

            <Timer
                    startDate={new Date(cardDetails.actionStartingDate)}
                    endDate={new Date(cardDetails.auctionEndDate)}
                    on:auctionStatus={onAuctionStatus}/>

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
