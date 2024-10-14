<script>
    import {handleImageError} from "../../../utils/imgErrorHandeller.js";

    export let card;
</script>

<a href={`/cards/${card.cardID}`} class="no-underline">
    <div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md overflow-hidden mx-auto" style="width: 16rem;">
        <div class="p-4">
            <h2 class="text-xl font-semibold text-center mb-2">{card.cardName}</h2>

            <div class="flex justify-center mb-2">
                <img
                        src={card.cardImg}
                        alt={card.cardName}
                        class="h-56 w-auto object-cover rounded"
                        on:error={handleImageError}
                />
            </div>

            <div class="text-center">
                <p><strong>Type:</strong> {card.cardType}</p>
                <p><strong>Energy Type:</strong> {card.energyType}</p>
                <p><strong>Rating:</strong> {card.cardRate}</p>
            </div>

            <div class="mt-4 text-center">
                <p><strong>Starting Bid:</strong> ${card.auctionStartingBid}</p>
                <p><strong>Auction Starts:</strong> {new Date(card.actionStartingDate).toLocaleDateString()}</p>
                <p><strong>Auction Ends:</strong> {new Date(card.auctionEndDate).toLocaleDateString()}</p>

                {#if new Date() < new Date(card.actionStartingDate)}
                    <p class="text-pokeYellow"><strong>Starting in:</strong> {Math.ceil((new Date(card.actionStartingDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                {:else if new Date() < new Date(card.auctionEndDate)}
                    <p class="text-pokeGreen"><strong>Days Left:</strong> {Math.ceil((new Date(card.auctionEndDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                {:else}
                    <p class="text-pokeRed"><strong>Auction has ended</strong></p>
                {/if}
            </div>
        </div>
    </div>
</a>

<style>
    a.no-underline:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }

    img {
        transition: transform 0.3s ease;
    }

    img:hover {
        transform: scale(1.1);
    }
</style>
