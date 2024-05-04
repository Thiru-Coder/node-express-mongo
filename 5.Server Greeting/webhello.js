#!/usr/bin/env node

/**
 * This is a simple Node.js server that responds with a greeting message
 * in response to HTTP requests.
 */
const port = process.argv[2] || process.env.PORT || 3000,
  http = require("http");

/**
 * Starts the server and listens for incoming HTTP requests.
 */
http
  .createServer((req, res) => {
    console.log(req.url);

    const nameArg = capitalize(
      req.url
        .replace(/[^\w.,-]/g, " ")
        .replace(/\s+/g, " ")
        .trim() || "world"
    );

    res.statusCode = 200;

    res.setHeader("Content-Type", "text/html");

    res.end(`<p>Hello from ${nameArg}!</p>`);
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}/`);
// capitalize the first letter of all words

/**
 * Capitalizes the first letter of each word in a given string.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
