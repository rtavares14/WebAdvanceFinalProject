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
}


export function updateUser(req, res) {

}


export function createUser(req, res) {
    //lets myPlaintextPassword  = req.boddy.pass

    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //cretae new user
    //add new user
    // });

}


export function loginUser(req, res) {
    const { email, password } = req.body;

    const user = data.users.find(user => user.userEmail === email); //look for email

    if (!user) {
        return res.status(404).json({ message: 'Email or Password not found' });
    }

    bcrypt.compare(password, user.userPass, (err, isMatch) => {

        if (isMatch) {
            const token = jwt.sign(
                { id: user.userID, email: user.userEmail , isAdmin: user.isAdmin},
                secret,
                { expiresIn: '1h' });

            return res.json({ token, message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Email or Password not found' });
        }
    });
}


export function getBidIDFromUser(req, res) {

}


export function getAllBidsFromUser(req, res) {

}


export function getUserByID(req, res) {
    const userID = req.params.userID;

    // Find the User by its ID
    const user = data.users.find(user => user.id === userID);

    if (!user) {
        // If User is not found, send a 404 error
        return res.status(404).json({error: "User not found"});
    }

    // Return the user data
    res.status(200).json({user})
}

export function getAllUsers(req, res) {
    // Return all Users
    res.status(200).json({users: data.users});
}