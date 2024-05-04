/**
 * Module dependencies.
 */
const express = require("express");
const shelterRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");
const adminRoutes = require("./routes/admin");

/**
 * Create an Express application.
 * @type {Function}
 */
const app = express();

/**
 * Mount the shelter routes.
 * @name use/shelters
 * @function
 * @memberof module:app
 * @inner
 */
app.use("/shelters", shelterRoutes);

/**
 * Mount the dog routes.
 * @name use/dogs
 * @function
 * @memberof module:app
 * @inner
 */
app.use("/dogs", dogRoutes);

/**
 * Mount the admin routes.
 * @name use/admin
 * @function
 * @memberof module:app
 * @inner
 */
app.use("/admin", adminRoutes);

/**
 * Start a server and listen on port 3000 for connections.
 * @name listen
 * @function
 * @memberof module:app
 * @inner
 * @param {number} port - The port number to listen on.
 * @param {Function} [callback] - A callback function to execute on success.
 */
app.listen(3000, () => {
  console.log("Serving app on localhost:3000");
});
