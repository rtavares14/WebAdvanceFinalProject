import page from 'page';
import { tokenShop } from "../shops/tokenShop.js";
import { get } from "svelte/store";

/**
 * Middleware function that checks if the user is logged in.
 *
 * @param {Object} ctx - The context object containing route information.
 * @param {Function} next - A function to call the next middleware or route handler.
 */
export const isNotLoggedIn = (ctx, next) => {
    const token = get(tokenShop) || localStorage.getItem('token');
    if (token) {
        page.redirect('/');
        return;
    }
    next();
}