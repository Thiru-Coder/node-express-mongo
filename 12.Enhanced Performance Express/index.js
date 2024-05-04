/**
 * Creates an Express app and sets up two routes, "/" and "/fast".
 *
 * @requires express
 * @requires worker_threads
 * @function
 * @returns {Object} An Express app object
 */
const express = require("express");
const app = express();
const { Worker } = require("worker_threads");

/**
 * Responds to requests to the "/" route by starting a new worker thread and sending its message as the response.
 *
 * @function
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
app.get("/", (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", function (message) {
    console.log(message);
    res.send("" + message);
  });

  worker.postMessage("start!");
});

/**
 * Responds to requests to the "/fast" route with a simple message.
 *
 * @function
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

/**
 * Starts the Express app listening on port 3000.
 *
 * @function
 * @returns {void}
 */
app.listen(3000);
