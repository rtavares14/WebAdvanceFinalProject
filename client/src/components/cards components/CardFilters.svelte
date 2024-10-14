<script>
    export let searchQuery;
    export let filterRating;
    export let filterEnergy;
    export let filterCardType;
    export let filterActionStatus;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function handleClearFilters() {
        searchQuery = '';
        filterRating = '';
        filterEnergy = '';
        filterCardType = '';
        filterActionStatus = '';

        dispatch('clearFilters');
    }

    $: searchQuery, dispatch('updateSearchQuery', { value: searchQuery });
    $: filterRating, dispatch('updateFilterRating', { value: filterRating });
    $: filterEnergy, dispatch('updateFilterEnergy', { value: filterEnergy });
    $: filterCardType, dispatch('updateFilterCardType', { value: filterCardType });
    $: filterActionStatus, dispatch('updateFilterActionStatus', { value: filterActionStatus });
</script>

<div class="flex flex-wrap justify-center items-center space-x-4 mb-6">
    <div class="flex-grow">
        <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search for a card..."
                class="p-2 rounded-md bg-pokeDarkBlue bg-opacity-85 text-white placeholder-white border-none w-full"
        />
    </div>

    <div class="flex-shrink-0">
        <label for="filterRating" class="block text-white"></label>
        <select id="filterRating" bind:value={filterRating} class="p-2 rounded-md bg-pokeDarkBlue bg-opacity-85 text-white border-none">
            <option value="">All Ratings</option>
            <option value="10">10</option>
            <option value="9.0-9.9">9-9.9</option>
            <option value="8.0-8.9">8-8.9</option>
            <option value="7.0-7.9">7-7.9</option>
            <option value="0-6.9">0-6.9</option>
        </select>
    </div>

    <div class="flex-shrink-0">
        <label for="filterEnergy" class="block text-white"></label>
        <select id="filterEnergy" bind:value={filterEnergy} class="p-2 rounded-md bg-pokeDarkBlue bg-opacity-85 text-white border-none">
            <option value="">All Energy Types</option>
            <option value="Grass">Grass</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Normal">Normal</option>
            <option value="Psychic">Psychic</option>
            <option value="Fighting">Fighting</option>
            <option value="No Energy">No Energy</option>
        </select>
    </div>

    <div class="flex-shrink-0">
        <label for="filterCardType" class="block text-white"></label>
        <select id="filterCardType" bind:value={filterCardType} class="p-2 rounded-md bg-pokeDarkBlue bg-opacity-85 text-white border-none">
            <option value="">All Card Types</option>
            <option value="Pokemon">Pokemon</option>
            <option value="Energy">Energy</option>
            <option value="Trainer">Trainer</option>
        </select>
    </div>

    <div class="flex-shrink-0">
        <label for="filterActionStatus" class="block text-white"></label>
        <select id="filterActionStatus" bind:value={filterActionStatus} class="p-2 rounded-md bg-pokeDarkBlue bg-opacity-85 text-white border-none">
            <option value="">All Actions</option>
            <option value="Waiting">Waiting</option>
            <option value="Started">Started</option>
            <option value="Ended">Ended</option>
        </select>
    </div>

    <button on:click={handleClearFilters} class="bg-pokeYellow bg-opacity-80 text-pokeDarkBlue font-bold py-2 px-4 rounded hover:bg-pokeDarkBlue hover:text-pokeYellow hover:bg-opacity-60 transition">
        Clear Filters
    </button>
</div>
