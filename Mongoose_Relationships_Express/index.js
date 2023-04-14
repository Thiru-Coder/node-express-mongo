/**
 * Module dependencies.
 */

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");
const categories = ["fruit", "vegetable", "dairy"];

/**
 * Connects to MongoDB using Mongoose and logs a message when the connection is opened.
 * @returns {Promise<void>}
 */
async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStandTake2");
  console.log("MongoDB Connection Open!!!");
}

main().catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// FARM ROUTES

/**
 * Route to retrieve all farms.
 * @name get/farms
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents an empty response.
 */
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

/**
 * Route to render form for adding a new farm.
 * @name get/farms/new
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - Render new farm form.
 */
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

/**
 * Route to retrieve a farm by ID and populate its products.
 * @name get/farms/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents a response with the farm and its products.
 */
app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate("products");
  res.render("farms/show", { farm });
});

/**
 * Route to delete a farm by ID.
 * @name delete/farms/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents a response redirect to all farms page.
 */
app.delete("/farms/:id", async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);

  res.redirect("/farms");
});

/**
 * Route to add a new farm to the database.
 * @name post/farms
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents a response redirect to all farms page.
 */
app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

/**
 * Route to render form for adding a new product to a farm.
 * @name get/farms/:id/products/new
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents a response with the form for adding a new product.
 */
app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { categories, farm });
});

/**
 * Route to add a new product to a farm.
 * @name post/farms/:id/products
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise object represents a response redirect to the farm page.
 */
app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
});

// PRODUCT ROUTES

/**
 * GET route for retrieving a list of products, filtered by category if specified.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} [req.query.category] - The category to filter by.
 * @returns {undefined}
 */
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

/**
 * GET route for rendering the "new product" form.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {undefined}
 */
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

/**
 * POST route for creating a new product.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} req.body - The product data to be saved.
 * @returns {undefined}
 */
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

/**
 * GET route for retrieving a single product by ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the product to retrieve.
 * @returns {undefined}
 */
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("farm", "name");
  res.render("products/show", { product });
});

/**
 * GET route for rendering the "edit product" form.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the product to edit.
 * @returns {undefined}
 */
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

/**
 * PUT route for updating an existing product.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the product to update.
 * @param {Object} req.body - The updated product data.
 * @returns {undefined}
 */
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

/**
 * DELETE route for deleting an existing product.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the product to delete.
 * @param {Object} req.body - The updated product data.
 * @returns {undefined}
 */
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
