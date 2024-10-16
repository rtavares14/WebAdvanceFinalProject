<script>
    import CardDetails from '../components/cards components/cardUI/CardDetails.svelte';
    import BidList from '../components/bids components/BidList.svelte';
    import {fetchCardDetails} from "../api/allAPIRequests.js";
    import {fetchBids} from "../api/allAPIRequests.js";

    export let params;

    let cardID = params.id;
    let cardDetailsPromise;
    let bids = [];
    let auctionActive = false;

    $: if (cardID) {
        cardDetailsPromise = fetchCardDetails(cardID);
        fetchBids(cardID).then(fetchedBids => bids = fetchedBids);
    }

    function handleAuctionStatus(event) {
        auctionActive = event.detail;
    }

    function setupSSE() {
        const eventSource = new EventSource(`http://localhost:3000/cards/bids/stream`);

        eventSource.onmessage = function (event) {
            const newBid = JSON.parse(event.data);
            bids = [newBid, ...bids];
        };

        eventSource.onerror = function (error) {
            console.error("Error with SSE:", error);
            eventSource.close();
        };
    }

    setupSSE();
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
                        currentBids={bids}
                        cardID={cardID}
                        onAuctionStatus={handleAuctionStatus}/>
            {:catch error}
                <div class="bg-pokeDarkBlue bg-opacity-95 text-white rounded-lg shadow-md p-4 mb-6 mt-6 mx-auto text-center"
                     style="max-width: 28rem;">
                    <p class="text-1xl text-white font-bold mb-2">Error fetching card information... Please try
                        again</p>
                    <p class="text-1xl text-red-500 font-bold">{error.message}</p>
                </div>
            {/await}
        </div>

        <div class="bg-pokeDarkBlue bg-opacity-95 text-pokeDarkBlue rounded-lg shadow-md p-6 flex-shrink-0 w-96 max-h-[37.5rem]">
            <div class="bid-list-container overflow-y-auto max-h-[34.5rem] ">
                <BidList {bids}/>
            </div>
        </div>
    </div>
</main>
