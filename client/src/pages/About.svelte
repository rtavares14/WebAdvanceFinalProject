<script>
    import pokemons from '../assets/pokemons.jpg';
    import pokeball from "../assets/pokeball3.png";

    document.addEventListener('DOMContentLoaded', function () {
        document.body.style.backgroundImage = `url(${pokemons})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
    });
</script>

<div class="max-w-4xl mx-auto mt-20 p-8 bg-blue-900 bg-opacity-90 text-white rounded-lg">
    <div class="text-center mb-8">
        <h1 class="text-yellow-500 text-4xl font-bold">
            P<span class="inline-block align-middle"><img src={pokeball} alt="Pokéball" class="w-6 inline-block align-middle" /></span>KEBID
        </h1>
    </div>
    <div class="space-y-6 text-lg">
        <p>Welcome to P<span class="inline-block align-middle"><img src={pokeball} alt="Pokéball" class="w-6 inline-block align-middle" /></span>KEBID – the ultimate online platform for collectors and trainers! Discover rare and unique Pokémon cards through our competitive and secure auction process.</p>
        <p>Founded by Rafael Tavares and Gerralt Gottemaker in 2024, we bring together Pokémon fans who love trading and bidding on rare cards and collectibles. Each listing is checked to make sure it's real and exciting.</p>
        <p>Whether you're an experienced collector or just starting out, Pokémon Auction is the perfect place to grow your collection. Start bidding, collecting, and trading now!</p>
    </div>
</div>
