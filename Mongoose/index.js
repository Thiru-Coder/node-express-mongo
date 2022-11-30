const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/movies");

  console.log("Connection Open");
}

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

const gargi = new Movie({
  title: "Gargi",
  year: 2022,
  score: 8.6,
  rating: "U/A",
});

gargi.save();

Movie.insertMany([
  {
    title: "Moonrise Kingdom",
    year: 2012,
    score: 7.3,
    rating: "PG-13",
  },
  {
    title: "Vikram",
    year: 2022,
    score: 8.6,
    rating: "U/A",
  },
  {
    title: "Alien",
    year: 1979,
    score: 8.1,
    rating: "R",
  },
]).then((data) => {
  console.log("DB Updated");
});
