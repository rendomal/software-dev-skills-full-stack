const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');


// Register (only /register since it automatically puts it in)
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, async (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                // const token = jwt.sign(user, config.secret, {
                //     expiresIn: 604800 // 1 week
                // });
                const token = jwt.sign({ data: user }, config.secret, {
                  expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// Register (only /register since it automatically puts it in)
router.get('/profile', passport.authenticate('jwt', { session: false, }), async (req, res, next) => {
    let userID = req.user._conditions._id;

    User.getUserById(userID, async (err, user) => {

        let workingUser = await User.getUserByIdNoCallBacks(userID);
        res.json({
            name: workingUser.name,
            email: workingUser.email,
            username: workingUser.username
        });
    });
});

module.exports = router;