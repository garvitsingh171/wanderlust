const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function registerUser({ username, email, password }) {
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        const error = new Error('Username or email already exists');
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    
    return {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
    };
}

module.exports = { registerUser };