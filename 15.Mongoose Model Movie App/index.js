const mongoose = require("mongoose");

/**
 * Connect to MongoDB database.
 * @returns {Promise<void>} - Resolves when connected to the database.
 * @throws {Error} - If failed to connect to the database.
 */
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/movies");

    console.log("Connected to MongoDB database!");
  } catch (err) {
    throw new Error(`Failed to connect to MongoDB database: ${err}`);
  }
}

/**
 * Define Movie schema.
 */
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

/**
 * Define Movie model.
 */
const Movie = mongoose.model("Movie", movieSchema);

/**
 * Create a new movie and save it to the database.
 */
const gargi = new Movie({
  title: "Gargi",
  year: 2022,
  score: 8.6,
  rating: "U/A",
});

gargi.save();

/**
 * Insert multiple movies to the database.
 * @returns {Promise<void>} - Resolves when all movies are inserted.
 * @throws {Error} - If failed to insert movies.
 */
async function insertMovies() {
  try {
    const movies = [
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
    ];

    const result = await Movie.insertMany(movies);
    console.log(`${result.length} movies inserted!`);
  } catch (err) {
    throw new Error(`Failed to insert movies: ${err}`);
  }
}

connectToDatabase().then(() => {
  insertMovies().finally(() => {
    mongoose.connection.close();
    console.log("Connection closed");
  });
});
