<script>
    import CardDetails from '../components/cards components/CardDetails.svelte';
    import BidList from '../components/bids components/BidList.svelte';
    import { fetchCardDetails } from "../api/allAPIRequests.js";
    import { fetchBids } from "../api/allAPIRequests.js";
    export let params;

    let cardID = params.id;
    let cardDetailsPromise;
    let bidsPromise;
    let auctionActive = false;

    $: if (cardID) {
        cardDetailsPromise = fetchCardDetails(cardID);
        bidsPromise = fetchBids(cardID);
    }

    function handleAuctionStatus(event) {
        auctionActive = event.detail;
    }
</script>

<main class="flex justify-center p-6 mt-16">
    <div class="w-full max-w-6xl flex space-x-6 items-stretch">
        <div class="bg-pokeYellow bg-opacity-85 text-white rounded-lg shadow-md p-6 flex-grow">
            {#await cardDetailsPromise}
                <p>Loading card details...</p>
            {:then cardDetails}
                <CardDetails
                        cardDetails={cardDetails}
                        onAuctionStatus={handleAuctionStatus}/>
            {:catch error}
                <p class="text-red-500">Error fetching card details: {error.message}</p>
            {/await}
        </div>

        <div class="bg-pokeDarkBlue bg-opacity-85 text-pokeDarkBlue rounded-lg shadow-md p-6 flex-shrink-0 w-96">
            <div class="bid-list-container overflow-y-auto max-h-[35.5rem]"> <!-- Set max height to 60rem -->
                {#await bidsPromise}
                    <div class="text-center">
                        <p>Loading bids...</p>
                    </div>
                {:then bids}
                    <BidList {bids} />
                {:catch error}
                    <div class="text-center">
                        <p class="text-red-500">Error fetching bids: {error.message}</p>
                    </div>
                {/await}
            </div>
        </div>
    </div>
</main>

<style>
    .bid-list-container {
        overflow-y: auto;
    }
</style>