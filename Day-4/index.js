const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome, students.");
});
app.get("/hi", (req, res) => {
  res.send("Hello.");
});

app.listen(3000, () => {
  console.log("Server listenging on port 3000.");
});
