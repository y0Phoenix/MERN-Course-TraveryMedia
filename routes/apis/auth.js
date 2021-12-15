const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bc = require('bcryptjs');
const config = require('config');


// @get      api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @Post     api/auth
// @desc     authenticate user and get token
// @access   Public
router.post('/', [
    check('email', 'Please Enter A Valid Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // user exists?
        let user = await User.findOne({email});
        if (!user) {
            res.status(400).json({errors: [ {msg: 'Invalid Credentials'} ]});
        }
        else {
            const match = await bc.compare(password, user.password);

            if (!match) {
                return res.status(400).json({errors: [ {msg: 'Invalid Credentials'} ]});
            }

            // return the json webtoken

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

            // res.send('User Registered');
            console.log(req.body);
        }
    } 
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;