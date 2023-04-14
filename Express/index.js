/**
 * An Express application that handles HTTP requests for uploading files.
 * @module app
 */

import express from "express";
import formidable from "formidable";
import { fileURLToPath } from "url";
import { dirname, parse, sep } from "path";

/**
 * The directory path to the current module file.
 * @type {string}
 */
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

/**
 * The configuration object for the application.
 * @typedef {Object} Config
 * @property {number} port - The port number that the server listens on.
 * @property {Object} dir - The directory paths used by the application.
 * @property {string} dir.root - The root directory path of the application.
 * @property {string} dir.uploads - The directory path for uploaded files.
 */

/**
 * The configuration options for the application.
 * @type {Config}
 */
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    uploads: __dirname + "uploads" + sep,
  },
};

/**
 * The Express application instance.
 * @type {Object}
 */
const app = express();

// Configure EJS templates
app.set("view engine", "ejs");
app.set("views", "views");

// Serve static assets
app.use(express.static(cfg.dir.uploads));
app.use(express.static(__dirname + "/public"));

/**
 * The middleware function that handles HTTP requests for file uploads.
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {void}
 */
app.all("/", (req, res, next) => {
  if (req.method === "GET" || req.method === "POST") {
    // Parse uploaded file data
    const form = formidable({
      uploadDir: cfg.dir.uploads,
      keepExtensions: true,
    });
    form.parse(req, (err, data, files) => {
      if (err) {
        next(err);
        return;
      }
      if (files && files.image && files.image.size > 0) {
        // Populate file data for rendering in template
        data.filename = files.image.originalFilename;
        data.filetype = files.image.mimetype;
        data.filesize = Math.ceil(files.image.size / 1024) + " KB";
        data.uploadto = files.image.filepath;
        data.imageurl = "/" + parse(files.image.filepath).base;
      }
      // Render the form with the file data
      res.render("form", { title: "Parse HTTP POST file data", data });
    });
  } else {
    next();
  }
});

/**
 * Start the server and listen on the specified port.
 * @function
 * @param {number} cfg.port - The port number to listen on.
 * @returns {void}
 */
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
