const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/show-route", (req, res) => {
  const userId = req.body.userId;
  const requestedTime = new Date(req.body.timestamp);
  const currentTime = requestedTime.getTime();
  const addMinute = 60 * 1000;
  const newTimestamp = new Date(currentTime + addMinute);

  const user = db.find((user) => user.id === userId);
  if (user) {
    if (requestedTime < user.timestamp && user.token > 0) {
      // update user token
      user.token = user.token - 1;
      res.status(200).json({ message: "Updated user token." });
    } else if (requestedTime < user.timestamp && user.token <= 0) {
      // handle too many request
      res.status(429).json({ message: "Too many request." });
    } else if (requestedTime > user.timestamp) {
      // refresh user timestamp and token
      user.timestamp = newTimestamp;
      user.token = 9;
      res.status(200).json({ message: "Refreshed user timestamp and token." });
    }
  } else {
    // add user if user doesn't exist in db
    const newUser = {
      id: userId,
      timestamp: newTimestamp,
      token: 9,
    };
    db.push(newUser);
    res.status(200).json({ message: "Added new user." });
  }
});

module.exports = router;
