const mongooseObj = require("mongoose");

const schemaObj = mongooseObj.Schema;

const userSchemaObj = new schemaObj({
  email: String,
  password: String,
});

module.exports = userSchemaObj;
