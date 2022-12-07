// One to Billion

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationshipDemo");
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

const makeTweets = async () => {
  //   const user = new User({ username: "chickenfan99", age: 61 });
  //   const tweet1 = new Tweet({
  //     text: "I love my chickens!",
  //     likes: 1200,
  //   });
  //   tweet1.user = user;
  //   user.save();
  //   tweet1.save();
  //   const user = await User.findOne({ username: "chickenfan99" });
  //   const tweet2 = new Tweet({
  //     text: "bock bock bock my chickens make noises",
  //     likes: 1239,
  //   });
  //   tweet2.user = user;
  //   tweet2.save();
};

// makeTweets();

/****************************************************/

//Populate with ref: "user" field in tweetSchema

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

findTweet();
