<script>
    export let card;
    export let editCard;
    export let deleteCard;
</script>

<div class="card-row flex justify-between items-center border-b py-2">
    <div class="card-id text-left w-1/3">{card.id}</div>
    <div class="card-name text-left w-1/3">{card.name}</div>
    <div class="card-actions text-right w-1/3">
        <button on:click={() => editCard(card.id)} class="bg-blue-500 text-white px-2 py-1 rounded mr-2">
            Edit
        </button>
        <button on:click={() => deleteCard(card.id)} class="bg-red-500 text-white px-2 py-1 rounded">
            Delete
        </button>
    </div>
</div>

<style>
    .card-row {
        font-family: Arial, sans-serif;
    }

    .card-id, .card-name {
        font-weight: normal;
    }

    .card-actions button {
        margin-left: 0.5rem;
    }
</style>
