import page from 'page';
import {jwtToken} from "../candyStore.js";
import {get} from "svelte/store";

export const isNotLoggedIn = (ctx, next) => {
    const token = get(jwtToken) || localStorage.getItem('token');
    if (token) {
        page.redirect('/')
        return;
    }
    next();
}