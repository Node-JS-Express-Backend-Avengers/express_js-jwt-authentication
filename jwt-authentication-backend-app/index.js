const express = require('express');

const constants = require('./src/util/constant');

const expressApplication = express();

expressApplication.listen(constants.PORT, (req, res) => {
    console.log(`application is running on port ${constants.PORT}`);
});
