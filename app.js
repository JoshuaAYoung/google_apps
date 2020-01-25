const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");

app.use(cors());

app.use(morgan("common"));
const appStore = require("./app-data/app-data.js");

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  if (genres) {
    if (!["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(genres)) {
      return res.status(400).send("Genres must be one of Action, Puzzle, Strategy, Casual, Arcade or Card");
    }
  }

  let results = genres ? appStore.filter(app => app.Genres.includes(genres)) : appStore;

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
