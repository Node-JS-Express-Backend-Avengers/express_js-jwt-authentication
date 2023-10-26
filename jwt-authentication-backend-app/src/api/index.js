const express = require("express");
const router = express.Router();

// database connection object
const dbConnection = require("../persistence/");

// user model object
const userModel = require("../model/");

// route info API
const healthCheckAPI = {
  healthCheckAPI: router.get("/", (req, res) => {
    res.send(`Serving the requests over route ${req.baseUrl}`);
  }),
};

// authentication API
const authenticationAPI = {
  // user registration API
  register: router.post("/register", async (req, res) => {
    const userPayload = req.body;
    console.log(
      `This is payload for '/register': ${JSON.stringify(userPayload)}`
    );
    const userObj = new userModel(userPayload);
    console.log(
      `This is user object using payload from '/register': ${JSON.stringify(
        userObj
      )}`
    );
    let persistedUser = await userObj.save();
    if (persistedUser && persistedUser == userObj) {
      const registerResponseObject = {
        id: persistedUser["_id"],
        email: persistedUser["email"],
      };
      console.log(
        `User instance ${registerResponseObject} stored in DB successfully`
      );
      return res.status(201).send({
        data: registerResponseObject,
        message: "User saved successfully!",
      });
    } else if (!persistedUser || persistedUser != userObj) {
      console.log(`Failed to persist the user ${JSON.stringify(userObj)}`);
      return res.status(500).send(null);
    }
  }),
  // user login API
  login: router.post("/login", async (req, res) => {
    const credentialsPayload = req.body;
    const fetchedUser = await userModel
      .findOne({ email: credentialsPayload.email })
      .exec();
    console.log(
      `Login attempt by persistent user: ${JSON.stringify(fetchedUser)}`
    );
    if (!fetchedUser) {
      return res.status(404).send({ message: "User not found!" });
    } else if (fetchedUser.password != credentialsPayload.password) {
      return res
        .status(401)
        .send({ message: "Invalid email or password, please try again" });
    }
    // case: valid email and password for authentication
    else {
      return res.status(200).send({
        data: { email: fetchedUser.email },
        message: `User '${credentialsPayload.email}' logged in successfully!`,
      });
    }
  }),
};

// event fetching API
const eventAPI = {
  // public event
  events: router.get("/events", (req, res) => {
    const fetchedEvents = require("../static_store/events");
    if (fetchedEvents) {
      return res.status(200).send(fetchedEvents);
    }
  }),
  // special event
  specialEvents: router.get("/special", (req, res) => {
    const specialEvents = require("../static_store/special_events");
    if (specialEvents) {
      return res.status(200).send(specialEvents);
    }
  }),
};

module.exports = router;
