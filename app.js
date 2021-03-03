require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", api);
app.use(express.json());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
