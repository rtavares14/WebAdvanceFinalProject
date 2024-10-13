<script>
    export let card;
    export let onClose;
    export let onSave;

    let editedCard = { ...card };

    function saveCard() {
        onSave(editedCard);
        onClose();
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            onClose();
        }
    }

</script>

<div class="overlay">
    <div class="form-container">
        <h2 class="text-2xl mb-4 text-white text-center">Edit Card - {card.cardName}</h2>

        <label class="block mb-2 text-white" for="cardName">Card Name</label>
        <input id="cardName" class="block w-full p-2 mb-4" bind:value={editedCard.cardName} />

        <label class="block mb-2 text-white" for="cardImg">Card Image</label>
        <input id="cardImg" class="block w-full p-2 mb-4" bind:value={editedCard.cardImg} />

        <label class="block mb-2 text-white" for="startDate">Starting Date</label>
        <input id="startDate" class="block w-full p-2 mb-4" type="date" bind:value={editedCard.actionStartingDate} />

        <label class="block mb-2 text-white" for="endDate">End Date</label>
        <input id="endDate" class="block w-full p-2 mb-4" type="date" bind:value={editedCard.auctionEndDate} />

        <label class="block mb-2 text-white" for="startingBid">Starting Bid</label>
        <input id="startingBid" class="block w-full p-2 mb-4" type="number" bind:value={editedCard.auctionStartingBid} />

        <label class="block mb-2 text-white" for="cardType">Card Type</label>
        <input id="cardType" class="block w-full p-2 mb-4" bind:value={editedCard.cardType} />

        <label class="block mb-2 text-white" for="energyType">Energy Type</label>
        <input id="energyType" class="block w-full p-2 mb-4 " bind:value={editedCard.energyType} />

        <label class="block mb-2 text-white" for="cardRate">Card rate</label>
        <input id="cardRate" class="block w-full p-2 mb-4 " type="number" bind:value={editedCard.cardRate} />

        <div class="flex justify-between">
            <button class="bg-pokeLightBlue text-white px-4 py-2 rounded-lg" on:click={onClose}>Cancel</button>
            <button class="bg-pokeGreen text-white px-4 py-2 rounded-lg" on:click={saveCard}>Save</button>
        </div>
    </div>
</div>


<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        background: #003a70;
        padding: 2rem;
        border-radius: 1rem;
        width: 25rem;
    }
</style>
