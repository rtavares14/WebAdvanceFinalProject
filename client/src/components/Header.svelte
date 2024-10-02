<script>
    import pokeball from '../assets/pokeball.png';
    import {jwtDecode} from "jwt-decode";

    export let active;

    let token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
            isAdmin = decodedToken?.isAdmin || false;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    console.log('Is Admin:', isAdmin);
</script>

<!-- Navigation Bar -->
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
        {#if token}
            <li><a class:active={active === "/mypage"} href="/mypage" class="hover:text-pokeYellow">My Page</a></li>
            <li><a class:active={active === "/logout"} href="/logout" class="hover:text-pokeYellow">Logout</a></li>
            {#if isAdmin}
                <li><a class:active={active === "/dashboard"} href="/dashboard" class="hover:text-pokeYellow">Admin Dashboard</a></li>
            {/if}
        {:else}
            <li><a class:active={active === "/login"} href="/login" class="hover:text-pokeYellow">Login</a></li>
            <li><a class:active={active === "/register"} href="/register" class="hover:text-pokeYellow">Register</a></li>
        {/if}
    </div>
</nav>

<!-- Style Section -->
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