const express = require('express');
const router = express.Router();

// @get      api/post
// @desc     Test route
// @access   Public
router.get('/', (req, res) => {
    res.send('Post Route');
});

module.exports = router;