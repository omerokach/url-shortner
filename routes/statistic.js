const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass");
const {checkShortId} = require("../urlValidation") 

router
  .route("/:id")
  .get((req, res) => {
    try{
      const id = req.params.id;
      checkShortId(id)
      const { urlArr } = dataBase.getAllUrls();
      const url = urlArr.filter((url) => url.shorturl_Id === id);
      res.json(url);
    }catch (e){
      res.status(400).json({message: "no such id"})
    }
  })
  .put((req, res) => {});

module.exports = router;
