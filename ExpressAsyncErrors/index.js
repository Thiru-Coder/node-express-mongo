/**
 * Module dependencies.
 */

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const Product = require("./models/product");

/**
 * Connects to the MongoDB database.
 * @async
 * @function
 */
async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand2");

  console.log("Connection Open");
}

main().catch((err) => console.log(err));

/**
 * Sets up the app's view engine and views directory.
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Middleware for handling URL-encoded form data and spoofed HTTP methods.
 */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/**
 * An array of all available product categories.
 * @type {Array<string>}
 */
const categories = ["fruit", "vegetable", "dairy"];

/**
 * Wraps async functions so that any errors are passed to Express's next() function.
 * @param {function} fn - An async function to wrap.
 * @returns {function} A function that wraps an async function and passes any errors to Express's next() function.
 */
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

/**
 * Displays all products or only products within a given category.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @returns {Promise<void>} - A Promise that resolves when the function finishes executing.
 */
app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render("products/index", { products, category });
    } else {
      const products = await Product.find({});
      res.render("products/index", { products, category: "All" });
    }
  })
);

/**
 * Displays a form for creating a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

/**
 * Creates a new product in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @returns {Promise<void>} - A Promise that resolves when the function finishes executing.
 */
app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

/**
 * Displays a single product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @returns {Promise<void>} - A Promise that resolves when the function finishes executing.
 */
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/show", { product });
  })
);

/**
 * Displays a form for editing a single product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @returns {Promise<void>} - A Promise that resolves when the function finishes executing.
 */
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  /**
   * Async middleware function that updates a single product in the database.
   * @function
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @throws {AppError} Will throw an error if product is not found.
   */
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  /**
   * Async middleware function that deletes a single product from the database.
   * @function
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

/**
 * Function that handles a validation error and returns a new AppError.
 * @function
 * @param {Object} err - The error object returned by the validator.
 * @returns {AppError} A new AppError object.
 */
const handleValidationErr = (err) => {
  console.dir(err);
  //In a real app, we would do a lot more here...
  return new AppError(`Validation Failed...${err.message}`, 400);
};

/**
 * Middleware function that catches errors and passes them to the error handler.
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
app.use((err, req, res, next) => {
  console.log(err.name);
  //We can single out particular types of Mongoose Errors:
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});

/**
 * Middleware function that catches errors and returns an error message.
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
