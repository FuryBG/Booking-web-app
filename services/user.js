const User = require("../models/User");

async function createUser(email, username, hashedPassword) {
    const newUser = new User({
        email,
        username,
        hashedPassword
    });
    await newUser.save();
    return newUser;
};

async function getUserByEmail(email) {
    let userRegEx = new RegExp(`^${email}$`, "i");
    const currUser = await User.findOne({email:{$regex: userRegEx}});
    return currUser;
};

async function getUserByUsername(username) {
    let userRegEx = new RegExp(`^${username}$`, "i");
    const currUser = await User.findOne({username:{$regex: userRegEx}});
    return currUser;
};

async function getUserById(id) {
    const currUser = await User.findById(id).populate("booked").lean();
    return currUser;
};

async function book(userId, hotelId) {
    let currentUser = await User.findOne({_id: userId});
    currentUser.booked.push(hotelId);
    currentUser.save();  
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserByUsername,
    getUserById,
    book,
};