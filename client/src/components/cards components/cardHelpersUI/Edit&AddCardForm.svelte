<script>
    export let card;
    export let onClose;
    export let onSave;
    export let isNewCard;

    let editedCard = {
        ...card,
        actionStartingDate: card.actionStartingDate ? card.actionStartingDate.slice(0, 10) : '',
        auctionEndDate: card.auctionEndDate ? card.auctionEndDate.slice(0, 10) : ''
    };

    let errors = {
        dateError: '',
        bidError: '',
        rateError: '',
        nameError: '',
        cardTypeError: '',
        energyTypeError: '',
        imgError: ''
    };

    const energyTypes = ['Grass', 'Fire', 'Water', 'Electric', 'Normal', 'Psychic', 'Fighting', 'No Energy'];
    const cardTypes = ['Pokemon', 'Energy', 'Trainer'];

    let isAuctionLive = new Date(editedCard.actionStartingDate) <= new Date();

    function saveCard() {
        if (validateForm()) {
            onSave(editedCard);
            onClose();
        }
    }

    function validateForm() {
        let isValid = true;

        errors.dateError = '';
        errors.bidError = '';
        errors.rateError = '';
        errors.nameError = '';
        errors.cardTypeError = '';
        errors.energyTypeError = '';
        errors.imgError = '';

        const startDateParsed = Date.parse(editedCard.actionStartingDate);
        const endDateParsed = Date.parse(editedCard.auctionEndDate);

        if (isNaN(startDateParsed) || isNaN(endDateParsed)) {
            errors.dateError = 'Please enter valid dates.';
            isValid = false;
        } else if (endDateParsed <= startDateParsed) {
            errors.dateError = 'End Date must be greater than Starting Date.';
            isValid = false;
        }

        if (!editedCard.cardName || editedCard.cardName.length < 3) {
            errors.nameError = 'Card Name must be at least 3 characters long.';
            isValid = false;
        }

        if (!editedCard.cardImg || editedCard.cardImg.length === 0) {
            errors.imgError = 'Please provide a valid image URL.';
            isValid = false;
        }

        if (!editedCard.auctionStartingBid || editedCard.auctionStartingBid <= 20) {
            errors.bidError = 'Starting Bid must be greater than 20€.';
            isValid = false;
        }

        if (!editedCard.cardType) {
            errors.cardTypeError = 'Please select a card type.';
            isValid = false;
        }

        if (!editedCard.energyType) {
            errors.energyTypeError = 'Please select an energy type.';
            isValid = false;
        }

        if (editedCard.cardRate < 0.5 || editedCard.cardRate > 10 || editedCard.cardRate % 0.5 !== 0) {
            errors.rateError = 'Card Rate must be between 0.5 and 10.';
            isValid = false;
        }

        return isValid;
    }
</script>

<div class="overlay" role="dialog" aria-modal="true">
    <div class="form-container">
        <h2 class="text-2xl mb-4 text-white text-center">{isNewCard ? 'Add New Card' : `Edit Card - ${card.cardName}`}</h2>

        <label class="block mb-2 text-white" for="cardName">Card Name</label>
        <input id="cardName" class="block w-full p-2 mb-4" bind:value={editedCard.cardName} />
        {#if errors.nameError}<p class="text-red-500">{errors.nameError}</p>{/if}

        <label class="block mb-2 text-white" for="cardImg">Card Image</label>
        <input id="cardImg" class="block w-full p-2 mb-4" bind:value={editedCard.cardImg} />
        {#if errors.imgError}<p class="text-red-500">{errors.imgError}</p>{/if}

        <label class="block mb-2 text-white" for="startDate">Starting Date</label>
        <input id="startDate" class="block w-full p-2 mb-4" type="date" bind:value={editedCard.actionStartingDate} disabled={isAuctionLive} />

        <label class="block mb-2 text-white" for="endDate">End Date</label>
        <input id="endDate" class="block w-full p-2 mb-4" type="date" bind:value={editedCard.auctionEndDate} />
        {#if errors.dateError}<p class="text-red-500">{errors.dateError}</p>{/if}

        <label class="block mb-2 text-white" for="startingBid">Starting Bid</label>
        <input id="startingBid" class="block w-full p-2 mb-4" type="number" bind:value={editedCard.auctionStartingBid} disabled={isAuctionLive} />
        {#if errors.bidError}<p class="text-red-500">{errors.bidError}</p>{/if}

        <label class="block mb-2 text-white" for="cardType">Card Type</label>
        <select id="cardType" class="block w-full p-2 mb-4" bind:value={editedCard.cardType}>
            <option disabled selected value="">Select Card Type</option>
            {#each cardTypes as type}
                <option value={type}>{type}</option>
            {/each}
        </select>
        {#if errors.cardTypeError}<p class="text-red-500">{errors.cardTypeError}</p>{/if}

        <label class="block mb-2 text-white" for="energyType">Energy Type</label>
        <select id="energyType" class="block w-full p-2 mb-4" bind:value={editedCard.energyType}>
            <option disabled selected value="">Select Energy Type</option>
            {#each energyTypes as type}
                <option value={type}>{type}</option>
            {/each}
        </select>
        {#if errors.energyTypeError}<p class="text-red-500">{errors.energyTypeError}</p>{/if}

        <label class="block mb-2 text-white" for="cardRate">Card Rate</label>
        <input id="cardRate" class="block w-full p-2 mb-4" type="number" bind:value={editedCard.cardRate} step="0.5" min="0.5" max="10" />
        {#if errors.rateError}<p class="text-red-500">{errors.rateError}</p>{/if}

        <div class="flex justify-between">
            <button class="bg-pokeLightBlue text-white px-4 py-2 rounded-lg" on:click={onClose}>Cancel</button>
            <button class="bg-pokeGreen text-white px-4 py-2 rounded-lg" on:click={saveCard}>
                {isNewCard ? 'Add Card' : 'Save'}
            </button>
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

    p.text-red-500 {
        font-size: 0.875rem;
        margin-top: -0.75rem;
        margin-bottom: 0.75rem;
    }
</style>
