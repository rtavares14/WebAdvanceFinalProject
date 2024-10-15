import { data } from "../dummyData/dummyData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from '../verrySecretDoNotEnter/verrySecret.js';
import * as helper from "../utils/controllersHelper.js";
import { StatusCodes } from 'http-status-codes';

const saltRounds = 10;

// Create a new user with the given email and password
export async function createUser(req, res) {
    let { userEmail, userPass } = req.body;

    if (!userEmail || !userPass) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = data.users.find(user => user.userEmail === userEmail);
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(userPass, saltRounds);

        const newUser = {
            userID: helper.getNextUserID(),
            isAdmin: false,
            userPass: hashedPassword,
            userEmail
        };

        data.users.push(newUser);

        const token = jwt.sign(
            { userId: newUser.userID, userEmail: newUser.userEmail, isAdmin: newUser.isAdmin },
            secret,
            { expiresIn: '10000h' }
        );

        console.log("User created successfully.");
        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully!',
            token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
}

// Get all auctions that the user has won
export function getWonByID(req, res) {
    const userID = Number(req.user.userId);
    const now = new Date();

    try {
        const wonCards = data.cards.filter(card => {
            const auctionEndDate = new Date(card.auctionEndDate);
            if (auctionEndDate <= now && card.bids.length > 0) {
                const highestBid = card.bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, { bidAmount: 0 });
                return highestBid.userID === userID;
            }
            return false;
        });

        if (wonCards.length === 0) {
            console.log("No won cards found for this user.");
            return res.status(StatusCodes.OK).json({ wonCards: [], message: "No won cards found for this user." });
        }

        console.log("Won cards fetched successfully.");
        return res.status(StatusCodes.OK).json({ wonCards });
    } catch (error) {
        console.error('Error in getWonByID:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error occurred while fetching won cards.' });
    }
}