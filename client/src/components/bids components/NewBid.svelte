<script>
    import { createEventDispatcher } from 'svelte';

    export let cardID;
    let userID = '';
    let bidAmount = '';

    const dispatch = createEventDispatcher();

    // Function to submit a new bid
    async function submitBid() {
        if (!userID || !bidAmount) {
            alert("Please provide both User ID and Bid Amount.");
            return;
        }

        const response = await fetch(`http://localhost:3000/cards/${cardID}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                bidAmount: parseFloat(bidAmount)
            })
        });

        if (response.ok) {
            const data = await response.json();
            dispatch('newBid', data);
            userID = '';
            bidAmount = '';
        } else {
            alert('Error submitting bid.');
        }
    }
</script>

<!-- Bid Form -->
<div class="bg-white p-4 rounded shadow-md">
    <h2 class="text-xl font-bold mb-4">Place a New Bid</h2>
    <form on:submit|preventDefault={submitBid}>
        <div class="mb-4">
            <label class="block text-gray-700">User ID:</label>
            <input type="text" bind:value={userID} class="w-full p-2 border rounded" placeholder="Enter your User ID" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Bid Amount ($):</label>
            <input type="number" bind:value={bidAmount} min="0.01" step="0.01" class="w-full p-2 border rounded" placeholder="Enter your bid amount" required>
        </div>
        <button
                class="w-full bg-pokeYellow hover:bg-pokeYellow-dark text-pokeDarkBlue font-bold py-2 rounded"
                type="submit">
            Submit Bid
        </button>
    </form>
</div>
