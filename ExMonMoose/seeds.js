const product = require("./models/product");
const mongoose = require("mongoose");
const Product = require("./models/product");

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
}

// const p = new Product({
//   name: "Apple",
//   price: 1.99,
//   category: "fruit",
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const seedProducts = [
  {
    name: "Organic Guava",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Carrot",
    price: 1.99,
    category: "vegetable",
  },
  {
    name: "Cow Milk",
    price: 9.99,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
