/**
 * Module dependencies.
 */

const express = require("express");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose.set("strictQuery", true);

/**
 * Connect to MongoDB.
 *
 * @async
 * @function
 * @returns {Promise} A Promise that resolves when the connection is open.
 */
async function main() {
  // New - MongoDBCompass version
  await mongoose.connect("mongodb://127.0.0.1:27017/loginDemo");

  // Old - Mongo Daemon version
  // await mongoose.connect("mongodb://localhost:27017/loginDemo");
}

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
  secret: "sherlocked",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

/**
 * Require login middleware to protect certain routes.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {Object} Express response object.
 */
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

app.get("/", (req, res) => {
  res.send("THIS IS THE HOME PAGE");
});

app.get("/register", (req, res) => {
  res.render("register");
});

/**
 * Handle user registration.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const user = new User({ username, password });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

/**
 * Handle user login.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

/**
 * Handle user logout.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
app.post("/logout", (req, res) => {
  req.session.user_id = null;
  // req.session.destroy();
  res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
  res.send("TOP SECRET!!!");
});

/**
 * Start the server listening.
 */
app.listen(3000, () => {
  console.log("SERVER LISTENING ON PORT 3000!");
});
