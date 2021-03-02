const express = require("express");
let router = express.router();

router
  .route("/")
  .get((req, res) => {res.send("this is shorturl")})
  .post((req, res) => {});

router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {});

module.exports = router;
