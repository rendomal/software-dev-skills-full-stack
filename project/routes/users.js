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
        password: req.body.password,
        subscription: req.body.subscription
    });

    User.addUser(newUser, async (errOg, userOg) => {
        if (errOg) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            const token = jwt.sign({ data: newUser }, config.secret, {
                expiresIn: 604800
            });

            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    subscription: req.body.subscription
                }
            });
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
                        email: user.email,
                        subscription: user.subscription
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});


router.get('/profile', passport.authenticate('jwt', { session: false, }), async (req, res, next) => {
    let userID = req.user._conditions._id;

    User.getUserById(userID, async (err, user) => {

        let workingUser = await User.getUserByIdNoCallBacks(userID);
        res.json({
            name: workingUser.name,
            email: workingUser.email,
            username: workingUser.username,
            subscription: workingUser.subscription
        });
    });
});

router.patch('/updateSubscription', async (req, res, next) => {
    await User.changeSubscription(req.body.username, req.body.value, async (err, funRes) => {
        res.json({success: true, msg: "Success"});
    });

});

router.delete('/deleteUser', async (req, res, next) => {
    await User.deleteUser(req.body.username, async (err, funRes) => {
        res.json({success: true, msg: "Success"});
    });

});

module.exports = router;