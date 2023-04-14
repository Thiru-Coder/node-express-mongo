/**
 * @fileoverview A simple web application that uses sessions to count page views and greet registered users.
 */

const express = require("express");
const app = express();
const session = require("express-session");

// configure session options
const sessionOptions = {
  secret: "sherlocked", // used to sign the session ID cookie
  resave: false, // don't save the session to store if it hasn't been modified
  saveUninitialized: false, // don't save uninitialized sessions (e.g. no data has been added to them)
};
app.use(session(sessionOptions)); // add the session middleware to the app

/**
 * Handles GET requests to the "/viewcount" endpoint.
 * Increments the page view count in the session and returns a response.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} times`);
});

/**
 * Handles GET requests to the "/register" endpoint.
 * Saves the username from the query parameters to the session and redirects to "/greet".
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

/**
 * Handles GET requests to the "/greet" endpoint.
 * Returns a personalized greeting to the user based on their username saved in the session.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcome back, ${username}`);
});

// start listening for incoming requests
app.listen(3000, () => {
  console.log("listening on port 3000");
});
