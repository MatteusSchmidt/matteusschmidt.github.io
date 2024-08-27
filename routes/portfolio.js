var express = require('express');
var path = require('path');
var router = express.Router();

// Route to serve the portfolio.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'portfolio.html'));
});

module.exports = router;