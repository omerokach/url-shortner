const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass");
const DB = require("../DBClass");
router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    const { urlArr } = dataBase.getAllUrls();
    const url = urlArr.filter((url) => url.shorturl_Id === id);
    res.json(url);
  })
  .put((req, res) => {});

module.exports = router;
