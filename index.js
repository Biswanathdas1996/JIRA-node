const path = require("path");
const fs = require("fs-extra");

const { _fetch } = require("./web3/connect");

var express = require("express"),
  bodyParser = require("body-parser"),
  logger = require("./logger/logger"),
  app = express(),
  port = 3070;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.get("/", function (req, res) {
  logger.info("default route");
  res.send("App works!!!!!");
});

app.get("/users", async function (req, res) {
  logger.info("data route");
  const allUser = await _fetch("getAllUser");
  res.json(allUser);
});

app.get("/data", function (req, res) {
  logger.info("data route");
  res.json(require("./src/Data.json"));
});

// request to handle undefined or all other routes
app.get("*", function (req, res) {
  logger.info("users route");
  res.send("sorry App works!!!!!");
});

app.listen(port, function (err) {
  logger.info("running server on from port:::::::" + port);
});
