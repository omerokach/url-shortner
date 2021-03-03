const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass")
const DB = require("../DBClass");
router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {});

module.exports = router;
