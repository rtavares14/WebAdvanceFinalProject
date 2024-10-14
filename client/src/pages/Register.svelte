<script>
    import page from "page";
    import { registerUser } from "../api/allAPIRequests.js";

    let userEmail = '';
    let userPass = '';
    let confirmPassword = '';
    let error = '';

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        error = '';

        if (!validateEmail(userEmail)) {
            error = 'Please enter a valid email address.';
            return;
        }

        if (userPass !== confirmPassword) {
            error = 'Passwords do not match.';
            return;
        }

        if (userPass.length < 8) {
            error = 'Password must be at least 8 characters long.';
            return;
        }

        const result = await registerUser(userEmail, userPass);
        if (result.success) {
            error = '';

            page('/');
        } else {
            error = result.message;
        }
    };
</script>


<div class="max-w-sm mx-auto mt-20 p-8 bg-pokeDarkBlue bg-opacity-90 text-white rounded-lg">
    <h1 class="text-pokeRed text-4xl font-bold text-center mb-6">Register</h1>

    {#if error}
        <p class="text-pokeRed text-center mb-4">{error}</p>
    {/if}

    <form on:submit={handleRegister}>
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input type="email" id="email" bind:value={userEmail}
                   class="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none
                    focus:ring-2 focus:ring-pokeYellow" required/>
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input type="password" id="password" bind:value={userPass} class="mt-1 block w-full p-2 bg-gray-700
                border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pokeYellow" required/>
        </div>

        <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" bind:value={confirmPassword} class="mt-1 block w-full p-2 bg-gray-700
                border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pokeYellow" required/>
        </div>

        <button type="submit" class="w-full p-2 bg-pokeRed text-white font-bold rounded hover:bg-pokeYellow
                transition duration-200">
            Register
        </button>
    </form>

    <div class="mt-4 text-center">
        <a href="/login" class="text-pokeYellow">Have an account? Login now</a>
    </div>
</div>

<style>

</style>