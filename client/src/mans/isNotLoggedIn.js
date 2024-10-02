import page from 'page';
import {candyStore} from "../candyStore.js";
import {get} from "svelte/store";

export const isNotLoggedIn = (ctx, next) => {
    const token = get(candyStore) || localStorage.getItem('token');
    if (token) {
        page.redirect('/')
        return;
    }
    next();
}