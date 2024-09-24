/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        pokeRed: '#FB1B1B',     // Pokémon red
        pokeYellow: '#ffcb05',  // Pokémon yellow
        pokeDarkBlue: '#003a70',    // Pokémon dark blue
        pokeLightBlue: '#3d7dca',    // Pokémon  light blue
      },
    }
  },
  plugins: []
};


