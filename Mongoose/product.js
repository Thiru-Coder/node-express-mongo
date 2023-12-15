const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/products");

  console.log("Connection Open");
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    min: [0, "Provide a Positive Value"],
  },
  onScale: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

const helmet = new Product({ name: "TVS Helmet", price: 1200 });
helmet
  .save()
  .then((data) => {
    console.log("It Worked!");
    console.log(data);
  })
  .catch((err) => {
    console.log("Hey Yo Yo What's with that Man!");
    console.log(err);
  });
