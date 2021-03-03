const express = require("express");
let router = express.Router();
const dataBase = require("../DBClass");

router.post("/new", (req, res) => {
    const url = req.body.url;
    res.json(url);
  });

router.get("/:shorturlId", (req, res) => {
  const { shorturlId } = req.params;
  const originalUrl = dataBase.getOriginalUrl(shorturlId);
  console.log(originalUrl);
  res.redirect(originalUrl);
});

// router
//   .route("/:shorturlId")
//   .get((req, res) => {
//     const { shorturlId } = req.params;
//     const originalUrl = dataBase.getOriginalUrl(shorturlId);
//     dataBase.updateRedirect(shorturlId);
//     res.redirect(shorturlId, 302);
//   })
//   .put((req, res) => {

//   });

module.exports = router;
