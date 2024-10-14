<script>
    import { createEventDispatcher } from 'svelte';

    export let startDate;
    export let endDate;
    let countdown = "";
    let auctionActive = false;
    let intervalID;
    const dispatch = createEventDispatcher();

    $: if (startDate && endDate) {
        setCountdown();
    }

    function setCountdown() {
        clearInterval(intervalID);

        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            auctionActive = false;
            updateCountdown(start - now);
            dispatch('auctionStatus', auctionActive);

            intervalID = setInterval(() => {
                const timeRemaining = start - new Date();
                if (timeRemaining <= 0) {
                    clearInterval(intervalID);
                    auctionActive = true;
                    dispatch('auctionStatus', auctionActive);
                    startAuctionTimer(end);
                } else {
                    updateCountdown(timeRemaining);
                }
            }, 1000);
        } else if (now >= start && now <= end) {
            auctionActive = true;
            dispatch('auctionStatus', auctionActive);
            startAuctionTimer(end);
        } else {
            auctionActive = false;
            dispatch('auctionStatus', auctionActive);
            countdown = "Auction has ended.";
        }
    }

    function startAuctionTimer(end) {
        const now = new Date();
        updateCountdown(end - now);
        intervalID = setInterval(() => {
            const timeRemaining = end - new Date();
            if (timeRemaining <= 0) {
                clearInterval(intervalID);
                countdown = "Auction has ended.";
                auctionActive = false;
                dispatch('auctionStatus', auctionActive);
            } else {
                updateCountdown(timeRemaining);
            }
        }, 1000);
    }

    function updateCountdown(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
</script>

<div>
    {#if !auctionActive && countdown !== "Auction has ended."}
        <p class="text-pokeYellow font-bold text-lg"><strong>Starting in:</strong> {countdown}</p>
    {:else if auctionActive}
        <p class="text-green-500 font-bold text-lg"><strong>Time left:</strong> {countdown}</p>
    {:else}
        <p class="text-red-500 font-bold text-lg"><strong>{countdown}</strong></p>
    {/if}
</div>
