<script>
    import pokeball from '../assets/pokeball3.png';
    export let active;

</script>

<nav>
    <div class="site-name">
        P<span class="pokeball"><img src={pokeball} alt="Pokéball" /></span>KEBID
    </div>
    <div class="nav-items">
        <ul class="main-menu">
            <li><a class:active={active === "/"} href="/">Home</a></li>
            <li><a class:active={active === "/cards"} href="/cards">Cards</a></li>
            <li><a class:active={active === "/about"} href="/About">About</a></li>
        </ul>
    </div>
    <div class="user-options">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
    </div>
</nav>

<style>

    nav {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 20px 10px 50px;
        background: #003a70;
        width: 100vw;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
    }

    .site-name {
        color: #FB1B1B;
        font-weight: bold;
        font-size: 1.5rem;
        margin-right: 5px;
    }

    .pokeball img {
        width: 0.75em;
        vertical-align: central;
        margin: 0 3px;
    }

    .nav-items .main-menu {
        display: flex;
        gap: 15px;
        list-style: none;
    }

    .nav-items a, .user-options a {
        color: #FB1B1B;
        text-decoration: none;
        transition: color 0.3s;
    }

    .nav-items a.active, .nav-items a:hover, .user-options a:hover {
        color: #ffcb05;
    }

    .user-options {
        display: flex;
        gap: 15px;
        margin-left: auto;
        margin-right: 5%;
    }

</style>