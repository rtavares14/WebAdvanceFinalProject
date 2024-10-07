import {data} from "../dummyData/dummyData.js";

function isAdmin(req, res, next) {
    const user = data.users.find(user => user.userEmail === req.user.userEmail);

    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'User is not admin.' });
    }
}

export default isAdmin;