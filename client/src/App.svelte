<script>
  import router from 'page';
  import Home from "./pages/Home.svelte";
  import Header from "./components/Header.svelte";
  import About from "./pages/About.svelte";

  import Cards from "./pages/Cards.svelte";
  import Card from "./pages/Card.svelte";

  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";

  import {isLoggedIn} from "./mans/isLoggedIn.js";
  import {isNotLoggedIn} from "./mans/isNotLoggedIn.js";
  import {isAdmin} from "./mans/isAdmin.js";
  import MyAccount from "./pages/MyAccount.svelte";
  import Dashboard from "./pages/Dashboard.svelte";


  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });

  router('/cards', isLoggedIn, (ctx) => {
    page = Cards;
    currentRoute = ctx.pathname;
    params = ctx.params;
  });

  router('/cards/:id', isLoggedIn, (ctx) => {
    page = Card;
    currentRoute = ctx.pathname;
    params = { id: ctx.params.id };
  });

  router('/about', (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
    params = ctx.params
  });

  router('/myaccount', (ctx) => {
    page = MyAccount;
    currentRoute = ctx.pathname;
    params = ctx.params
  });

  router('/dashboard', (ctx) => {
    page = Dashboard;
    currentRoute = ctx.pathname;
    params = ctx.params
  });

  router('/login', isNotLoggedIn, (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
    params = ctx.params;
  });

  router('/register', isNotLoggedIn , (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
    params = ctx.params
  });

  router.start();
</script>

<main>
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>

<style global lang="postcss">
  @import 'styles/global.css';
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
