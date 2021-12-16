const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const Post = require('../../models/Post');

// @post     api/post
// @desc     create a post
// @access   Privat
router.post('/', [auth, [
    check('text', 'Text Is Required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    

});

module.exports = router;