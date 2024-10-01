<script>
    import pokeball from '../assets/pokeball.png';
    import page from 'page';
    import { get } from 'svelte/store';
    import { jwtToken } from '../candyStore.js';


    export let active;

    function isLoggedIn() {
        return get(jwtToken);
    }

    // Function to handle navigation
    function navigateTo(path) {
        page.redirect(path);
    }

    function logout() {
        jwtToken.set(null); // Assuming jwtToken is a writable store
        navigateTo('/'); // Redirect to home or another page
    }

    $: loggedIn = isLoggedIn();
</script>

<nav class="bg-pokeDarkBlue text-white fixed w-full top-0 left-0 h-16 flex items-center px-6 z-50">
    <div class="flex items-center space-x-10">
        <div class="text-pokeRed font-bold text-3xl flex items-center relative">
            <span>P</span>
            <span class="pokeball">
                <img src={pokeball} alt="Pokéball" class="pokeball-img" />
            </span>
            <span>KEBID</span>
        </div>

        <!-- Menu items -->
        <ul class="flex space-x-6 text-lg">
            <li><a class:active={active === "/"} href="/" class="hover:text-pokeYellow">Home</a></li>
            <li><a class:active={active === "/cards"} href="/cards" class="hover:text-pokeYellow">Cards</a></li>
            <li><a class:active={active === "/about"} href="/about" class="hover:text-pokeYellow">About</a></li>
        </ul>
    </div>

    <div class="ml-auto flex space-x-6">
        {#if !loggedIn}
            <button on:click={() => navigateTo("/mypage")} class="hover:text-pokeYellow">My Page</button>
            <button on:click={logout} class="hover:text-pokeYellow">Logout</button>
        {:else}
            <button on:click={() => navigateTo("/login")} class="hover:text-pokeYellow">Login</button>
            <button on:click={() => navigateTo("/register")} class="hover:text-pokeYellow">Register</button>
        {/if}
    </div>
</nav>

<style>
    .pokeball {
        display: inline-block;
        position: relative;
        top: 0.094rem;
    }

    .pokeball-img {
        width: 1.375rem;
        height: 1.375rem;
        margin: 0 0.0625rem;
        vertical-align: middle;
    }

    a.active, .hover\:text-pokeYellow:hover {
        color: #facc15;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        color: inherit; /* Inherit color from parent */
        font: inherit; /* Inherit font from parent */
    }
</style>
