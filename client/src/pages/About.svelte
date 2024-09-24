<script>
    import pokemons from '../assets/pokemons.jpg';
    import pokeball from "../assets/pokeball3.png";

    document.addEventListener('DOMContentLoaded', function () {
        // Set the background image dynamically

        document.body.style.backgroundImage = `url(${pokemons})`;
        document.body.style.backgroundSize = 'cover';  // Ensure it covers the entire screen

    });
</script>

<div class="about-container">
    <div class="about-header">
        <h1>P<span class="pokeball"><img src={pokeball} alt="Pokéball"/></span>KEBID</h1>
    </div>
    <div class="about-content">
        <p>Welcome to P<span class="pokeball"><img src={pokeball} alt="Pokéball"/></span>KEBID
            – the ultimate online platform for collectors and trainers! Discover rare and unique Pokémon cards through
            our competitive and secure auction process.</p>
        <p>Founded by Rafael Tavares and Gerralt Gottemaker in 2024, we bring together Pokémon fans who love trading and
            bidding on rare cards and collectibles. Each listing is checked to make sure it's real and exciting.</p>
        <p>Whether you're an experienced collector or just starting out, Pokémon Auction is the perfect place to grow
            your collection. Start bidding, collecting, and trading now!</p>
    </div>
</div>

<style>
    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
    }

    .about-container {
        max-width: 800px;
        padding: 2em;
        background-color: rgba(0, 58, 112, 0.9); /* Slight transparency */
        border-radius: 12px;
        margin: 5em auto;
    }

    .about-header h1 {
        color: #FB1B1B;
        text-align: center;
        margin-bottom: 1em;
        font-size: 2.5em;
    }

    .pokeball img {
        width: 0.75em;
        vertical-align: central;
        margin: 0 3px;
    }

    .about-content p {
        color: #FB1B1B;
        line-height: 1.8;
        margin-bottom: 1.5em;
        font-size: 1.1em;
    }

    /* Navbar link styles */
    .nav-items a.active, .nav-items a:hover, .user-options a:hover {
        color: #ffcb05; /* Pokémon Yellow */
    }
</style>
