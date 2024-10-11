import {data} from "../dummyData/dummyData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from '../verrySecretDoNotEnter/verrySecret.js';

export function deleteUser(req, res) {
    const userID = req.params.userID;

    // Find the User by its ID
    const user = data.users.find(user => user.id === userID);

    if (!user) {
        // If no User is found, send a 404 error
        return res.status(404).json({error: "User not found"});
    }

    // Remove and send success response if the User is found
    data.users = data.users.filter(user => user.id !== userID);
    res.status(200).json({message: "User deleted successfully."});
    console.log("User deleted successfully.");
}

export function createUser(req, res) {
    //lets myPlaintextPassword  = req.boddy.pass

    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //cretae new user
    //add new user
    // });

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
    const userID = parseInt(req.user.userId);
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