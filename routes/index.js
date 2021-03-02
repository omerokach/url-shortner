const express = require("express");
const shortUrl = require("./routes/shorturl.js")
const statistic = require("./routes/statistic.js")
let router = express.router();

router.use("/shorturl", shortUrl);
router.use("/statistic", statistic);

module.exports = router;
