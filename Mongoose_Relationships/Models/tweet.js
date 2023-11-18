// One to Billion

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

async function main() {
  // New - MongoDBCompass version
  await mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo");

  // Old - Mongo Daemon version
  // await mongoose.connect("mongodb://localhost:27017/relationshipDemo");
}

/****************************************************/

// Schema

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

/****************************************************/

// Models

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

/****************************************************/

// Data

// /**
//  * Creates tweets associated with a user.
//  * @async
//  * @function makeTweets
//  * @returns {Promise<void>} - Promise object representing the completion of tweet creation process.
//  */
// const makeTweets = async () => {
//   // Create a new user
//   const user = new User({ username: "chickenfan99", age: 61 });

//   // Create a new tweet and associate it with the user
//   const tweet1 = new Tweet({
//     text: "I love my chickens!",
//     likes: 1200,
//   });
//   tweet1.user = user;

//   // Save the user and the tweet
//   user.save();
//   tweet1.save();

//   // Retrieve the user with the given username
//   const user = await User.findOne({ username: "chickenfan99" });

//   // Create another tweet and associate it with the user
//   const tweet2 = new Tweet({
//     text: "bock bock bock my chickens make noises",
//     likes: 1239,
//   });
//   tweet2.user = user;

//   // Save the tweet
//   tweet2.save();
// };

// makeTweets();

/****************************************************/

//Populate with ref: "user" field in tweetSchema

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

findTweet();
