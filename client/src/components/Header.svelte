<script>
    import pokeball from '../assets/pokeball.png';
    import page from 'page';
    import {jwtDecode} from "jwt-decode";
    import {candyStore} from '../candyStore.js';

    export let active;

    let token = null;
    let isAdmin = false;

    $: candyStore.subscribe(value => {
        token = value;
        isAdmin = token ? jwtDecode(token)?.isAdmin || false : false;
    });

    function logout() {
        candyStore.set(null);
        localStorage.removeItem('token');
        page.redirect('/');
    }
</script>

<nav class="bg-pokeDarkBlue text-white fixed w-full top-0 left-0 h-16 flex items-center px-6 z-50">
    <div class="flex items-center justify-between w-full">
        <div class="flex items-center space-x-4">
            <div class="text-pokeRed font-bold text-3xl flex items-center relative">
                <span>P</span>
                <span class="pokeball">
                    <img src={pokeball} alt="Pokéball" class="pokeball-img"/>
                </span>
                <span>KEBID</span>
            </div>

            <ul class="flex space-x-6 text-lg">
                <li><a class:active={active === "/"} href="/" class="hover:text-pokeYellow">Home</a></li>
                <li><a class:active={active === "/cards"} href="/cards" class="hover:text-pokeYellow">Cards</a></li>
                <li><a class:active={active === "/about"} href="/about" class="hover:text-pokeYellow">About</a></li>
            </ul>
        </div>

        <div class="hidden xl:flex space-x-6">
            <ul class="hidden md:flex space-x-6 text-lg">
                {#if token}
                    {#if !isAdmin}
                        <li><a class:active={active === "/mypage"} href="/mypage" class="hover:text-pokeYellow">My Account</a></li>
                    {/if}
                    {#if isAdmin}
                        <li><a class:active={active === "/dashboard"} href="/dashboard" class="hover:text-pokeYellow">Admin Dashboard</a></li>
                    {/if}
                {:else}
                    <li><a class:active={active === "/login"} href="/login" class="hover:text-pokeYellow">Login</a></li>
                    <li><a class:active={active === "/register"} href="/register" class="hover:text-pokeYellow">Register</a></li>
                {/if}
                {#if token}
                    <li><a class="hover:text-pokeYellow" on:click={logout}>Logout</a></li>
                {/if}
            </ul>
        </div>
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

</style>