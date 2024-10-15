import { writable } from 'svelte/store';

// Create a writable store for the token, initializing it with the value from localStorage
export const tokenShop = writable(localStorage.getItem("token"));

// Function to remove the token from the store and reset its value
export function removeToken() {
    tokenShop.set(null);
}