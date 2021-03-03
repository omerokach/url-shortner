const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass");
const isValidDomain = require("is-valid-domain");
const validator = require("validator");

router.post("/new", (req, res) => {
  const url = req.body.url;
  if (!validator.isURL(url)) {
    const message = { error: "Invalid URL" };
    return res.status(400).json(message);
  }
  const newShort = dataBase.creatNewShortenedUrl(url);
  const { original_Url: original } = newShort;
  const { shorturl_Id: short } = newShort;
  const message = { original_Url: original, short_Url: short };
  res.status(200).json(message);
});

router.get("/:shorturlId", (req, res) => {
  try{
    const { shorturlId } = req.params;
    const originalUrl = dataBase.getOriginalUrl(shorturlId);
    dataBase.updateRedirect(shorturlId);
    res.redirect(originalUrl, 302);
  } catch(err){
    res.status(400).send(err.message)
  }
});


module.exports = router;
