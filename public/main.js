const userUrl = document.getElementById("url_input");
const shortUrl = document.getElementById("shortUrl_input");
const table = document.querySelector("table");
let urlArr = [];

document.addEventListener("DOMContentLoaded", () => {
  axios({
    method: "GET",
    url: "http://localhost:3000/api/shorturl",
  }).then((response) => {
    console.log(response.data.urlArr);
    urlArr = [...response.data.urlArr];
    console.log(urlArr);
    generateTable(table, response.data.urlArr);
  });
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let url = userUrl.value;
  postRequest(url);
});

document.getElementById("goToUrl").addEventListener("click", (e) => {
  e.preventDefault();
  let shortUrlInput = shortUrl.value;
  getRequest(shortUrlInput);
  let obj = urlArr.find(
    (urlObject) => urlObject["shorturl_Id"] === shortUrlInput
  );
  const redirectCounter = obj["redirect_Count"];
  const urlRow = document.getElementById(obj["original_Url"]);
  const rowTd = urlRow.querySelectorAll("td");
  rowTd[1].innerText = redirectCounter + 1;
});

function getRequest(shortUrl) {
  console.log(shortUrl);
  axios({
    method: "GET",
    url: `http://localhost:3000/api/shorturl/${shortUrl}`,
  }).then((response) => {
    if (response.request.status === 200) {
      window.open(response.request.responseURL);
    } else if (response.data.redirect == "http://localhost:3000/api/shorturl") {
      window.location = "http://localhost:3000/api/shorturl";
    }
  });
}

function getStatistic(shortId) {
  axios({
    method: "GET",
    url: `http://localhost:3000/api/statistic/${shortId}`,
  }).then((res) => {
    urlArr.push(res.data[0]);
    localStorage.setItem("urlArr", JSON.stringify(urlArr));
    // const {short_Url, original_Url, creation_Date, redirect_Count} = res.data[0];
    console.log(urlArr);
    generateTable(table, urlArr);
  });
}

function postRequest(url) {
  try {
    axios({
      method: "POST",
      url: `http://localhost:3000/api/shorturl/new`,
      data: { url: url },
    }).then((res) => {
      getStatistic(res.data["short_Url"]);
    });
  } catch (e) {
    throw e.response.data.message;
  }
}

function generateTable(table, urlArr) {
  for (let element of urlArr) {
    let row = table.insertRow();
    for (key in element) {
      if (key === "original_Url") {
        row.setAttribute("id", element[key]);
      }
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
