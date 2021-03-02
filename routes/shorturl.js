const express = require("express");
let router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("this is shorturl");
  })
  .post((req, res) => {});

router
  .route("/:shorturl-id")
  .get((req, res) => {})
  .put((req, res) => {});

module.exports = router;
