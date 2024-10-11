<script>
    export let card;
</script>

<a href={`/cards/${card.cardID}`} class="no-underline">
<div class="bg-pokeDarkBlue bg-opacity-85 text-white rounded-lg shadow-md overflow-hidden mx-auto" style="width: 16rem;">
    <div class="p-4">
        <h2 class="text-xl font-semibold text-center mb-2">{card.cardName}</h2>

        <div class="flex justify-center mb-2">
            <img src={card.cardImg} alt={card.cardName} class="h-32 w-auto object-cover" />
        </div>

        <div class="text-center mb-2">
            <p><strong>Auction Ended:</strong> {new Date(card.auctionEndDate).toLocaleDateString()}</p>
        </div>

        <div class="text-center mb-2">
            <p><strong>Highest Bid:</strong> ${card.bids[card.bids.length - 1].bidAmount}</p>
        </div>

        <div class="text-center mb-2">
            <p><strong>Card Rating:</strong> {card.cardRate}</p>
        </div>
    </div>
</div>
</a>


<style>
    div:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
</style>
