/**
 * @fileoverview Express server app.
 * @requires express
 * @requires morgan
 * @requires AppError
 * @module
 */

const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

app.use(morgan("dev"));

/**
 * Middleware that logs request method and path and adds a request time property to the request object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

/**
 * Middleware that logs a message about loving dogs.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!!");
  next();
});

/**
 * Fake authentication middleware.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {AppError} Throws an error if password is incorrect.
 */
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "vicecity") {
    next();
  }
  throw new AppError("Password Required", 401);
};

/**
 * Route handler for home page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

/**
 * Route handler that intentionally throws an error.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/error", (req, res) => {
  chicken.fly();
});

/**
 * Route handler for dogs page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("WOOF WOOF!");
});

/**
 * Route handler for secret page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {AppError} Throws an error if user is not authenticated.
 */
app.get("/secret", verifyPassword, (req, res) => {
  res.send("THE SECRET CODE IS: LeaveMeAlone");
});

/**
 * Route handler for admin page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {AppError} Throws an error if user is not an admin.
 */
app.get("/admin", (req, res) => {
  throw new AppError("You are not an Admin!", 403);
});

/**
 * 404 error middleware.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

/**
 * Error handling middleware.
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).send(message);
});

/**
 * Starts the Express server on port 3000.
 * @callback startServerCallback
 * @returns {void}
 */
const startServerCallback = () => {
  console.log("App is running on localhost:3000");
};
app.listen(3000, startServerCallback);
