import page from 'page';
import { jwtToken } from '../candyStore.js';
import { get } from 'svelte/store';
import { jwtDecode } from "jwt-decode";

export const isAdmin = (ctx, next) => {
    const userIsAdmin = jwtDecode(jwtToken, { userAdmin: true });
    console.log(userIsAdmin);

    if (!userIsAdmin) {
        alert("You are not an admin!");
        page.redirect('/');
    } else {
        next();
    }
};
