const express = require('express');
const router = express.Router();

// get      api/users
// desc     Test route
// access   Public
router.get('/', (req, res) => {
    res.send('User Route');
});

module.exports = router;