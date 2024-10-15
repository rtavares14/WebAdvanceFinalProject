<script>
    export let card;
    export let editCard;
    export let deleteCard;

    // Function to format the date
    function formatDate(isoDateString) {
        return isoDateString ? isoDateString.substring(0, 10) : 'N/A';
    }

    // Function to get the auction status
    function getAuctionStatus() {
        const currentDate = new Date();
        const startDate = new Date(card.actionStartingDate);
        const endDate = new Date(card.auctionEndDate);

        if (endDate < currentDate) {
            return 'ended';
        } else if (startDate > currentDate) {
            return 'waiting';
        } else {
            return 'started';
        }
    }

    function handleEditClick() {
        if (getAuctionStatus() === 'ended') {
            alert('This auction has ended and cannot be edited.');
        } else {
            editCard(card);
        }
    }
</script>

<div class="card-row flex justify-between items-center border-b py-2 bg-pokeDarkBlue text-white mb-2 rounded-lg">
    <div class="status-indicator flex items-center ml-10">
        {#if getAuctionStatus() === 'ended'}
            <span class="red-dot"></span>
        {:else if getAuctionStatus() === 'waiting'}
            <span class="yellow-dot"></span>
        {:else}
            <span class="green-dot"></span>
        {/if}
    </div>

    <div class="card-id text-left w-1/4 pl-2 pr-5">{card.cardID}</div>
    <div class="card-name text-left w-1/3">{card.cardName}</div>
    <div class="card-dates text-left w-1/3">
        Start: {formatDate(card.actionStartingDate)} <br />
        End: {formatDate(card.auctionEndDate)}
    </div>
    <div class="card-actions text-right w-1/4 pr-4">
        <button
                on:click={handleEditClick}
        class={`bg-pokeYellow text-pokeDarkBlue px-2 py-1 rounded mr-1 hover:bg-yellow-600 ${getAuctionStatus() === 'ended' ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={getAuctionStatus() === 'ended'}>
        Edit
        </button>

        <button
                on:click={() => deleteCard(card.cardID)}
                class="bg-pokeRed text-white px-2 py-1 rounded hover:bg-red-900">
            Delete
        </button>
    </div>
</div>

<style>
    .card-row {
        border: none;
    }

    .red-dot, .yellow-dot, .green-dot {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
    }

    .card-actions button {
        margin-left: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
</style>
