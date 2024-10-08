<script>
    import CardDetails from '../components/cards components/CardDetails.svelte';
    import BidList from '../components/bids components/BidList.svelte';
    export let params;

    let cardID = params.id;
    let cardDetailsPromise;
    let bidsPromise;
    let auctionActive = false;

    $: if (cardID) {
        cardDetailsPromise = fetchCardDetails(cardID);
        bidsPromise = fetchBids(cardID);
    }

    async function fetchCardDetails(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}`);
        if (response.ok) {
            const data = await response.json();
            const cardDetails = data.card;

            const now = new Date();
            const start = new Date(cardDetails.actionStartingDate);
            const end = new Date(cardDetails.auctionEndDate);

            auctionActive = now >= start && now <= end;
            return cardDetails; // Return the card details here
        } else {
            console.error('Error fetching card details:', response.status);
            throw new Error('Failed to fetch card details.');
        }
    }

    async function fetchBids(cardID) {
        const response = await fetch(`http://localhost:3000/cards/${cardID}/bids`);
        if (response.ok) {
            const data = await response.json();
            return data.bids.sort((a, b) => b.bidAmount - a.bidAmount);
        } else {
            console.error('Error fetching bids:', response.status);
            return [];
        }
    }

    function handleAuctionStatus(event) {
        auctionActive = event.detail;
    }

    let bidAmount = 100;
</script>

<main class="flex justify-center p-6 mt-16">
    <div class="w-full max-w-6xl flex space-x-6 items-stretch">
        <div class="bg-pokeYellow bg-opacity-85 text-white rounded-lg shadow-md p-6 flex-grow">
            {#await cardDetailsPromise}
                <p>Loading card details...</p>
            {:then cardDetails}
                <CardDetails
                        cardDetails={cardDetails}
                        auctionActive={auctionActive}
                        onAuctionStatus={handleAuctionStatus}
                />
            {:catch error}
                <p class="text-red-500">Error fetching card details: {error.message}</p>
            {/await}
        </div>

        <div class="bg-pokeDarkBlue bg-opacity-85 text-pokeDarkBlue rounded-lg shadow-md p-6 flex-shrink-0 w-96">
            {#await bidsPromise}
                <div class="text-center">
                    <p>Loading bids...</p>
                </div>
            {:then bids}
                <div class="bid-list-container overflow-y-auto ">
                    <BidList {bids} />
                </div>
            {:catch error}
                <div class="text-center">
                    <p class="text-red-500">Error fetching bids: {error.message}</p>
                </div>
            {/await}
        </div>
    </div>
</main>

<style>
    .bid-list-container {
        height: 35.5rem;
        overflow-y: auto;
    }
</style>