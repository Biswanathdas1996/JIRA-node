const path = require("path");
const fs = require("fs-extra");

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

app.post("/users", function (req, res) {
  logger.info("users route");
  const storeAddressPath = path.resolve(__dirname, ".", "src");
  fs.removeSync(storeAddressPath);
  fs.ensureDirSync(storeAddressPath);
  fs.outputJsonSync(path.resolve(storeAddressPath, "Data.json"), req.body);
  logger.info("create file ");
  res.json(req.body);
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
