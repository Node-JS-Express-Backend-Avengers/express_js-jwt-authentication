const express = require('express');
const router = express.Router();

// database connection object
const dbConnection = require('../persistence/');

// user model object
const userModel = require('../model/');

// route info API
router.get('/', (req, res) => {
    res.send(`Serving the requests over route ${req.baseUrl}`);
});

// user registration API
router.post('/register', async (req, res) => {
    const userPayload = req.body;
    console.log(`This is payload for '/register': ${JSON.stringify(userPayload)}`);
    const userObj = new userModel(userPayload);
    console.log(`This is user object using payload from '/register': ${JSON.stringify(userObj)}`);
    let persistedUser = await userObj.save();
    if (persistedUser && persistedUser == userObj) {
        console.log(`User instance ${userObj} stored in DB successfully`);
        res.status(201).send({data: persistedUser, message: "User saved successfully!"});
    } else if (!persistedUser || persistedUser != userObj) {
        console.log(`Failed to persist the user ${JSON.stringify(userObj)}`);
        res.status(500).send(null);
    }
});

module.exports = router;
