<script>
    import Timer from "../../Timer.svelte";
    import {handleImageError} from "../../../utils/imgErrorHandeller.js";
    import {isBidValid} from "../../../utils/bidHelper.js";
    import {addBids} from "../../../api/allAPIRequests.js";

    export let cardID;
    export let cardDetails;
    export let onAuctionStatus;
    export let currentBids = [];
    //export let currentUserID;

    const now = new Date();
    let auctionActive = false;

    let bidAmount = "";
    const userID = localStorage.getItem('userID');
    console.log(userID);

    $: if (cardDetails) {
        const start = new Date(cardDetails.actionStartingDate);
        const end = new Date(cardDetails.auctionEndDate);
        auctionActive = now >= start && now <= end;
    }

    function handleBidSubmit() {
        const newBid = parseFloat(bidAmount);

        if (!cardDetails) {
            alert("Card details are not yet loaded. Please wait.");
            return;
        }

        if (!isBidValid(newBid, currentBids)) {
            return;
        }

        const userConfirmed = confirm(`Are you sure you want to place a bid of $${newBid}?`);

        if (userConfirmed) {
            addBids(cardID,bidAmount);
            console.log(cardID);
            //console.log(`Bid placed: $${newBid} by User ${currentUserID}`);
            alert("Bid placed successfully!");
            bidAmount = "";
        } else {
            console.log("Bid placement cancelled.");
        }
    }

</script>

<div class="bg-pokeDarkBlue text-white rounded-lg shadow-md p-6 relative">
    {#if cardDetails}
        <h1 class="text-3xl font-bold text-center mb-4">{cardDetails.cardName}</h1>
        <div class="flex justify-center mb-4">
            <img
                    src={cardDetails.cardImg}
                    alt={cardDetails.cardName}
                    class="h-64 w-auto object-cover rounded"
                    on:error={handleImageError}
            />
        </div>
        <div class="mb-4">
            <p class="text-lg"><strong>Type:</strong> {cardDetails.cardType}</p>
            <p class="text-lg"><strong>Energy Type:</strong> {cardDetails.energyType}</p>
            <p class="text-lg"><strong>Rating:</strong> {cardDetails.cardRate}</p>
        </div>
        <div>
            <p class="text-lg"><strong>Starting Bid:</strong> ${cardDetails.auctionStartingBid}</p>
            <p class="text-lg"><strong>Auction
                Starts:</strong> {new Date(cardDetails.actionStartingDate).toLocaleDateString()}</p>
            <p class="text-lg"><strong>Auction
                Ends:</strong> {new Date(cardDetails.auctionEndDate).toLocaleDateString()}</p>
            <Timer
                    startDate={new Date(cardDetails.actionStartingDate)}
                    endDate={new Date(cardDetails.auctionEndDate)}
                    on:auctionStatus={onAuctionStatus}
            />

            <div class="flex items-center mt-4">
                <button
                        class="px-4 py-2 font-bold text-lg rounded transition duration-200
                        {auctionActive ? 'bg-pokeYellow hover:bg-pokeYellow-dark text-pokeDarkBlue hover:scale-105 shadow-lg' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}"
                        disabled={!auctionActive}
                        on:click={handleBidSubmit}
                >
                    Place Bid
                </button>

                <input
                        type="number"
                        bind:value={bidAmount}
                        placeholder="Enter bid amount"
                        class="ml-3 p-2.5 rounded bg-pokeYellow text-pokeDarkBlue no-underline"
                        min={currentBids.length > 0 ? currentBids[0]?.bidAmount + 1 : cardDetails.auctionStartingBid}
                />
            </div>
        </div>
    {:else}
        <p>Loading card details...</p>
    {/if}
</div>
