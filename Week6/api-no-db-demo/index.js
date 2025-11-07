const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

// fake db lol
const tweets = [
  { id: 1, user: "Ryan", tweet: "ChatGPT" },
  { id: 2, user: "Mohammad", tweet: "Hello World" },
];

// middleware
const validateInput = (req, res, next) => {
    const user = req.body.user;
    const tweet = req.body.tweet;
    if (!user || !tweet) {
        res.status(400).json({ error: "Incomplete input" });
    } else {
        next();
    }
}

// routes

//get tweet by user
app.get("/api/tweets/:user", (req, res) => {
  let tweet = tweets.find((tweet) => tweet.user === req.params.user);
  if (!tweet) {
    res.status(404).send("User not found");
  } else {
    res.send(tweet);
  }
});

// create tweet
app.post("/api/tweets", validateInput, (req, res) => {
  let prev_id = tweets[tweets.length - 1].id;
  let tweet = {
    id: prev_id + 1,
    user: req.body.user,
    tweet: req.body.tweet,
  };
  tweets.push(tweet);
  res.send(tweet);
});

// delete tweet
app.delete("/api/tweets", (req, res) => {
  let tweetIndex = tweets.findIndex((tweet) => tweet.id === req.body.id);
  if (tweetIndex === -1) {
    res.status(404).send("Tweet not found");
  } else {
    // remove the tweet
    let removed = tweets[tweetIndex];
    tweets.splice(tweetIndex, 1);
    res.json(removed);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
