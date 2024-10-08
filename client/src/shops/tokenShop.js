import { writable } from 'svelte/store';

export const tokenShop = writable(localStorage.getItem("token"))

export function removeToken() {
    tokenShop.set(null);
}