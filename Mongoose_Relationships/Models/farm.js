// One to Many with Populate

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo");
}

/****************************************************/

// Schema

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

/****************************************************/

// Models

const Product = mongoose.model("Product", productSchema);

const Farm = mongoose.model("Farm", farmSchema);

/****************************************************/

// Data

// Product.insertMany([
//   { name: "Goddess Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 4.99, season: "Summer" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

/****************************************************/

// Example 2

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//   const melon = await Product.findOne({ name: "Goddess Melon" });
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };

// makeFarm();

// const addProduct = async () => {
//   const farm = await Farm.findOne({ name: "Full Belly Farms" });
//   const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
//   farm.products.push(watermelon);
//   await farm.save();
//   console.log(farm);
// };

// addProduct();

/****************************************************/

//Populate with ref: "Product" field in farm Schema

// Farm.findOne({ name: "Full Belly Farms" })
//   .populate("products")
//   .then((farm) => console.log(farm));
