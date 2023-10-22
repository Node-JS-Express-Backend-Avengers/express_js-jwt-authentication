const express = require('express');

const constants = require('./src/util/constant');

const expressApplication = express();

expressApplication.get('/', (req, res) => {
    res.send('Application "JWT authentication" is up and running');
});

expressApplication.listen(constants.PORT, (req, res) => {
    console.log(`application is running on port ${constants.PORT}`);
});
