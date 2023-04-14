/**
 * Express.js application for Farm Stand website
 * @module index
 */

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

const Farm = require("./models/farm");

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

/**
 * Establishes a connection to a MongoDB database
 * @async
 * @function main
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs while connecting to the database
 */
async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// FARM ROUTES

// instead of passing messages on individual templates, set them on locals
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

/**
 * Route serving the farms index page
 * @name get/farms
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs while fetching data from the database
 */
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

/**
 * Route serving the new farm creation page
 * @name get/farms/new
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

/**
 * Route serving a specific farm page
 * @name get/farms/:id
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs while fetching data from the database
 */
app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  res.render("farms/show", { farm });
});

/**
 * Route handling the creation of a new farm
 * @name post/farms
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs while creating the new farm or while redirecting to the index page
 */
app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  req.flash("success", "Successfully made a new farm!");
  res.redirect("/farms");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
