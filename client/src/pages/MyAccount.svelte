<script>
    import { onMount } from 'svelte';
    import { tokenShop } from '../shops/tokenShop.js';

    let bids = [];
    let wonCards = [];
    let error = '';
    let loading = true;

    async function fetchAccountDetails() {
        const token = localStorage.getItem('token');

        if (!token) {
            error = 'You need to log in to view your account details.';
            loading = false;
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/account', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                bids = data.bids || [];
                wonCards = data.wonCards || [];
            } else {
                error = 'Failed to fetch account details. Please try again later.';
            }
        } catch (err) {
            error = 'An error occurred while fetching your account details.';
            console.error('Account details fetch error:', err);
        } finally {
            loading = false;
        }
    }

    onMount(fetchAccountDetails);
</script>

<main class="container mx-auto p-4">
    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md p-4 mb-6 mt-12 mx-auto text-center">
        <h1 class="text-3xl font-bold mb-4">Your Account Details</h1>
        {#if loading}
            <p>Loading your account details...</p>
        {:else if error}
            <p class="text-red-500">{error}</p>
        {:else}
            <section class="mt-4">
                <h2 class="text-2xl font-semibold mb-2">Total Bids</h2>
                <div class="bg-gray-800 rounded-lg p-4">
                    <p class="text-lg">Total Bids: ${bids.reduce((total, bid) => total + bid.amount, 0).toFixed(2) || 0}</p>
                </div>
            </section>

            <section class="mt-4">
                <h2 class="text-2xl font-semibold mb-2">Your Bids</h2>
                {#if bids.length > 0}
                    <div class="bg-gray-800 rounded-lg p-4">
                        <ul>
                            {#each bids as bid}
                                <li>{bid.cardName} - Bid Amount: ${bid.amount}</li>
                            {/each}
                        </ul>
                    </div>
                {:else}
                    <div class="bg-gray-800 rounded-lg p-4">
                        <p>No bids placed yet.</p>
                    </div>
                {/if}
            </section>

            <section class="mt-4">
                <h2 class="text-2xl font-semibold mb-2">Cards You Won</h2>
                {#if wonCards.length > 0}
                    <div class="bg-gray-800 rounded-lg p-4">
                        <ul>
                            {#each wonCards as card}
                                <li>{card.cardName} - Won on: {card.dateWon}</li>
                            {/each}
                        </ul>
                    </div>
                {:else}
                    <div class="bg-gray-800 rounded-lg p-4">
                        <p>No cards won yet.</p>
                    </div>
                {/if}
            </section>
        {/if}
    </div>
</main>

<style>
    /* Add any additional styles here */
    main {
        background-color: #f0f0f0;
        padding: 20px;
    }

    .bg-pokeDarkBlue {
        background-color: #1d3557;
    }

    .bg-gray-800 {
        background-color: #2c3e50;
    }

    .text-pokeRed {
        color: #e63946;
    }

    .text-pokeYellow {
        color: #f1faee;
    }
</style>
