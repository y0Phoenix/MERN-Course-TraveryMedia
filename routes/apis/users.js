const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Post     api/users
// desc     register user route
// access   Public
router.post('/', [ check('name', 'Name is Required').not().isEmpty(),
check('email', 'Please Enter A Valid Email').isEmail(),
check('password', 'Please enter a password with 6 or more chars').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User Route');
    console.log(req.body);
});

module.exports = router;