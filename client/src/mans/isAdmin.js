import page from 'page';
import { get } from 'svelte/store';
import { jwtDecode } from "jwt-decode";

export const isAdmin = (ctx, next) => {
    const jwtToken = localStorage.getItem('token');
    const token = jwtDecode(jwtToken);

    if (!token.isAdmin) {
        alert("You are not an admin!");
        page.redirect('/');
    } else {
        next();
    }
};
