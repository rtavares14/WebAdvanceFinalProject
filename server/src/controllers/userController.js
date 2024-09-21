import {data} from "../dummyData/dummyData.js";

export function deleteUser(req, res) {
    const userID = req.params.albumID;

    // Find the User by its ID
    const user = data.users.find(user => user.id === userID);

    if (!user) {
        // If no User is found, send a 404 error
        return res.status(404).json({ error: "User not found" });
    }

    // Remove and send success response if the User is found
    data.users = data.users.filter(user => user.id !== userID);
    res.status(200).json({ message: "User deleted successfully." });
}


export function updateUser() {

}


export function createUser() {

}


export function loginUser() {

}


export function getBidIDFromUser() {

}


export function getAllBidsFromUser(req, res) {

}


export function getUserByID(req, res) {
    const userID = req.params.userID;

    // Find the User by its ID
    const user = data.users.find(user => user.id === userID);

    if (!user) {
        // If User is not found, send a 404 error
        return res.status(404).json({ error: "User not found" });
    }

    // Return the user data
    res.status(200).json({ user })
}

export function getAllUsers(req, res) {
    // Return all Users
    res.status(200).json({ users: data.users });
}