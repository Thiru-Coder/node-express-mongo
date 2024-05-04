const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecret"));

/**
 * GET route to greet user with the value of the 'name' cookie, or a default value of "No-name"
 *
 * @name GET /greet
 * @function
 * @memberof module:routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {undefined}
 */
app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(`Hey there, ${name}`);
});

/**
 * GET route to set two cookies 'name' and 'job'
 *
 * @name GET /setname
 * @function
 * @memberof module:routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {undefined}
 */
app.get("/setname", (req, res) => {
  res.cookie("name", "Sherlock");
  res.cookie("job", "Private Detective");
  res.send("OK SENT YOU A COOKIE!!!");
});

/**
 * GET route to set a signed cookie 'fruit'
 *
 * @name GET /getsignedcookie
 * @function
 * @memberof module:routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {undefined}
 */
app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("OK SIGNED YOUR FRUIT COOKIE!");
});

/**
 * GET route to verify the signed cookie 'fruit'
 *
 * @name GET /verifyfruit
 * @function
 * @memberof module:routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {undefined}
 */
app.get("/verifyfruit", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies.fruit);
  res.send(req.signedCookies);
});

/**
 * Starts the Express app and listens for incoming requests on port 3000
 *
 * @name Listen
 * @function
 * @memberof module:app
 * @param {number} port - The port number to listen on
 * @param {Function} callback - A function to call when the server starts listening
 * @returns {undefined}
 */
app.listen(3000, () => {
  console.log("SERVING!");
});
