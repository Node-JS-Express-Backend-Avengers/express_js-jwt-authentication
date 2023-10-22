const express = require('express');

const constants = require('./src/util/constant');

// express application object
const expressApplication = express();

// APIs on apiRouter
const apiRouter = require('./src/api/');

// '/api' route assignment for APIs on 'apiRouter'
expressApplication.use('/api', apiRouter);

// application health-status check
expressApplication.get('/', (req, res) => {
    res.send('Application "JWT authentication" is up and running');
});

// start application on the assigned port
expressApplication.listen(constants.PORT, (req, res) => {
    console.log(`application is running on port ${constants.PORT}`);
});
