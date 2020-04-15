const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { auth } = require('../middleware/auth');

router.get('/api/users/auth', auth, (req, res) => {
    console.log(req.url);
    return res.status(200)
        .json({ isAuth: true, userData: req.user });
})

router.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userData) => {

        if (err) {
            return res.json({ success: false, err })
        }
        else {
            return res.status(200).json({ success: true, userData });
        }
    });
})

router.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.json({ loginSuccess: false, error: "Email not found" });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.json({ success: false, error: "Internal error" });
            if (!isMatch) {

                return res.json({ loginSuccess: false, error: "Email and password don't match" });
            }
            else if (isMatch) {
                user.generateToken((err, user) => {
                    if (err) return res.status(400).json({ loginSuccess: false, error: "Couldn't generate secret token" });
                    return res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userData: user });
                })

            }
        })
    })

})

module.exports = router;