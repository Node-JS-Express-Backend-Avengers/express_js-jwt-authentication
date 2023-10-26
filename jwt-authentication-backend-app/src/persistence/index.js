const mongooseObj = require("mongoose");

const connectionUrl = "mongodb://127.0.0.1:27017/eventsdb";

const mongoDBConnectionObj = mongooseObj
  .connect(connectionUrl)
  .then((connectionObj) => connectionObj);

if (mongoDBConnectionObj) {
  console.log("Connected to MongoDB successfully!");
} else {
  console.error("Connection to MongoDB failed!");
}

module.exports = mongoDBConnectionObj;
