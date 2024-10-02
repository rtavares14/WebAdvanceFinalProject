import { writable } from 'svelte/store';

export const candyStore = writable(localStorage.getItem("token"))

export function removeToken() {
    candyStore.set(null);
}