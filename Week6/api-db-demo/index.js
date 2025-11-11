// main entry point

const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./firebase");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/tweets", async (req, res) => {
  const newTweet = {
    user: req.body.user,
    tweet: req.body.tweet,
  };

  const tweetRef = await db.collection("tweets").add(newTweet);
  res.json({
    tweetId: tweetRef.id,
    ...newTweet,
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
