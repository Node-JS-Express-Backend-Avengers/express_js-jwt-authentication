const mongoose = require('mongoose');

const userSchemaObj = require('./schema/user');

const userModel = mongoose.model('user', userSchemaObj, 'user');

module.exports = userModel;
