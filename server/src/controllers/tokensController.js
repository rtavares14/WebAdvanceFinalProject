import { data } from "../dummyData/dummyData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from "../verrySecretDoNotEnter/verrySecret.js";
import { StatusCodes } from 'http-status-codes';

// Login user with the given email and password
export function loginUser(req, res) {
    const { email, password } = req.body;

    const user = data.users.find(user => user.userEmail === email);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Email or Password not found' });
    }

    bcrypt.compare(password, user.userPass, (err, isMatch) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during password comparison' });
        }

        if (isMatch) {
            const token = jwt.sign(
                { userId: user.userID, userEmail: user.userEmail, isAdmin: user.isAdmin },
                secret,
                { expiresIn: '10000h' }
            );

            console.log("User logged in successfully.");
            return res.json({ token, message: 'Login successful' });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email or Password not found' });
        }
    });
}
