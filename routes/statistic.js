const express = require("express");
let router = express.Router();

router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {});

module.exports = router;
