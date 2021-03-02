const express = require("express");
let router = express.router();

router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {});

router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {});

module.exports = router;
