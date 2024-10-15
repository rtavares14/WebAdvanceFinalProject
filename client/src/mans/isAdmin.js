import page from 'page';
import { jwtDecode } from "jwt-decode";

/**
 * Middleware function to check if the user is admin.
 * Decodes the JWT token stored in localStorage and checks if is `isAdmin` claim.
 *
 * @param {Object} ctx - The context object containing route information.
 * @param {Function} next - A function to call the next middleware or route handler.
 */
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
