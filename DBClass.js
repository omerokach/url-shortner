const fs = require("fs");
const isValidDomain = require("is-valid-domain");
  
class DataBase {
  constructor() {
    fs.readFile("./database.json", (err, data) => {
      if (err) {
        throw new Error(`message: ${err.message}`);
      } else {
        this.urlObject = JSON.parse(data);
      }
    });
  }
  creatNewShortenedUrl(url) {
    if (isValidDomain(url)) {
      throw new Error(`invalid url`);
    }
    for (let item of this.urlObject.urlArr) {
      if (item.originalUrl === url) {
        return item;
      }
    }
    const newUrlObject = {};
    newUrlObject.creationDate = clearDate(new Date());
    newUrlObject.redirectCount = 0;
    newUrlObject.originalUrl = url;
    newUrlObject.shorturlId = shortenedUrl();
    this.urlObject.urlArr.push(newUrlObject);
    fs.writeFile(
      `./database.json`,
      JSON.stringify(this.urlObject, null, 4),
      (err) => {
        if (err) {
          throw new Error(`message: ${err}`);
        }
      }
    );
    return newUrlObject;
  }

  getAllUrls() {
    return this.urlObject;
  }

  updateRedirect(shorturlId) {
    const index = this.urlObject.urlArr.findIndex((url) => {
      return url.shorturlId === shorturlId;
    });
    this.urlObject.urlArr[index].redirectCount += 1;
    fs.writeFile(
      `./database.json`,
      JSON.stringify(this.urlObject, null, 4),
      (err) => {
        if (err) {
          throw new Error(`message: ${err}`);
        }
      }
    );
  }

  getOriginalUrl(id) {
    const url = this.urlObject.urlArr.filter((url) => {
      return url.shorturlId === id;
    });
    return url[0].originalUrl;
  }

  updateUrl() {}

  isValidDomain(url) {
    return isValidDomain(url);
  }
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

const dataBase = new DataBase();
module.exports = dataBase;
