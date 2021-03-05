const { default: axios } = require("axios");
const fs = require("fs");
const binID = "6041fb060866664b10892272";
const binIdTest = "6041fb4c0866664b10892298";
const database = "database";
const test = "test";
const LocalPath = process.env.NODE_ENV === "test" ? test : database;
const path = process.env.NODE_ENV === "test" ? binIdTest : binID;

class DataBase {
  constructor() {
    try {
      axios.get(`https://api.jsonbin.io/v3/b/${path}/latest`).then((res) => {
        const json = res.data.record;
        this.urlObject = json;
      });
      if (process.env.NODE_ENV === "test") {
        try {
          const data = fs.readFileSync(`./DB/test.json`);
          this.urlObject = JSON.parse(data);
        } catch (e) {
          throw new Error(e);
        }
      }
    } catch (err) {
      const data = fs.readFileSync(`./DB/database.json`);
      this.urlObject = JSON.parse(data);
    }
  }
  creatNewShortenedUrl(url) {
    for (let item of this.urlObject.urlArr) {
      if (item.original_Url === url) {
        return item;
      }
    }
    const newUrlObject = {};
    newUrlObject.creation_Date = clearDate(new Date());
    newUrlObject.redirect_Count = 0;
    newUrlObject.original_Url = url;
    newUrlObject.shorturl_Id = shortenedUrl();
    this.urlObject.urlArr.push(newUrlObject);
    try {
      axios.put(
        `https://api.jsonbin.io/v3/b/${path}`,
        JSON.stringify(this.urlObject, null, 4),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fs.writeFile(
        `./DB/${LocalPath}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(`message: ${err}`);
          }
        }
      );
    } catch (err) {
      fs.writeFile(
        `./DB/${LocalPath}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(`message: ${err}`);
          }
        }
      );
    }
    return newUrlObject;
  }

  getAllUrls() {
    return this.urlObject;
  }

  updateRedirect(shorturlId) {
    const index = this.urlObject.urlArr.findIndex((url) => {
      return url.shorturl_Id === shorturlId;
    });
    this.urlObject.urlArr[index].redirect_Count += 1;
    try {
      axios.put(
        `https://api.jsonbin.io/v3/b/${path}`,
        JSON.stringify(this.urlObject, null, 4),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fs.writeFile(
        `./DB/${LocalPath}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(`message: ${err}`);
          }
        }
      );
    } catch {
      fs.writeFile(
        `./DB/${LocalPath}.json`,
        JSON.stringify(this.urlObject, null, 4),
        (err) => {
          if (err) {
            throw new Error(`message: ${err}`);
          }
        }
      );
    }
  }

  getOriginalUrl(id) {
    const url = this.urlObject.urlArr.filter((url) => {
      return url.shorturl_Id === id;
    });
    return url[0].original_Url;
  }

  getShortUrl(originalUrl) {
    const url = this.urlObject.urlArr.filter((url) => {
      return url.original_Url === originalUrl;
    });
    return url[0].shorturl_Id;
  }

  getRedirect(originalUrl) {
    const url = this.urlObject.urlArr.filter((url) => {
      return url.redirect_Count === originalUrl;
    });
    return url[0].redirect_Count;
  }

  getDate(originalUrl) {
    const url = this.urlObject.urlArr.filter((url) => {
      return url.creation_Date === originalUrl;
    });
    return url[0].creation_Date;
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
