import {data} from "../dummyData/dummyData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from '../verrySecretDoNotEnter/verrySecret.js';
import * as helper from "../utils/controllersHelper.js";
const saltRounds = 10;

export function deleteUser(req, res) {

}

export async function createUser(req, res) {
    let { userEmail, userPass } = req.body;

    if (!userEmail || !userPass) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = data.users.find(user => user.userEmail === userEmail);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
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

        return res.status(201).json({
            message: 'User created successfully!',
            token
        });
        console.log("User created successfully.");
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export function loginUser(req, res) {
    const {email, password} = req.body;

    const user = data.users.find(user => user.userEmail === email);

    if (!user) {
        return res.status(404).json({message: 'Email or Password not found'});
    }

    bcrypt.compare(password, user.userPass, (err, isMatch) => {

        if (isMatch) {
            const token = jwt.sign(
                {userId: user.userID, userEmail: user.userEmail, isAdmin: user.isAdmin},
                secret,
                {expiresIn: '10000h'});

            return res.json({token, message: 'Login successful'});
            console.log("User logged in successfully.");
        } else {
            return res.status(401).json({message: 'Email or Password not found'});
        }
    });
}

export function getWonByID(req, res) {
    const userID = Number(req.user.userId);
    const now = new Date();

    try {
        const wonCards = data.cards.filter(card => {
            const auctionEndDate = new Date(card.auctionEndDate);
            if (auctionEndDate <= now && card.bids.length > 0) {
                const highestBid = card.bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, {bidAmount: 0});
                return highestBid.userID === userID;
            }
            return false;
        });

        if (wonCards.length === 0) {
            return res.status(200).json({wonCards: [], message: "No won cards found for this user."});
            console.log("No won cards found for this user.");
        }

        return res.status(200).json({wonCards});
        console.log("Won cards fetched successfully.");
    } catch (error) {
        console.error('Error in getWonByID:', error);
        return res.status(500).json({message: 'Server error occurred while fetching won cards.'});
    }
}

export function getAllUsers(req, res) {
    res.status(200).json({users: data.users});
    console.log("All users fetched successfully.");
}