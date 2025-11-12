const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // allow all origins for dev

// Fetch subreddit posts
app.get("/reddit/:subreddit", async (req, res) => {
  const { subreddit } = req.params;
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}.json?limit=10`
    );
    if (!response.ok) throw new Error("Reddit API error");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
