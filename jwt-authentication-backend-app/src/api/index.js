const express = require("express");
const router = express.Router();

// database connection object
const dbConnection = require("../persistence/");

// user model object
const userModel = require("../model/");

// route info API
router.get("/", (req, res) => {
  res.send(`Serving the requests over route ${req.baseUrl}`);
});

// user registration API
router.post("/register", async (req, res) => {
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
    console.log(`User instance ${userObj} stored in DB successfully`);
    return res
      .status(201)
      .send({ data: persistedUser, message: "User saved successfully!" });
  } else if (!persistedUser || persistedUser != userObj) {
    console.log(`Failed to persist the user ${JSON.stringify(userObj)}`);
    return res.status(500).send(null);
  }
});

// user login API
router.post("/login", async (req, res) => {
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
      message: `User '${credentialsPayload.email}' logged in successfully!`,
    });
  }
});

module.exports = router;
