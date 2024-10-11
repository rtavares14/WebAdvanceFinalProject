import jwt from "jsonwebtoken";
import secret from "../verrySecretDoNotEnter/verrySecret.js";

const isLoggedIn = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'You are not logged in.' });
    }

    const jwtToken = token.split(' ')[1];

    jwt.verify(jwtToken, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;

        next();
    });
}

export default isLoggedIn;