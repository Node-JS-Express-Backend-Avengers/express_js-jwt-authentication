const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Serving the requests over route ${req.baseUrl}`);
});

module.exports = router;
