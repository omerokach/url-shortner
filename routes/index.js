const express = require("express");
const shortUrl = require("./shorturl")
const statistic = require("./statistic")
let router = express.Router();

router.use("/shorturl", shortUrl);
router.use("/statistic", statistic);

module.exports = router;
