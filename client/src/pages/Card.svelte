<script>
    import CardDetails from '../components/cards components/cardUI/CardDetails.svelte';
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
        <div class="bg-pokeDarkBlue opacity-95 text-white rounded-lg shadow-md p-6 flex-grow">
            {#await cardDetailsPromise}
                <div class="flex justify-center items-center h-48">
                    <div class="loader"></div>
                </div>
            {:then cardDetails}
                <CardDetails
                        cardDetails={cardDetails}
                        onAuctionStatus={handleAuctionStatus}/>
            {:catch error}
                <div class="bg-pokeDarkBlue bg-opacity-95 text-white rounded-lg shadow-md p-4 mb-6 mt-6 mx-auto text-center" style="max-width: 28rem;">
                    <p class="text-1xl text-white font-bold mb-2">Error fetching card information... Please try again</p>
                    <p class="text-1xl text-red-500 font-bold">{error.message}</p>
                </div>
            {/await}
        </div>

        <div class="bg-pokeDarkBlue bg-opacity-95 text-pokeDarkBlue rounded-lg shadow-md p-6 flex-shrink-0 w-96">
            <div class="bid-list-container overflow-y-auto max-h-[35.5rem] ">
                {#await bidsPromise}
                    <div class="flex justify-center items-center h-48">
                        <div class="loader"></div>
                    </div>
                {:then bids}
                    <BidList {bids} />
                {:catch error}
                    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-6 mx-auto text-center" style="max-width: 20rem;">
                        <p class="text-1xl text-white font-bold mb-2">Error fetching bids... Please try again</p>
                        <p class="text-1xl text-red-500 font-bold">{error.message}</p>
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