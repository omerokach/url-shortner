const fs = require("fs");

class Database {
  constructor() {
    this.urlArr = [];
  }
  creatNewShortenedUrl(url) {
    const newUrlObject = {};
    newUrlObject.creationDate = clearDate(new Date());
    newUrlObject.redirectCount = 0;
    originalUrl = url;
    newUrlObject["shorturl-id"] = shortenedUrl();
    this.urlArr.push(newUrlObject);
    fs.writeFile(
      `./database.json`,
      JSON.stringify(this.urlArr, null, 4),
      (err) => {
        if (err) {
          res.status(500).send("there is a problem with the server " + err);
        } else {
          const successMessage = {
            success: true,
            data: this.urlArr[this.urlArr.length - 1],
          };
          res.status(200).send(successMessage);
        }
      }
    );
  }

  getAllUrls() {
    return this.urlArr;
  }

  getSpecificUrl(id) {
    for (let url of this.urlArr) {
      if (url.newUrlObject["shorturl-id"] === id) {
        return url.originalUrl;
      }
    }
  }

  updateUrl() {}
}

//Sql date
function clearDate(date) {
  let newDate = date.toISOString().split(".")[0];
  return newDate.split("T")[0] + " " + newDate.split("T")[1];
}

//shortened url functions
function shortenedUrl() {
  const charsArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
  ];
  let shorturl = "";
  for (let i = 0; i < 5; i++) {
    shorturl += charsArr[Math.floor(Math.random() * 34)];
  }
  return shorturl;
}
