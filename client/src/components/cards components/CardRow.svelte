<script>
    export let card;
    export let editCard;
    export let deleteCard;

    function formatDate(isoDateString) {
        return isoDateString.substring(0, 10); // Get the first 10 characters
    }
</script>

<div class="card-row flex justify-between items-center border-b py-2 bg-pokeDarkBlue text-white mb-2 rounded-lg">
    <div class="card-id text-left w-1/4 pl-10">{card.cardID}</div>
    <div class="card-name text-left w-1/4">{card.cardName}</div>
    <div class="card-dates text-left w-1/4">
        Start: {formatDate(card.actionStartingDate)} <br />
        End: {formatDate(card.auctionEndDate)}
    </div>
    <div class="card-actions text-right w-1/4 pr-4">
        <button on:click={() => editCard(card.cardID)} class="bg-pokeYellow text-pokeDarkBlue px-2 py-1 rounded mr-1 hover:bg-yellow-600">
            Edit
        </button>

        <button on:click={() => {
        console.log(`Deleting card with ID: ${card.cardID}`); // Log card ID
        deleteCard(card.cardID);
    }} class="bg-pokeRed text-white px-2 py-1 rounded hover:bg-red-900">
            Delete
        </button>
    </div>
</div>

<style>
    .card-row {
        border: none;
    }

    .card-actions button {
        margin-left: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
</style>
