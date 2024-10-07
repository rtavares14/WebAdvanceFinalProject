<script>
    export let searchQuery = '';
    export let filterRating = '';
    export let filterEnergy = '';
    export let filterCardType = '';
    export let filterActionStatus = '';
    export let updateCards;

    function clearFilters() {
        searchQuery = '';
        filterRating = '';
        filterEnergy = '';
        filterCardType = '';
        filterActionStatus = ''; // Clear action status filter
        updateCards(); // Update cards after clearing
    }
</script>

<div class="flex flex-wrap justify-center items-center space-x-4 mb-6">
    <!-- Search Bar -->
    <div class="flex-grow">
        <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search for a card..."
                class="p-2 rounded-md bg-pokeDarkBlue text-white placeholder-white border-none w-full"
                on:input={updateCards}
        />
    </div>

    <!-- Filter by Rating -->
    <div class="flex-shrink-0">
        <label for="filterRating" class="block text-white"></label>
        <select id="filterRating" bind:value={filterRating} class="p-2 rounded-md bg-pokeDarkBlue text-white border-none" on:change={updateCards}>
            <option value="">All Ratings</option>
            <option value="10">10</option>
            <option value="9.0-9.9">From 9 to 9.9</option>
            <option value="8.0-8.9">From 8 to 8.9</option>
            <option value="7.0-7.9">From 7 to 7.9</option>
            <option value="6.9">6.9 and lower</option>
        </select>
    </div>

    <!-- Filter by Energy Type -->
    <div class="flex-shrink-0">
        <label for="filterEnergy" class="block text-white"></label>
        <select id="filterEnergy" bind:value={filterEnergy} class="p-2 rounded-md bg-pokeDarkBlue text-white border-none" on:change={updateCards}>
            <option value="">All Energy Types</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
        </select>
    </div>

    <!-- Filter by Card Type -->
    <div class="flex-shrink-0">
        <label for="filterCardType" class="block text-white"></label>
        <select id="filterCardType" bind:value={filterCardType} class="p-2 rounded-md bg-pokeDarkBlue text-white border-none" on:change={updateCards}>
            <option value="">All Card Types</option>
            <option value="Pokemon">Pokemon</option>
            <option value="Energy">Energy</option>
        </select>
    </div>

    <!-- Filter by Action Status -->
    <div class="flex-shrink-0">
        <label for="filterActionStatus" class="block text-white"></label>
        <select id="filterActionStatus" bind:value={filterActionStatus} class="p-2 rounded-md bg-pokeDarkBlue text-white border-none" on:change={updateCards}>
            <option value="">All Actions</option>
            <option value="Started">Started</option>
            <option value="Ended">Ended</option>
            <option value="Waiting">Waiting</option>
        </select>
    </div>

    <!-- Clear Filters Button -->
    <button on:click={clearFilters} class="bg-pokeYellow bg-opacity-80 text-pokeDarkBlue font-bold py-2 px-4 rounded hover:bg-pokeDarkBlue hover:text-pokeYellow hover:bg-opacity-60 transition">
        Clear Filters
    </button>
</div>

<style>
    /* Add any necessary styles here */
</style>
