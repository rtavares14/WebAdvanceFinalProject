<script>
    import pokeball from '../assets/pokeball.png';
    export let active;
</script>

<nav class="bg-pokeDarkBlue text-white fixed w-full top-0 left-0 h-16 flex items-center px-6">
    <!-- Left side (Logo and menu items) -->
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
        <a href="/login" class="hover:text-pokeYellow">Login</a>
        <a href="/register" class="hover:text-pokeYellow">Register</a>
    </div>
</nav>

<style>
    .pokeball {
        display: inline-block;
        position: relative;
        top: 1.5px;
    }

    .pokeball-img {
        width: 22px;
        height: 22px;
        margin: 0 1px;
        vertical-align: middle;
    }

    a.active , .hover\:text-pokeYellow:hover {
        color: #facc15;
    }

</style>