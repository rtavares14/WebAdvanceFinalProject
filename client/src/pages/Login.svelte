<script>
    import page from "page";

    let email = '';
    let password = '';
    let error = '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        error = '';

        try {
            const response = await fetch('http://localhost:3000/users/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);

                page('/');

            } else {
                const errorData = await response.json();
                error = errorData.message || 'Login failed. Please try again.';
            }
        } catch (err) {
            error = 'An error occurred try again later.';
            console.error('Login error:', err);
        }
    };
</script>

<div class="max-w-sm mx-auto mt-20 p-8 bg-pokeDarkBlue bg-opacity-90 text-white rounded-lg">
    <h1 class="text-pokeRed text-4xl font-bold text-center mb-6">Login</h1>

    {#if error}
        <p class="text-pokeRed text-center mb-4">{error}</p>
    {/if}

    <form on:submit={handleSubmit}>
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input type="email" id="email" bind:value={email}
                   class="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none
                focus:ring-2 focus:ring-pokeYellow" required />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input type="password" id="password" bind:value={password}
                   class="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none
                focus:ring-2 focus:ring-pokeYellow" required />
        </div>

        <button type="submit" class="w-full p-2 bg-pokeRed text-white font-bold rounded hover:bg-pokeYellow
                transition duration-200">
            Login
        </button>
    </form>

    <div class="mt-4 text-center">
        <a href="/register" class="text-pokeYellow">Don't have an account? Register now</a>
    </div>
</div>

<style>

</style>
