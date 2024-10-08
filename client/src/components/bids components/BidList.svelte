<script>
    export let bids = [];
</script>

<div class="bg-pokeYellow bg-opacity-85 text-pokeDarkBlue rounded-lg shadow-md p-6 w-full h-full">
    <h2 class="text-xl font-bold mb-4 text-center">All Bids</h2>
    {#if bids && bids.length > 0}
        <ul>
            {#each bids as bid}
                <li>Bid: ${bid.bidAmount} by User {bid.userID}</li>
            {/each}
        </ul>
    {:else}
        <p>No bids available for this card.</p>
    {/if}
</div>
