import page from 'page';
import {tokenShop} from "../shops/tokenShop.js";
import {get} from "svelte/store";

export const isNotLoggedIn = (ctx, next) => {
    const token = get(tokenShop) || localStorage.getItem('token');
    if (token) {
        page.redirect('/')
        return;
    }
    next();
}