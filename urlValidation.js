const validator = require("validator");
// if have http/https
const isUrlCheck = require("is-valid-http");
const fetch = require("node-fetch");

async function isUrlVaild(url) {
  if (!validator.isURL(url) && !isUrlCheck(url)) {
    throw "invalid url";
  }
  const valid = await isUrlReal(url);
  if (!valid) {
    throw "invalid host name";
  }
}
function checkShortId(url) {
    if (!/^[a-z0-9]{5}$/.test(url)) {
      throw "Invalid shortened url format!";
    }
  }

async function isUrlReal(url) {
  return await fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch(() => {
      return false;
    });
}

module.exports = {isUrlVaild,checkShortId};
