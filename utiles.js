const axios = require("axios");
const binID = "603e690e81087a6a8b94ba0f";
function getRequest(data) {
  axios
    .get(`https://api.jsonbin.io/v3/b/${binID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.send(response);
    });
}

function putRequest(data, id) {
  axios
    .put(`https://api.jsonbin.io/v3/b/${binID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
    .then((response) => {
      response.send(response);
    });
}
