const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @post     api/users
// @desc     register user route
// @access   Public
router.post('/', [ check('name', 'Name is Required').not().isEmpty(),
check('email', 'Please Enter A Valid Email').isEmail(),
check('password', 'Please enter a password with 6 or more chars').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // user exists?
        let user = await User.findOne({email});
        if (user) {
            res.status(400).json({errors: [ {msg: 'User already exists'} ]});
        }
        else {
            // get user gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            }); 

            // ecrypt the password

            const salt = await bc.genSalt(10);

            user.password = await bc.hash(password, salt);

            await user.save();

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