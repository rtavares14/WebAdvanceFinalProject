<script>
    import Timer from "../../Timer.svelte";
    import {handleImageError} from "../../../utils/imgErrorHandeller.js";
    import {isBidValid} from "../../../utils/bidHelper.js";
    import {addBids} from "../../../api/allAPIRequests.js";
    import {tokenShop} from "../../../shops/tokenShop.js";
    import {jwtDecode} from "jwt-decode";

    let token = null;
    let isAdmin = false;
    let userID = null;

    $: tokenShop.subscribe(value => {
        token = value;

        if (token) {
            // Decode the token to get the user's ID and admin status
            const decodedToken = jwtDecode(token);
            isAdmin = decodedToken?.isAdmin || false;
            userID = decodedToken?.userId || null;
        } else {
            isAdmin = false;
            userID = null;
        }
    });

    export let cardID;
    export let cardDetails;
    export let onAuctionStatus;
    export let currentBids = [];

    const now = new Date();
    let auctionActive = false;

    let bidAmount = "";


    $: if (cardDetails) {
        const start = new Date(cardDetails.actionStartingDate);
        const end = new Date(cardDetails.auctionEndDate);
        auctionActive = now >= start && now <= end;
    }

    function handleBidSubmit() {
        if (isAdmin) {
            alert("Admins can't bid!");
            bidAmount = "";
            return;
        }

        const newBid = parseFloat(bidAmount);

        if (!cardDetails) {
            alert("Card details are not yet loaded. Please wait.");
            return;
        }

        if (!isBidValid(newBid, currentBids, userID)) {
            bidAmount = "";
            return;
        }

        const userConfirmed = confirm(`Are you sure you want to place a bid of $${newBid}?`);

        if (userConfirmed) {
            alert("Bid placed successfully!");
            bidAmount = "";
        } else {
            console.log("Bid placement cancelled.");
            bidAmount = "";
        }
    }
</script>

<div class="bg-pokeDarkBlue text-white rounded-lg shadow-md p-6 relative max-h-[33.5rem]">
    {#if cardDetails}
        <h1 class="text-2xl font-bold text-center mb-4">{cardDetails.cardName}</h1>
        <div class="flex justify-center mb-4">
            <img
                    src={cardDetails.cardImg}
                    alt={cardDetails.cardName}
                    class="card-img-size"
                    on:error={handleImageError}
            />
        </div>
        <div class="mb-5">
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
                    on:auctionStatus={onAuctionStatus}
            />

            <button
                    class="px-3 py-1.5 font-bold text-lg rounded transition duration-200
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
                    class="ml-3 p-2 py-2 rounded bg-pokeYellow text-pokeDarkBlue no-underline"
                    min={currentBids.length > 0 ? currentBids[0]?.bidAmount + 1 : cardDetails.auctionStartingBid}
            />
        </div>
    {:else}
        <p>Loading card details...</p>
    {/if}
</div>

<style>
    .card-img-size {
        width: 9rem;
        height: auto;
    }
</style>