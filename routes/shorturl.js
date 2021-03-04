const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass");
const validator = require("validator");
const fetch = require("node-fetch");
const {isUrlVaild, checkShortId} = require("../urlValidation") 

router.post("/new",async (req, res) => {
  const url = req.body.url;
  try {
    await isUrlVaild(url)
    const newShort = dataBase.creatNewShortenedUrl(url);
    const { original_Url: original } = newShort;
    const { shorturl_Id: short } = newShort;
    const message = { original_Url: original, short_Url: short };
    res.status(200).json(message);
  } catch (err) {
   res.status(400).json({ message: err });
  }
});

router.get("/:shorturlId", (req, res) => {
  try {
    const { shorturlId } = req.params;
    const originalUrl = dataBase.getOriginalUrl(shorturlId);
    dataBase.updateRedirect(shorturlId);
    res.redirect(originalUrl, 302);
  } catch (err) {
    res.status(400).send("Invalid Id");
  }
});

module.exports = router;
